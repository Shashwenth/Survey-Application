// src/Components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email });
      navigate(`/reset-password/${response.data.id}`);
      
    } catch (error) {
        setMessage("Enter a valid Email");
      //console.error('Error resetting password:', error);
      //setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-neutral-100 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-neutral-50 py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {message && (
                <div className="text-sm text-center text-red-500">
                  {message}
                </div>
              )}

              <div className="mt-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm
                  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
