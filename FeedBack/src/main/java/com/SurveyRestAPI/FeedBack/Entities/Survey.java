package com.SurveyRestAPI.FeedBack.Entities;

import java.time.OffsetDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;

@Entity
public class Survey {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	 @Transient
    private Long responsesCount;
	
	private String name;
	
	private String status;
	
	public String uniqueId;
	
	private String access;
	
	private OffsetDateTime startTime;

    private OffsetDateTime endTime;
	
	@OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<Question> questions;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;
	
	public Survey() {
		super();
	}

	
	

	public Survey(Long id, String name, String status, OffsetDateTime startTime, OffsetDateTime endTime,
			List<Question> questions, User user) {
		super();
		this.id = id;
		this.name = name;
		this.status = status;
		this.startTime = startTime;
		this.endTime = endTime;
		this.questions = questions;
		this.user = user;
	}

	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Long getResponsesCount() {
        return responsesCount;
    }

    public void setResponsesCount(Long responsesCount) {
        this.responsesCount = responsesCount;
    }

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public OffsetDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(OffsetDateTime startTime) {
		this.startTime = startTime;
	}

	public OffsetDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(OffsetDateTime endTime) {
		this.endTime = endTime;
	}

	public String getAccess() {
		return access;
	}


	public void setAccess(String access) {
		this.access = access;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}
	
	
	
}
