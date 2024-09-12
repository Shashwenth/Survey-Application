package com.SurveyRestAPI.FeedBack.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AnswerSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answer;

    private String isOption;

    private List<Long> option;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;

    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public AnswerSubmission() {
        super();
    }

	public AnswerSubmission(Long id, String answer, String isOption, List<Long> option, Question question,
			Survey survey, User user) {
		super();
		this.id = id;
		this.answer = answer;
		this.isOption = isOption;
		this.option = option;
		this.question = question;
		this.survey = survey;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getIsOption() {
		return isOption;
	}

	public void setIsOption(String isOption) {
		this.isOption = isOption;
	}

	public List<Long> getOption() {
		return option;
	}

	public void setOption(List<Long> option) {
		this.option = option;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Survey getSurvey() {
		return survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
    

}