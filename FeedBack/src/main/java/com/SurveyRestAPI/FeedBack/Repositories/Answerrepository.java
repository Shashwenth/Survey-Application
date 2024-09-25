package com.SurveyRestAPI.FeedBack.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.SurveyRestAPI.FeedBack.Entities.Answer;
import com.SurveyRestAPI.FeedBack.Entities.Survey;

public interface Answerrepository extends JpaRepository<Answer, Long>{
	List<Answer> findBySurveyId(Long surveyId);
	List<Answer> findBySurveyIdAndUserId(Long surveyId, Long userId);
	
	@Query("select count(distinct r.user.id) from Answer r where r.survey.id= :#{#survey.id}")
	Long findtotalCount(@Param("survey") Survey Survey);
}
