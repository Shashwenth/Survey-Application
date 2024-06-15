package com.SurveyRestAPI.FeedBack.Main;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SurveyRestAPI.FeedBack.Entities.Answer;
import com.SurveyRestAPI.FeedBack.Entities.Answer_OP;
import com.SurveyRestAPI.FeedBack.Entities.Option;
import com.SurveyRestAPI.FeedBack.Entities.Question;
import com.SurveyRestAPI.FeedBack.Entities.Survey;
import com.SurveyRestAPI.FeedBack.Entities.User;
import com.SurveyRestAPI.FeedBack.Repositories.Answer_OPRepository;
import com.SurveyRestAPI.FeedBack.Repositories.Answerrepository;
import com.SurveyRestAPI.FeedBack.Repositories.QuestionRepository;
import com.SurveyRestAPI.FeedBack.Repositories.SurveyRepository;
import com.SurveyRestAPI.FeedBack.Repositories.UserRepository;

@RestController
public class Welcome {
    
    @Autowired
    private SurveyRepository surveyRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private Answerrepository answerRepository;
    
    @Autowired
    private Answer_OPRepository answerOpRepository;
    
    @GetMapping(path="/")
    public String welcome() {
        return "Hi Shash";
    }
    
    @PostMapping(path="/addSurvey")
    public ResponseEntity<Survey> addSurvey(@RequestParam Long userId, @RequestBody Survey survey){
        if (userId == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + userId));
        survey.setUser(user);
        LocalDateTime now = LocalDateTime.now();
        if(survey.getStartTime().isBefore(now)) {
            survey.setStatus("active");
        }
        if(survey.getStartTime().isAfter(now)) {
            survey.setStatus("notStarted");
        }
        
        Survey create = surveyRepository.save(survey);
        return ResponseEntity.ok(create);
    }

    @GetMapping(path="/getSurveyId/{id}")
    public ResponseEntity<Survey> getSurvey(@PathVariable Long id){
        Survey survey=surveyRepository.findById(id).orElse(null);
        if(survey!=null) {
            return ResponseEntity.ok(survey);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping(path="/addQuestion/{id}")
    public ResponseEntity<Question> addQuestion(@PathVariable Long id,@RequestBody Question question){
        Survey survey=surveyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid survey Id:" + id));
        question.setSurvey(survey);
        if("checkbox".equals(question.getType())) {
            List<Option> options=question.getOptions();
            if(options!=null) {
                for(Option o:options) {
                    o.setQuestion(question);
                }
            }
        }
        Question create=questionRepository.save(question);
        return ResponseEntity.ok(create);
    }
    
    @GetMapping(path="/getQuestion/{id}")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable Long id){
        Survey survey=surveyRepository.findById(id).orElse(null);
        return ResponseEntity.ok(survey.getQuestions());
    }
    
    @GetMapping(path = "/usersurveys/{id}")
    public ResponseEntity<List<Survey>> getAllSurveys(@PathVariable Long id) {
        List<Survey> surveys = userRepository.findById(id).get().getSurveys();
        return ResponseEntity.ok(surveys);
    }
    
    @GetMapping(path = "/surveys")
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        return ResponseEntity.ok(surveys);
    }
    
    @PostMapping(path ="/updateSurveyStatus/{id}")
    public ResponseEntity<Survey> updateStatus(@PathVariable Long id){
        Survey survey=surveyRepository.findById(id).orElse(null);
        survey.setStatus("Concluded");
        Survey updatedSurvey = surveyRepository.save(survey);
        return ResponseEntity.ok(updatedSurvey);
    }
    
    @GetMapping("/userSurveys/{userId}/active")
    public ResponseEntity<List<Survey>> getActive(@PathVariable Long userId) {
        List<Survey> surveys = surveyRepository.findByUserIdAndStatus(userId, "active");
        return ResponseEntity.ok(surveys);
    }
    
    @GetMapping("/userSurveys/{userId}/history")
    public ResponseEntity<List<Survey>> getHistory(@PathVariable Long userId) {
        List<Survey> surveys = surveyRepository.findByUserIdAndStatus(userId, "Concluded");
        return ResponseEntity.ok(surveys);
    }
    
    @PostMapping(path="/signup")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User create=userRepository.save(user);
        return ResponseEntity.ok(create);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
    
    @PostMapping("/addAnswer")
    public ResponseEntity<String> addAnswer(@RequestParam  Long id , @RequestBody List<Answer> answers){
        for(Answer ans : answers) {
            Question question = questionRepository.findById(ans.getQuestion().getId()).orElse(null);
            Survey survey=surveyRepository.findById(ans.getSurvey().getId()).orElse(null);
            ans.setQuestion(question);
            ans.setSurvey(survey);
            ans.setUser(userRepository.findById(id).orElse(null));
            Answer_OP answerOP=new Answer_OP();
            answerOP.setQuestion(question.getText());
            answerOP.setAnswer(ans.getAnswer());
            answerOP.setQuestion_id(question.getId());
            answerOP.setSurveyId(question.getSurvey().getId());
            answerOP.setuser_id(id);
            answerRepository.save(ans);
            answerOP.setAnswer_id(ans.getId());
            answerOpRepository.save(answerOP);
        }
        return ResponseEntity.ok("Answers submitted successfully");
    }
    
    @GetMapping("/survey/{surveyId}/answers")
    public ResponseEntity<List<Answer_OP>> getAnswersBySurvey(@PathVariable Long surveyId, @RequestParam Long user_id) {
        List<Answer_OP> answers = answerOpRepository.findAnswersBySurveyIdAndUserId(surveyId, user_id);
        if (answers.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(answers);
        }
    }
}
