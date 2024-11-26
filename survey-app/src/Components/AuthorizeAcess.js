import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useParams } from 'react-router-dom';
import EnterSurveyPic from '../CSS/EnterPasscode.png'

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSurveyUniqueId/${surveyId}`);
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
        <div className="flex min-h-screen">
            <div className="w-1/3 flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-4">Enter Secret Code Code</h2>
                        <form onSubmit={handleSubmit}  className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Enter Secret Code</label>
                        <input
                            type="text"
                            value={pass}
                            onChange={(e)=>SetPass(e.target.value)}
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


export default AuthorizeAccess;