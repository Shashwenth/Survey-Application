import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddQuestions = () => {
    const { surveyId } = useParams();
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [options, setOptions] = useState(['']);
    const [response, setResponse] = useState(null);  // Store the survey data (including questions)
    const navigate = useNavigate();
    const [counterForGetMethodReloading, setCounterForGetMethodReloading] = useState(0); // Initialize to 0

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                console.log(`http://localhost:8080/getSurveyId/${surveyId}`);
                const curr_response = await axios.get(`http://localhost:8080/getSurveyId/${surveyId}`);
                setResponse(curr_response.data);  // Set the full survey response (including questions)
                //console.log("Survey Data:", curr_response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSurveyData();
    }, [counterForGetMethodReloading, surveyId]);

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleFinalSubmit = () => {
        alert("Successfully Added Questions");
        navigate("/");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const question = { 
            text, 
            type, 
            options: options.filter(o => o !== '').map(option => ({ value: option })) 
        };
        try {
            await axios.post(`http://localhost:8080/addQuestion/${surveyId}`, question);
            setText('');
            setType('text');
            setOptions(['']);
            setCounterForGetMethodReloading(counterForGetMethodReloading + 1); // Trigger reload
        } catch (error) {
            console.error('There was an error adding the question!', error);
        }
    };

    return (
        <div>
            <h2>Add Questions</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question Text:</label>
                    <input 
                        type="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        required
                    >
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="content">Content</option>
                    </select>
                </div>
                {type === 'checkbox' && (
                    <div>
                        <label>Options:</label>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                />
                                {index === options.length - 1 && (
                                    <button type="button" onClick={handleAddOption}>Add Option</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit">Add Question</button>
            </form>
            <form onSubmit={handleFinalSubmit}>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Questions</h3>
                <ul>
                    {response && response.questions && response.questions.map((question, index) => (
                        <li key={index}>{question.text} ({question.type})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddQuestions;
