// src/Components/SurveyList.js
import React, { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'; // Import components
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  function openModal(survey) {
    setSelectedSurvey(survey);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedSurvey(null);
  }

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/usersurveys/${auth.user.id}`,
          {
            params: { page, size: 4 }, // Add pagination params here
          }
        );
        setSurveys(response.data.content); // Set the current page's surveys
        setTotalPages(response.data.totalPages !=0 ? response.data.totalPages : 1); // Set the total number of pages
       // console.log("Inside List");
        //console.log(totalPages)
      } catch (error) {
        console.error('There was an error fetching the surveys!', error);
      }
    };

    if (auth.user) {
      fetchSurveys();
    }
  }, [auth.user, page, refresh]);

  const handleAddQuestions = (surveyId) => {
    navigate(`/add-questions/${surveyId}`);
  };

  const handleEndNow = async (surveyId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/EndNow/${surveyId}`);
      if (response.data) {
        setRefresh((prev) => !prev);
      }
      alert(`The Survey is Ended`);
    } catch (error) {
      alert(`Some error encountered, try again later`);
      console.log(error);
    }
  };

  const showAnswers = (surveyId) => {
    navigate(`/list-answer/${surveyId}`);
  };

  const useCopyToClipboard = () => {
    const [copiedSurveyId, setCopiedSurveyId] = useState(null);

    const copyToClipboard = async (surveyId) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSurveyId/${surveyId}`);
        var copyText =
          response.data.access !== 'Public'
            ? `https://taupe-toffee-5512eb.netlify.app/#/AuthorizeAccess/${surveyId}`
            : `https://taupe-toffee-5512eb.netlify.app/#/Respond/${surveyId}`;

        await navigator.clipboard.writeText(copyText);
        setCopiedSurveyId(surveyId); // Set the copied survey ID
        //console.log('Copied to clipboard:', copyText);
      } catch (error) {
        setCopiedSurveyId(null); // Reset if an error occurs
        console.error('Unable to copy to clipboard:', error);
      }
    };

    return { copiedSurveyId, copyToClipboard };
  };

  const { copiedSurveyId, copyToClipboard } = useCopyToClipboard();

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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Entrance Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Secret Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Copy Link
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{survey.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAddQuestions(survey.id)}
                    >
                      Add Questions/Preview
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() => handleEndNow(survey.id)}
                    >
                      End Now
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                      onClick={() => showAnswers(survey.id)}
                    >
                      Show Answers
                    </button>

                    {/* New View Details Button */}
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => openModal(survey)}
                    >
                      View Details
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{survey.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{survey.uniqueId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded"
                    onClick={() => copyToClipboard(survey.id)}
                  >
                    {copiedSurveyId === survey.id ? 'Copied!' : 'Copy Link'}
                  </button>
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
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
          onClick={goToNextPage}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50" />

          <div className="min-h-screen px-4 text-center">
            {/* Centering trick */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-[-50px] scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-[-50px] scale-95"
            >
              <DialogPanel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                  Survey Details
                </DialogTitle>
                {selectedSurvey && (
                  <div className="mt-4 text-gray-700 space-y-2">
                    <p>
                      <strong>Name:</strong> {selectedSurvey.name}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedSurvey.status}
                    </p>
                    <p>
                      <strong>Unique ID:</strong> {selectedSurvey.uniqueId}
                    </p>
                    <p>
                      <strong>Access:</strong> {selectedSurvey.access}
                    </p>
                    <p>
                      <strong>Start Time:</strong>{' '}
                      {new Date(selectedSurvey.startTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>End Time:</strong>{' '}
                      {new Date(selectedSurvey.endTime).toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="mt-6 text-right">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SurveyList;
