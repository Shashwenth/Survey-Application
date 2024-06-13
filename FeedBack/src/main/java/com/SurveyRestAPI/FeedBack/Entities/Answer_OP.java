package com.SurveyRestAPI.FeedBack.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Answer_OP {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long question_id;
	
	private Long answer_id;
	
	private String question;
	
	private String answer;

	private Long surveyId;

	public Answer_OP(Long id, Long question_id, Long answer_id, String question, String answer, Long surveyId) {
		super();
		this.id = id;
		this.question_id = question_id;
		this.answer_id = answer_id;
		this.question = question;
		this.answer = answer;
		this.surveyId = surveyId;
	}
	
	

	public Answer_OP() {
		super();
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Long question_id) {
		this.question_id = question_id;
	}

	public Long getAnswer_id() {
		return answer_id;
	}

	public void setAnswer_id(Long answer_id) {
		this.answer_id = answer_id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Long getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Long surveyId) {
		this.surveyId = surveyId;
	}
	
	
}
	