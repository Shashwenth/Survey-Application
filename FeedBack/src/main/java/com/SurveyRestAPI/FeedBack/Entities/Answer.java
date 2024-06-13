package com.SurveyRestAPI.FeedBack.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Answer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String answer;
    
    @ManyToOne
    @JoinColumn(name="question_id")
    @JsonBackReference
    private Question question;
    
    @ManyToOne
    @JoinColumn(name="survey_id")
    private Survey survey;
    
    public Answer() {
        super();
    }

    public Answer(Long id, String answer, Question question, Survey survey) {
        super();
        this.id = id;
        this.answer = answer;
        this.question = question;
        this.survey = survey;
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
}
