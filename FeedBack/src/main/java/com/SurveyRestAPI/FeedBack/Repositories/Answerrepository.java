package com.SurveyRestAPI.FeedBack.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SurveyRestAPI.FeedBack.Entities.Answer;

public interface Answerrepository extends JpaRepository<Answer, Long>{
	List<Answer> findBySurveyId(Long surveyId);
}
