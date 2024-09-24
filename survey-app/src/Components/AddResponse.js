import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function AddResponse() {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

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
          isOption: 'true',
          options: {
            ...prevResponses[questionId]?.options,
            [optionId]: checked,
          },
        },
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: {
          ...prevResponses[questionId],
          isOption: 'false',
          answer: value,
        },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedResponses = survey.questions.map((question) => {
      const response = responses[question.id] || {};
      const selectedOptions =
        response.isOption === 'true'
          ? Object.keys(response.options).filter((optionId) => response.options[optionId])
          : [];

      return {
        answer: response.isOption === 'true' ? null : response.answer,
        isOption: response.isOption === 'true' ? 'true' : 'false',
        option: response.isOption === 'true' ? selectedOptions.map(Number) : null,
        question: { id: question.id },
        survey: { id: surveyId },
        user: { id: auth.user.id },
      };
    });

    try {
      await axios.post(
        `http://localhost:8080/submitResponse/${surveyId}?userId=${auth.user.id}`,
        formattedResponses,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Successfully submitted');
      navigate(`/landhere`);
    } catch (error) {
      console.error('There was an error submitting the response!', error);
    }
  };

  return (
    <div className="flex justify-center bg-[#701852] py-8">
      <div className="w-full max-w-2xl bg-gray-200 py-8 px-6 shadow-lg rounded-lg sm:px-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
          Survey Form
        </h2>
        <form onSubmit={handleSubmit}>
          {survey &&
            survey.questions &&
            survey.questions.map((question, index) => (
              <div key={index} className="mb-6">
                {question.type === 'text' && (
                  <>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                      {question.text}
                    </label>
                    <input
                      type="text"
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={responses[question.id]?.answer || ''}
                      onChange={(e) => handleInputChange(e, question.id, false)}
                      required
                    />
                  </>
                )}

                {question.type === 'checkbox' && (
                  <>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                      {question.text}
                    </label>
                    <div>
                      {question.options &&
                        question.options.map((option, idx) => (
                          <div key={idx} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              id={`option-${index}-${idx}`}
                              name={question.text}
                              value={option.value}
                              className="mr-2"
                              checked={responses[question.id]?.options?.[option.id] || false}
                              onChange={(e) => handleInputChange(e, question.id, true, option.id)}
                            />
                            <label htmlFor={`option-${index}-${idx}`} className="text-gray-900">
                              {option.value}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {question.type === 'content' && (
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                )}
              </div>
            ))}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#701852] hover:bg-[#5a1442] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Responses
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
