import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


const EnterSurvey = () => {

    const [surveyId, setSurveyId]= useState("");
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth.user || !auth.user.id) {
            console.error('User ID is not set');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);
            if(response.data.access==="Public"){
                navigate(`/Respond/${surveyId}`);
            }
            else{
                navigate(`/AuthorizeAccess/${surveyId}`);
            }
        } catch (error) {
            console.error('There was an error Getting the survey!', error);
        }


    }



    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <h2><b>Enter Survey Id To Enter Response</b></h2>
                <input
                type="number"
                value={surveyId}
                onChange={(e)=>setSurveyId(e.target.value)}
                required />
                <button type="submit">Enter</button>
            </form>
        </div>
    );

};

export default EnterSurvey;