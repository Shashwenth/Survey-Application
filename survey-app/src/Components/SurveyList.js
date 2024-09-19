import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/usersurveys/${auth.user.id}`,
          {
            params: { page, size: 4 }, // Add pagination params here
          }
        );
        setSurveys(response.data.content); // Set the current page's surveys
        setTotalPages(response.data.totalPages); // Set the total number of pages
      } catch (error) {
        console.error('There was an error fetching the surveys!', error);
      }
    };

    if (auth.user) {
      fetchSurveys();
    }
  }, [auth.user, page]);

  const handleAddQuestions = (surveyId) => {
    navigate(`/add-questions/${surveyId}`);
  };

  const handleShowQuestions = (surveyId) => {
    navigate(`/feedback-form/${surveyId}`);
  };

  const respondQuestions = (surveyId) => {
    navigate(`/Respond/${surveyId}`);
  };

  const showAnswers = (surveyId) => {
    navigate(`/list-answer/${surveyId}`);
  };

  const goToNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Surveys</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Survey Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr
                key={survey.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {survey.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAddQuestions(survey.id)}>
                      Add Questions
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() => handleShowQuestions(survey.id)}>
                      Show Questions
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => respondQuestions(survey.id)}>
                      Answer Survey
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                      onClick={() => showAnswers(survey.id)}>
                      Show Answers
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
          onClick={goToPreviousPage}
          disabled={page === 0}>
          Previous
        </button>
        <span className="text-gray-700">
          Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
          onClick={goToNextPage}
          disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SurveyList;
