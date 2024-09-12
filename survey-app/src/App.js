// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AddSurvey from './Components/AddSurvey';
import SurveyList from './Components/SurveyList';
import AddQuestions from './Components/AddQuestions';
import ShowFeedbackForm from './Components/ShowFeedbackForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AddResponse from './Components/AddResponse'
import ListResponses from './Components/ListResponses'
import AuthProvider, { AuthContext } from './Context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <Navbar />
                    <main className="flex-grow-1">
                        <div className="container-fluid p-0">
                            <Routes>
                                <Route path="/add-survey" element={<PrivateRoute><AddSurvey /></PrivateRoute>} />
                                <Route path="/add-questions/:surveyId" element={<PrivateRoute><AddQuestions /></PrivateRoute>} />
                                <Route path="/feedback-form/:surveyId" element={<PrivateRoute><ShowFeedbackForm /></PrivateRoute>} />
                                <Route path="/Respond/:surveyId" element={<PrivateRoute><AddResponse /></PrivateRoute>} />
                                <Route path="/list-answer/:surveyId" element={<PrivateRoute><ListResponses /></PrivateRoute>} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<PrivateRoute><SurveyList /></PrivateRoute>} />
                            </Routes>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    return auth.user ? children : <Navigate to="/login" />;
};

export default App;
