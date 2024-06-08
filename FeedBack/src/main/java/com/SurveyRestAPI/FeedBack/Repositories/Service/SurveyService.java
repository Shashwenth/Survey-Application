package com.SurveyRestAPI.FeedBack.Repositories.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.SurveyRestAPI.FeedBack.Entities.Survey;
import com.SurveyRestAPI.FeedBack.Repositories.SurveyRepository;

@Service
public class SurveyService {
	
	@Autowired
	private SurveyRepository surveyRepository;
	
	@Scheduled(fixedRate = 6000)
	public void updateSurveyStatus() {
		List<Survey> surveys = surveyRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        
        for (Survey survey : surveys) {
            if ("active".equals(survey.getStatus()) && survey.getEndTime().isBefore(now)) {
                survey.setStatus("concluded");
                surveyRepository.save(survey);
            }
        }
	}
	
	@Scheduled(fixedRate = 6000)
	public void setStatusActive() {
		List<Survey> surveys = surveyRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        
        for (Survey survey : surveys) {
            if ("notStarted".equals(survey.getStatus()) && survey.getStartTime().isBefore(now)) {
                survey.setStatus("active");
                surveyRepository.save(survey);
            }
        }
	}
	
}
