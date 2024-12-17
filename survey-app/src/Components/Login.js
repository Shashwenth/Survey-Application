import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import landingpagepic from '../CSS/landingPage.png'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [messageIndex, setMessageIndex] = useState(0); // Track message index
    const navigate = useNavigate();
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

    const from = location.state?.from?.pathname || '/landhere';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('https://my-spring-boot-app-latest-v7ht.onrender.com/sign/login', { email, password });
            login(response.data);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('There was an error logging in!', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        // <div className="bg-gray-200 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex min-h-screen">

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg flex items-center">
                        <div className="loader mr-3 border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                        <span className="text-gray-900 font-medium">{loadingMessages[messageIndex]}</span>
                    </div>
                </div>
            )}

            <div className="w-1/2">
                <img
                    src={landingpagepic}
                    alt="Survey Illustration"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-1/2 bg-white flex flex-col">
                <div className='text-center p-4 m-4'>
                    <h2>You are just one step away...</h2>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="bg-neutral-50 py-8 px-6 shadow-lg rounded-lg sm:px-10">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign In
                        </h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit}>
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
                                            className="block w-full px-2 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1
                                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </Link>
                                        </div>
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
                                            className="block w-full px-2 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1
                                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className='mt-5'>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm
                                      font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className="text-sm mt-2">
                                <span>Not a User? </span>
                                <span>
                                    <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Click here
                                    </Link>
                                </span>
                                <span> to Sign Up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
