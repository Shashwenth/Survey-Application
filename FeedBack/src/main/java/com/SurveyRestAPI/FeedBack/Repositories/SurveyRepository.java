package com.SurveyRestAPI.FeedBack.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.SurveyRestAPI.FeedBack.Entities.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
	
	Page<Survey> findByUserIdAndStatus(Long userId, String status, Pageable pageable);
	Page<Survey> findByUserId(Long userId, Pageable pageable);
	
	

}
