import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import EnterSurveyPic from '../CSS/EnterSurvey.png'

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
            console.log(auth.user.id);
            console.log(`http://localhost:8080/searchAnswers/${surveyId}?userId=${auth.user.id}`);
            const checkResponseEntry = await axios.get(`http://localhost:8080/searchAnswers/${surveyId}?userId=${auth.user.id}`);
            console.log(checkResponseEntry);
            if(checkResponseEntry.data){
                alert("You Have Already Responded to The Survey. Sorry we do not have editing feature currently!");
                navigate(`/`);
            }
            else{
                const response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);

            if(response.data.access==="Public"){
                navigate(`/Respond/${surveyId}`);
            }
            else{
                navigate(`/AuthorizeAccess/${surveyId}`);
            }
            }
            
        } catch (error) {
            console.error('There was an error Getting the survey!', error);
        }


    }



    return(
        <div className="flex min-h-screen">
            <div className="w-1/3 flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-4">Enter Survey Code</h2>
                        <form onSubmit={handleSubmit}  className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Enter Code</label>
                        <input
                            type="number"
                            value={surveyId}
                            onChange={(e)=>setSurveyId(e.target.value)}
                            required className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >Enter
                            </button>
                        </form>
            </div>

            <div className="w-2/3 bg-[#701852] p-4">
            <img
                src={EnterSurveyPic}
                alt="Survey Illustration"
                className="object-cover w-full h-full"
                />
            </div>
            
        </div>
        
    );

};

export default EnterSurvey;