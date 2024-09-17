import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import createSurveyPic from '../CSS/CreateSurvey.png'

const AddSurvey = () => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [access, setAccess] = useState('');
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth.user || !auth.user.id) {
            console.error('User ID is not set');
            return;
        }

        // Ensure startTime and endTime are provided
        if (!startTime || !endTime) {
            console.error('Start time and end time are required');
            return;
        }

        // Create the survey object to send to the backend
        const survey = { 
            name, 
            access,
            startTime, 
            endTime 
        };

        console.log(survey);

        try {
            const response = await axios.post(`http://localhost:8080/addSurvey?userId=${auth.user.id}`, survey);
            console.log(response.data);
            setName('');
            setStartTime('');
            setEndTime('');
            setAccess('');
        } catch (error) {
            console.error('There was an error adding the survey!', error);
        }
    };

    return (
        <div className="flex h-screen">
      {/* Form Container */}
      <div className="w-2/5 flex flex-col p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Survey</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Survey Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Survey Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time:</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Manage Access */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Manage Access:</label>
            <select
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Survey
          </button>
        </form>
      </div>

      {/* Image Container */}
      <div className="w-3/5 bg-[#701852] p-4">
        <img
          src={createSurveyPic}
          alt="Survey Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
      
};

export default AddSurvey;
