package com.SurveyRestAPI.FeedBack.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.SurveyRestAPI.FeedBack.Entities.Answer_OP;

public interface Answer_OPRepository extends JpaRepository<Answer_OP, Long> {

    @Query("SELECT a FROM Answer_OP a WHERE a.surveyId = :surveyId AND a.user_id = :user_id")
    List<Answer_OP> findAnswersBySurveyIdAndUserId(@Param("surveyId") Long surveyId, @Param("user_id") Long user_id);
}
