package com.SurveyRestAPI.FeedBack.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SurveyRestAPI.FeedBack.Entities.Answer_OP;

public interface Answer_OPRepository extends JpaRepository<Answer_OP, Long> {


	List<Answer_OP> findBysurveyId(Long surveyId);

}
