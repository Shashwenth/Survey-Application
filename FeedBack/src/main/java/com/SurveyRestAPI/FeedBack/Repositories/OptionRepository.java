package com.SurveyRestAPI.FeedBack.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SurveyRestAPI.FeedBack.Entities.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long>{

}
