// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddSurvey from './Components/AddSurvey';
import SurveyList from './Components/SurveyList';
import AddQuestions from './Components/AddQuestions';
import ShowFeedbackForm from './Components/ShowFeedbackForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import AddResponse from './Components/AddResponse';
import ListResponses from './Components/ListResponses';
import EnterSurvey from './Components/EnterASurvey';
import AuthorizeAccess from './Components/AuthorizeAcess';
import Example from './Components/NewLandingPage'; // Assuming this is your home page component
import AuthProvider from './Context/AuthContext';
import Layout from './Components/LayoutNew';
import Tabs from './Components/NewTab';
import PrivateRoute from './Components/PrivateRoute'; // We'll create this component
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import TestPopup from './Components/Popup'
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<Example />} />
            {/* Private Routes */}
            <Route path="/add-survey" element={<PrivateRoute><AddSurvey /></PrivateRoute>} />
            <Route path="/add-questions/:surveyId" element={<PrivateRoute><AddQuestions /></PrivateRoute>} />
            <Route path="/feedback-form/:surveyId" element={<PrivateRoute><ShowFeedbackForm /></PrivateRoute>} />
            <Route path="/Respond/:surveyId" element={<PrivateRoute><AddResponse /></PrivateRoute>} />
            <Route path="/list-answer/:surveyId" element={<PrivateRoute><ListResponses /></PrivateRoute>} />
            <Route path="/AuthorizeAccess/:surveyId" element={<PrivateRoute><AuthorizeAccess /></PrivateRoute>} />
            <Route path="/enter-survey" element={<PrivateRoute><EnterSurvey /></PrivateRoute>} />
            <Route path="/landhere" element={<PrivateRoute><Tabs /></PrivateRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
