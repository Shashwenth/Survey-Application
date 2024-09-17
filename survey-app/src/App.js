// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Example from './Components/NewLandingPage';
import AuthProvider, { AuthContext } from './Context/AuthContext';
import Layout from './Components/Layout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/add-survey" element={<PrivateRoute><AddSurvey /></PrivateRoute>} />
            <Route path="/add-questions/:surveyId" element={<PrivateRoute><AddQuestions /></PrivateRoute>} />
            <Route path="/feedback-form/:surveyId" element={<PrivateRoute><ShowFeedbackForm /></PrivateRoute>} />
            <Route path="/Respond/:surveyId" element={<PrivateRoute><AddResponse /></PrivateRoute>} />
            <Route path="/list-answer/:surveyId" element={<PrivateRoute><ListResponses /></PrivateRoute>} />
            <Route path="/AuthorizeAccess/:surveyId" element={<PrivateRoute><AuthorizeAccess /></PrivateRoute>} />
            <Route path="/enter-survey" element={<PrivateRoute><EnterSurvey /></PrivateRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><SurveyList /></PrivateRoute>} />
            <Route path="/landhere" element={<Example />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.user ? children : <Navigate to="/landhere" />;
};

export default App;
