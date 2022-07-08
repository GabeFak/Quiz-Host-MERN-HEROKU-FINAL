import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const QuizWipEditItem = ({ quiz }) => {
    const {quizName, isPublished} = quiz;

    const quizContext = useContext(QuizWipContext);
    const { clearCurrentQuestionEdit } = quizContext;

    const onClick = () => {
        clearCurrentQuestionEdit();
    };

    return (
        <div className= "submit-btn" onClick={onClick}><Link to={`/QuizEditor/${quizName}/${isPublished}`}>{quizName}</Link></div>
    )
};

export default QuizWipEditItem;

