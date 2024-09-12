// src/Components/ShowFeedbackForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowFeedbackForm = () => {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);
                setSurvey(response.data);
            } catch (error) {
                console.error('There was an error fetching the survey!', error);
            }
        };

        fetchSurvey();
    }, [surveyId]);

    return (
        <div>
            {survey ? (
                <div>
                    <h2>{survey.name}</h2>
                    <form>
                        {survey.questions.map((question) => (
                            <div key={question.id}>
                                <label>{question.text}</label>
                                {question.type === 'text' ? (
                                    <input type="text" />
                                ) : question.type === 'checkbox' ? (
                                    question.options.map((option, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={option.id} name={question.text} value={option.value} />
                                            <label htmlFor={option.id}>{option.value}</label>
                                        </div>
                                    ))
                                ) : <br></br>
                            }
                            </div>
                        ))}
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowFeedbackForm;
