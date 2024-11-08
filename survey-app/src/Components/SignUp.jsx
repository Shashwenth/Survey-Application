// src/Components/SignUp.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../CSS/index.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility
  const [loading, setLoading] = useState(false); // Loading state
    const [messageIndex, setMessageIndex] = useState(0); // Track message index
  const navigate = useNavigate();

  // Function to close the modal

  const location = useLocation();

    const loadingMessages = [
        "Starting server...",
        "Requesting render.com to start server...",
        "Initializing the backend...",
        "Contacting the Database...",
        "Logging in..."
    ];

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
            }, 2000); // Change message every 2 seconds
        } else {
            setMessageIndex(0); // Reset when not loading
        }
        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [loading]);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const checkResponse = await axios.get(`${process.env.REACT_APP_API_URL}/sign/checkUserExist`, {
        params: { email }  
      });
      console.log(checkResponse.data);
      if(checkResponse.data){
        alert("User already Exist. Please Try Again or Login");
        navigate('/signup');
      }
      else{
        await axios.post(`${process.env.REACT_APP_API_URL}/sign/signup`, { username, password,email });
        alert('User registered successfully');
        setUsername('');
        setPassword('');
        navigate('/login');
      }
      
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (

    
    <div className="bg-fuchsia-950 flex min-h-screen flex-col justify-center px-6 lg:px-8">
      {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg flex items-center">
                        <div className="loader mr-3 border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                        <span className="text-gray-900 font-medium">{loadingMessages[messageIndex]}</span>
                    </div>
                </div>
            )}


{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Attention!
            </h2>
            <p className="text-gray-600 mb-6">
              This web app currently does not encrypt your email or validates it. Refrain using PII. Use any random string in an email format.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-neutral-50 py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for your account
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
                font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
