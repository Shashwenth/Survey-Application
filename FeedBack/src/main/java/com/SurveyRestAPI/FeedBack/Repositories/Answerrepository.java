package com.SurveyRestAPI.FeedBack.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SurveyRestAPI.FeedBack.Entities.Answer;

public interface Answerrepository extends JpaRepository<Answer, Long>{

}
