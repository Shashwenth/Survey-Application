package com.SurveyRestAPI.FeedBack.Main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SurveyRestAPI.FeedBack.Entities.User;
import com.SurveyRestAPI.FeedBack.Repositories.UserRepository;
import com.SurveyRestAPI.FeedBack.Repositories.Service.CustomerService;
import com.SurveyRestAPI.FeedBack.Security.PasswordConfig;

import java.util.Optional;

@RestController
@RequestMapping("/sign")
public class Signup {
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordConfig passwordEncoder;
    
    @PostMapping(path="/signup")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User create=customerService.saveCustomer(user);
        return ResponseEntity.ok(create);
    }

    @GetMapping(path = "/checkUserExist")
    public boolean userExist(@RequestParam String email) {
        Optional<User> foundUser = userRepository.findByEmail(email);
        return foundUser.isPresent();
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
//    	
//    	String encodedEmail= PasswordConfig.hashEmail(user.getEmail());
//    	System.out.println(user.getEmail());
//    	System.out.println(encodedEmail);
    	User foundUser= userRepository.findByEmail(user.getEmail()).orElseThrow(()->new RuntimeException("NO email found"));
        //User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null && PasswordConfig.checkPassword(user.getPassword(), foundUser.getPassword())) {
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
	
}
