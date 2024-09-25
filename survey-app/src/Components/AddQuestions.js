// src/Components/AddQuestions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddQuestions = () => {
  const { surveyId } = useParams();
  const [text, setText] = useState('');
  const [type, setType] = useState('text');
  const [options, setOptions] = useState(['']);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [reloadCounter, setReloadCounter] = useState(0);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const curr_response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);
        setResponse(curr_response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSurveyData();
  }, [reloadCounter, surveyId]);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFinalSubmit = () => {
    alert('Successfully Added Questions');
    navigate('/landhere');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = {
      text,
      type,
      options: options.filter((o) => o !== '').map((option) => ({ value: option })),
    };
    try {
      await axios.post(`http://localhost:8080/addQuestion/${surveyId}`, question);
      setText('');
      setType('text');
      setOptions(['']);
      setReloadCounter(reloadCounter + 1);
    } catch (error) {
      console.error('There was an error adding the question!', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-2/3 bg-[#701852] p-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
      <div className="bg-gray-200 py-8 px-6 shadow-lg rounded-lg sm:px-10">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Preview
            </h2>

            {response &&
              response.questions &&
              response.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  {question.type === 'text' && (
                    <>
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                        {question.text}
                      </label>
                      <input
                        type="text"
                        readOnly
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                disabled
                                className="mr-2"
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
                    <>
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                      {question.text}
                    </label>
                  </>
                  )}

                  {question.type === 'heading' && (
                    <>
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                      <h3>{question.text}</h3>
                    </label>
                  </>
                  )}  

                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-1/3 flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-4">Add Questions</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Question Text:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="text">Text</option>
              <option value="checkbox">Checkbox</option>
              <option value="content">Plain Text</option>
              <option value="heading">Heading</option>
              {/* Add other types if needed */}
            </select>
          </div>
          {type === 'checkbox' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Options:</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mt-1">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {index === options.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="ml-2 px-3 py-2 bg-indigo-600 text-white rounded-md"
                    >
                      Add Option
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* No options needed for 'content' or 'text' types */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Question
          </button>
        </form>
        <form onSubmit={handleFinalSubmit} className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
