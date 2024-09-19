import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListResponses = () => {
  const { surveyId } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getResponses/${surveyId}`
        );
        setAnswers(response.data);
      } catch (error) {
        console.log('Error fetching responses:', error);
      }
    };
    fetchAnswers();
  }, [surveyId]);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Responses for Survey {surveyId}
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Answer ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Survey Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Question
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Answer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                User
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {answers.map((response, index) => (
              <tr
                key={response.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {response.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {response.survey.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {response.question.text}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {response.answer !== null ? response.answer : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {response.user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListResponses;
