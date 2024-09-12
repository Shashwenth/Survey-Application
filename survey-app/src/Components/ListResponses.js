import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListResponses = () => {
    const { surveyId } = useParams();
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getResponses/${surveyId}`);
                setAnswers(response.data);
            } catch (error) {
                console.log('Error fetching responses:', error);
            }
        };
        fetchAnswers();
    }, [surveyId]);
    //console.log(answers);
    answers.map((response)=>(console.log(response)));
    answers.map((response)=>(console.log(response.id)));
    return (

        <div className="container">
            <h2>Responses for Survey {surveyId}</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Answer ID</th>
                        <th>Survey Name</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((response) => (
                        <tr key={response.id}>
                            <td>{response.id}</td>
                            <td>{response.survey.name}</td>
                            <td>{response.question.text}</td>
                            {/* <td>{response.survey.questions.find(q => q.id === response.survey.questions[response.id-1].id)?.text}</td> Get question text */}
                            <td>{response.answer!=null ? response.answer : "null"}</td>
                            <td>{response.user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListResponses;
