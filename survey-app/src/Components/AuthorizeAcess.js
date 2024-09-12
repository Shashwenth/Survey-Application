import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useParams } from 'react-router-dom';

const AuthorizeAccess = () => {
    const { surveyId } = useParams();
    const [ pass, SetPass] = useState(null);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth.user || !auth.user.id) {
            console.error('User ID is not set');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/getSurveyUniqueId/${surveyId}`);
            if(response.data===pass){
                navigate(`/Respond/${surveyId}`);
            }
            else{
                alert("Wrong Password! Try Again")
                navigate(`/AuthorizeAccess/${surveyId}`);
            }
        } catch (error) {
            console.error('There was an error Getting the survey!', error);
        }


    }
    
    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <h2><b>Enter Survey Password Enter Response</b></h2>
                <input
                type="text"
                value={pass}
                onChange={(e)=>SetPass(e.target.value)}
                required />
                <button type="submit">Enter</button>
            </form>
        </div>
    );

};


export default AuthorizeAccess;