import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPublicQuizesContext from '../../../context/AllPublicQuizes/AllPublicQuizesContext';

const HomeQuizList = ({ quizName, quizAuthor, views}) => {
    const allPublicQuizesContext = useContext(AllPublicQuizesContext);
    const { fillIncurrentActiveQuiz } = allPublicQuizesContext;

    const nav = useNavigate();

    const onClick = () => {
        fillIncurrentActiveQuiz(quizName);
        nav(`/ActiveQuiz/${quizName}`);
    };

    return (
        <div className="public-quiz-list-home" onClick={onClick}>
            <div> <b>{quizName}</b> by: {quizAuthor}</div>
            <div></div>
            <div>Views: {views}</div>
        </div>
    )
};

export default HomeQuizList