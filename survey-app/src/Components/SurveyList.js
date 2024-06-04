// src/Components/SurveyList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const SurveyList = () => {
    const [surveys, setSurveys] = useState([]);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/usersurveys/${auth.user.id}`);
                setSurveys(response.data);
            } catch (error) {
                console.error('There was an error fetching the surveys!', error);
            }
        };

        if (auth.user) {
            fetchSurveys();
        }
    }, [auth.user]);

    const handleAddQuestions = (surveyId) => {
        navigate(`/add-questions/${surveyId}`);
    };

    const handleShowQuestions = (surveyId) => {
        navigate(`/feedback-form/${surveyId}`);
    };

    return (
        <div className='container-fluid p-0'>
            <div className='p-3' style={{ backgroundColor: 'pink' }}>
                <h2>Surveys</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Survey Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey) => (
                            <tr key={survey.id}>
                                <td>{survey.name}</td>
                                <td>
                                    <button className="btn btn-primary m-2" onClick={() => handleAddQuestions(survey.id)}>Add Questions</button>
                                    <button className="btn btn-warning m-2" onClick={() => handleShowQuestions(survey.id)}>Show Questions</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyList;
