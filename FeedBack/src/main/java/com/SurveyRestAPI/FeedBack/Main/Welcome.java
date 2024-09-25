package com.SurveyRestAPI.FeedBack.Main;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SurveyRestAPI.FeedBack.Entities.Answer;
import com.SurveyRestAPI.FeedBack.Entities.AnswerSubmission;
import com.SurveyRestAPI.FeedBack.Entities.Answer_OP;
import com.SurveyRestAPI.FeedBack.Entities.Option;
import com.SurveyRestAPI.FeedBack.Entities.Question;
import com.SurveyRestAPI.FeedBack.Entities.Survey;
import com.SurveyRestAPI.FeedBack.Entities.User;
import com.SurveyRestAPI.FeedBack.Repositories.Answer_OPRepository;
import com.SurveyRestAPI.FeedBack.Repositories.Answerrepository;
import com.SurveyRestAPI.FeedBack.Repositories.OptionRepository;
import com.SurveyRestAPI.FeedBack.Repositories.QuestionRepository;
import com.SurveyRestAPI.FeedBack.Repositories.SurveyRepository;
import com.SurveyRestAPI.FeedBack.Repositories.UserRepository;
import com.SurveyRestAPI.FeedBack.Repositories.Service.GenerateSurveyId;

import jakarta.transaction.Transactional;

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
    
    @Autowired
    private OptionRepository optionRepository;
    
    @Autowired
    private GenerateSurveyId generateSurveyId;
    
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
        survey.setUniqueId(generateSurveyId.generateRandomString(10));
        Survey create = surveyRepository.save(survey);
        return ResponseEntity.ok(create);
    }
    
    @Transactional
    @PostMapping(path="/StartNow/{id}")
    public boolean StartsurveyNow(@PathVariable Long id) {
    	System.out.printf("Insid Start Now %d\n",id);
    	Survey survey= surveyRepository.findById(id).orElseThrow( ()-> new RuntimeException("unable to Find ID"));
    	survey.setStartTime(LocalDateTime.now());
    	survey.setStatus("active");
    	return true;
    }
    
    @Transactional
    @PostMapping(path="/EndNow/{id}")
    public boolean EndsurveyNow(@PathVariable Long id) {
    	System.out.printf("Inside END Now %d\n",id);
    	Survey survey= surveyRepository.findById(id).orElseThrow( ()-> new RuntimeException("unable to Find ID"));
    	survey.setEndTime(LocalDateTime.now());
    	survey.setStatus("concluded");
    	return true;
    }
    
    @GetMapping(path="/getSurveyId/{id}")
    public ResponseEntity<Survey> getSurvey(@PathVariable Long id){
    	System.out.println();
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
    
    
    @PostMapping(path = "/submitResponse/{surveyId}")
    public ResponseEntity<String> submitResponse(
        @PathVariable Long surveyId,
        @RequestParam Long userId,
        @RequestBody List<AnswerSubmission> answers) {

    	
        Survey survey = surveyRepository.findById(surveyId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid survey Id:" + surveyId));
        System.out.println(survey.getName());
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + userId));
        System.out.println(user.getUsername());

        for (AnswerSubmission answerSubmission : answers) {
            Question question = questionRepository.findById(answerSubmission.getQuestion().getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid question Id:" + answerSubmission.getQuestion().getId()));

            Answer answer = new Answer();
            answer.setSurvey(survey);
            answer.setQuestion(question);
            answer.setUser(user);

            if (answerSubmission.getIsOption().equals("true")) {
                Option option = optionRepository.findById(answerSubmission.getOption().get(0))
                    .orElseThrow(() -> new IllegalArgumentException("Invalid option Id:" + answerSubmission.getOption().get(0)));
                answer.getAnswer_Storage().put("true", String.valueOf(option.getValue()));
                answer.setAnswer(option.getValue()); 
            } else {
            	answer.getAnswer_Storage().put("false", answerSubmission.getAnswer());
                answer.setAnswer(answerSubmission.getAnswer());
            }
            
            answerRepository.save(answer);

            Answer_OP answerOP = new Answer_OP();
            answerOP.setQuestion(question.getText());
            answerOP.setAnswer(answer.getAnswer());
            answerOP.setQuestion_id(question.getId());
            answerOP.setSurveyId(surveyId);
            answerOP.setuser_id(userId);
            answerOP.setAnswer_id(answer.getId());
            answerOpRepository.save(answerOP);
        }
        survey.setResponsesCount(survey.getResponsesCount()+1);

        return ResponseEntity.ok("Responses submitted successfully");
    }

    @GetMapping(path="getResponses/{id}")
    public List<Answer> getResponses(@PathVariable Long id){
    	return answerRepository.findBySurveyId(id);
    }
    
    @GetMapping(path="getSurveyUniqueId/{id}")
    public String getSurveyUniqueIdentifier(@PathVariable Long id) {
    	return surveyRepository.findById(id).get().getUniqueId();
    }
    
    @GetMapping(path="/getQuestion/{id}")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable Long id){
        Survey survey=surveyRepository.findById(id).orElse(null);
        return ResponseEntity.ok(survey.getQuestions());
    }
    

	@GetMapping(path = "/usersurveys/{id}")
	public ResponseEntity<Page<Survey>> getAllSurveys(@PathVariable Long id,
	                                                  @RequestParam(defaultValue = "0") int page, 
	                                                  @RequestParam(defaultValue = "5") int size) {
	    Pageable paging = PageRequest.of(page, size);
	    Page<Survey> surveysPage = surveyRepository.findByUserIdAndStatus(id, "active", paging);
	    return ResponseEntity.ok(surveysPage);
	}
	
	@GetMapping(path = "/Expiredusersurveys/{id}")
	public ResponseEntity<Page<Survey>> getAllExpiredSurveys(@PathVariable Long id,
	                                                         @RequestParam(defaultValue = "0") int page, 
	                                                         @RequestParam(defaultValue = "5") int size) {
	    Pageable paging = PageRequest.of(page, size);
	    Page<Survey> surveysPage = surveyRepository.findByUserIdAndStatus(id, "concluded", paging);

	    // Map the Object[] results to Survey objects with responsesCount
	    Page<Survey> surveyPageWithCounts = surveysPage.map(obj -> {
	        Survey survey = (Survey) obj;
	        Long responsesCount = answerRepository.findtotalCount(survey);
	        survey.setResponsesCount(responsesCount);
	        return survey;
	    });

	    return ResponseEntity.ok(surveyPageWithCounts);
	}
	
	@GetMapping(path = "/Upcomingusersurveys/{id}")
	public ResponseEntity<Page<Survey>> getAllUpcomingSurveys(@PathVariable Long id,
	                                                         @RequestParam(defaultValue = "0") int page, 
	                                                         @RequestParam(defaultValue = "5") int size) {
	    Pageable paging = PageRequest.of(page, size);
	    Page<Survey> surveysPage = surveyRepository.findByUserIdAndStatus(id, "notStarted", paging);
	    return ResponseEntity.ok(surveysPage);
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
    
//    @GetMapping("/userSurveys/{userId}/active")
//    public ResponseEntity<List<Survey>> getActive(@PathVariable Long userId) {
//        List<Survey> surveys = surveyRepository.findByUserIdAndStatus(userId, "active");
//        return ResponseEntity.ok(surveys);
//    }
//    
//    @GetMapping("/userSurveys/{userId}/history")
//    public ResponseEntity<List<Survey>> getHistory(@PathVariable Long userId) {
//        List<Survey> surveys = surveyRepository.findByUserIdAndStatus(userId, "Concluded");
//        return ResponseEntity.ok(surveys);
//    }
    
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
    
    
    @GetMapping(path="/searchAnswers/{surveyId}")
    public boolean searchAnswerForUser(@PathVariable Long surveyId, @RequestParam Long userId) {
    	List<Answer> answer_set=answerRepository.findBySurveyIdAndUserId(surveyId, userId);
    	return !answer_set.isEmpty();
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
