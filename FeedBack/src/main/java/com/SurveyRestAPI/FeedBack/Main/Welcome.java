package com.SurveyRestAPI.FeedBack.Main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SurveyRestAPI.FeedBack.Entities.Option;
import com.SurveyRestAPI.FeedBack.Entities.Question;
import com.SurveyRestAPI.FeedBack.Entities.Survey;
import com.SurveyRestAPI.FeedBack.Entities.User;
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
	private UserRepository UserRepository;
	
	@GetMapping(path="/")
	public String welcome() {
		return "Hi Shash";
	}
	
	@PostMapping(path="/addSurvey")
	public ResponseEntity<Survey> addSurvey(@RequestParam Long userId, @RequestBody Survey survey){
	    if (userId == null) {
	        return ResponseEntity.badRequest().body(null);
	    }
	    User user = UserRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + userId));
	    survey.setUser(user);
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
		Survey survey=surveyRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invalid survey Id:" + id));
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
		List<Survey> surveys = UserRepository.findById(id).get().getSurveys();
        return ResponseEntity.ok(surveys);
    }
	
	@GetMapping(path = "/surveys")
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        return ResponseEntity.ok(surveys);
    }
	
	@PostMapping(path="/signup")
	public ResponseEntity<User> addUser(@RequestBody User user){
		User create=UserRepository.save(user);
		return ResponseEntity.ok(create);
	}
	
	@PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User foundUser = UserRepository.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
	
	
	
	
	

}
