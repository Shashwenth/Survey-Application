package com.SurveyRestAPI.FeedBack.Repositories.Service;
import org.springframework.stereotype.Service;

import com.SurveyRestAPI.FeedBack.Entities.User;
import com.SurveyRestAPI.FeedBack.Repositories.UserRepository;
import com.SurveyRestAPI.FeedBack.Security.PasswordConfig;

@Service
public class CustomerService {

    private final UserRepository customerJPA;
    private final PasswordConfig passwordEncoder;

    public CustomerService(UserRepository customerJPA, PasswordConfig passwordEncoder) {
        this.customerJPA = customerJPA;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveCustomer(User customer) {
        String encodedPassword = PasswordConfig.hashPassword(customer.getPassword());
        customer.setPassword(encodedPassword);
        User newUser=customerJPA.save(customer);
        return newUser;
    }
}
