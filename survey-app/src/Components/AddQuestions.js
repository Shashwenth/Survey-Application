// src/Components/AddQuestions.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddQuestions = () => {
    const { surveyId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [options, setOptions] = useState(['']);

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
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
            setQuestions([...questions, question]);
            setText('');
            setType('text');
            setOptions(['']);
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
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <div>
                    <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
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
            <div>
                <h3>Questions</h3>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>{question.text} ({question.type})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddQuestions;
