package com.SurveyRestAPI.FeedBack.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SurveyRestAPI.FeedBack.Entities.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
	
	public List<Survey> findByUserIdAndStatus(Long userId, String status);

}
