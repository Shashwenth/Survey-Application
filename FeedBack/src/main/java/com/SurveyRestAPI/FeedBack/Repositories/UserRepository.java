package com.SurveyRestAPI.FeedBack.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SurveyRestAPI.FeedBack.Entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public User findByUsername(String username);

}
