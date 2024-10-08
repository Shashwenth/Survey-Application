// src/Components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [changed, setChange] =useState(false);
  const navigate=useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/reset-password/${token}`, {
        password,
      });
      setChange(true);
      setMessage('Your password has been reset successfully.',"color: yellow;");
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };


  const GotoLogin = () => {
    setChange(false);
    navigate("/login");
  }

  return (
    <div className="bg-neutral-100 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-neutral-50 py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
          <div className="mt-10">
            {
                !changed && (
                    <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {message && (
                <div className="text-m text-center text-green-700">
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
                  Reset Password
                </button>
              </div>
            </form>
                )
            }
            {
                changed && (
                    <form className="space-y-6" onSubmit={GotoLogin}>
                        
                        {message && (
                            <div className="text-m text-center text-green-700">
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
                
                )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
