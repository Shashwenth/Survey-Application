import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function AddResponse() {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);
        setSurvey(response.data);
      } catch (error) {
        console.error('There was an error fetching the survey!', error);
      }
    };
    fetchSurveyData();
  }, [surveyId]);

  // Handle input change for text and checkbox/option answers
  const handleInputChange = (e, questionId, isOption, optionId = null) => {
    const { type, checked, value } = e.target;

    if (type === 'checkbox' && isOption) {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: {
          ...prevResponses[questionId],
          isOption: "true",
          options: {
            ...prevResponses[questionId]?.options,
            [optionId]: checked
          }
        }
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: {
          ...prevResponses[questionId],
          isOption: "false",
          answer: value
        }
      }));
    }
    console.log(responses);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedResponses = survey.questions.map((question) => {
      const response = responses[question.id] || {};
      console.log(response);
      const selectedOptions = response.isOption === "true"
      ? Object.keys(response.options).filter(optionId => response.options[optionId])
      : [];

      return {
        answer: response.isOption==="true" ? null : response.answer,
        isOption: response.isOption==="true"?"true" : "false",
        option: response.isOption==="true" ? selectedOptions.map(Number): null,
        question: { id: question.id },
        survey: { id: surveyId },
        user: { id: auth.user.id } // Assuming auth.user.id is available
      };
    });
    console.log(formattedResponses)
    try {
      await axios.post(`http://localhost:8080/submitResponse/${surveyId}?userId=${auth.user.id}`, formattedResponses, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the response!', error);
    }
  };

  return (
    <div>
      {survey ? (
        <div>
          <h2>{survey.name}</h2>
          <form onSubmit={handleSubmit}>
            {survey.questions.map((question) => (
              <div key={question.id}>
                <label>{question.text}</label>

                {/* For text-based questions */}
                {question.type === 'text' && (
                  <input
                    type="text"
                    value={responses[question.id]?.answer || ''}
                    onChange={(e) => handleInputChange(e, question.id, false)}
                  />
                )}

                {/* For option-based (checkbox) questions */}
                {question.type === 'checkbox' && (
                  question.options.map((option) => (
                    <div key={option.id}>
                      <input
                        type="checkbox"
                        id={`${question.id}-${option.id}`}  // Unique ID based on question and option
                        name={`${question.id}-${option.id}`} // Ensure unique name for each option
                        value={option.id}
                        checked={responses[question.id]?.options?.[option.id] || false}
                        onChange={(e) => handleInputChange(e, question.id, true, option.id)}
                      />
                      <label htmlFor={`${question.id}-${option.id}`}>{option.value}</label>
                    </div>
                  ))
                )}
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
