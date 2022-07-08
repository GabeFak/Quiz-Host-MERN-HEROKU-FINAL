import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; 
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';

const PublishedQuizesListItem = ({ publicQuizToList }) => {
    const quizPublicContext = useContext(QuizPublicContext);
    const {fillInQuizEditStatePublic} = quizPublicContext;

    const nav = useNavigate();

    const preview = () => {
        fillInQuizEditStatePublic(publicQuizToList.quizName);
        nav(`/QuizPreview/${publicQuizToList.quizName}/${publicQuizToList.isPublished}`);
    };

    return (
        <div className="quiz-element change-cursor" onClick={preview}>{publicQuizToList.quizName}</div>
    )
};

export default PublishedQuizesListItem;
