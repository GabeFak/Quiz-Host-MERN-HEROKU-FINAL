import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import QuizWipContext from '../../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';

const QuizQuestionEditItem = ({ question }) => {
    const isQuizPublished = useParams();

    const quizToEdit = useContext(QuizWipContext);
    const { setCurrentQuestionEdit } = quizToEdit;

    const quizPublicContext = useContext(QuizPublicContext);
    const { setCurrentQuestionEditPublic } = quizPublicContext;

    return (
        <button onClick={() => {
            if(isQuizPublished.isPub === 'Unpublished') {
                setCurrentQuestionEdit(question);
            } else if(isQuizPublished.isPub === 'Published') {
                setCurrentQuestionEditPublic(question);
            };
        }} className="question-element"><em>{question.title}</em></button>
        // <b className='answer'>{question.Answer}</b>
    )
};

export default QuizQuestionEditItem;