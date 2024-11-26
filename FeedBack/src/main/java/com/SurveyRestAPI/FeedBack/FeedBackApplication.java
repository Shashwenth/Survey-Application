package com.SurveyRestAPI.FeedBack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class FeedBackApplication {

	public static void main(String[] args) {
		//Dotenv dotenv = Dotenv.load();
		SpringApplication.run(FeedBackApplication.class, args);
	}

}
