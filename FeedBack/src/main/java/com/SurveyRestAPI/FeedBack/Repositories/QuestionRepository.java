package com.SurveyRestAPI.FeedBack.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SurveyRestAPI.FeedBack.Entities.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
