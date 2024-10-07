import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListResponses = () => {
  const { surveyId } = useParams();
  const [groupedResponses, setGroupedResponses] = useState({});

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getResponses/${surveyId}`
        );
        // Group responses by question
        const grouped = response.data.reduce((acc, curr) => {
          const questionId = curr.question.id;
          if (!acc[questionId]) {
            acc[questionId] = {
              question: curr.question,
              responses: [],
            };
          }
          acc[questionId].responses.push(curr);
          return acc;
        }, {});
        setGroupedResponses(grouped);
      } catch (error) {
        console.log('Error fetching responses:', error);
      }
    };
    fetchAnswers();
  }, [surveyId]);

  // Function to generate and download the PDF using the Ruby backend
  const generatePDF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4567/generate-pdf',
        {
          surveyId: surveyId,
          groupedResponses: groupedResponses,
        },
        {
          responseType: 'blob', // Ensures we get the file as a binary blob
        }
      );

      // Create a URL for the blob and download the PDF
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Survey_${surveyId}_Responses.pdf`;
      link.click();

      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.log('Error generating PDF:', error);
    }
  };

  // Function to preview the PDF in a new tab
  const previewPDF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4567/generate-pdf',
        {
          surveyId: surveyId,
          groupedResponses: groupedResponses,
        },
        {
          responseType: 'blob',
        }
      );

      // Create a URL for the blob and open the PDF in a new tab
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');

      // Clean up the URL object after preview
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.log('Error previewing PDF:', error);
    }
  };

  return (
    <div className="bg-[#701852] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-100 mb-8 text-center">
          Responses for Survey {surveyId}
        </h2>

        {/* Buttons */}
        <div className="mb-4 text-center">
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white py-2 px-4 rounded-lg mr-4"
          >
            Download Responses
          </button>
          <button
            onClick={previewPDF}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Preview Responses
          </button>
        </div>

        {Object.values(groupedResponses).length === 0 ? (
          <p className="text-center text-gray-200">No responses yet.</p>
        ) : (
          Object.values(groupedResponses).map((questionGroup) => (
            <div key={questionGroup.question.id} className="mb-8">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Question: {questionGroup.question.text}
                </h3>
                <div className="space-y-4">
                  {questionGroup.responses.map((response) => (
                    <div
                      key={response.id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <p className="text-gray-700">
                        <span className="font-medium">User:</span>{' '}
                        {response.user.username} (ID: {response.user.id})
                      </p>
                      <p className="text-gray-700 mt-1">
                        <span className="font-medium">Answer:</span>{' '}
                        {response.answer !== null
                          ? response.answer
                          : response.optionAnswers
                          ? response.optionAnswers
                              .map((opt) => opt.value)
                              .join(', ')
                          : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListResponses;