import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPublicQuizesContext from '../../../context/AllPublicQuizes/AllPublicQuizesContext';

const HomeSearchItem = ({quizName, clearInput}) => {
    const allPublicQuizesContext = useContext(AllPublicQuizesContext);
    const { fillIncurrentActiveQuiz } = allPublicQuizesContext;

    const nav = useNavigate();

    const onClick = () => {
        clearInput();
        fillIncurrentActiveQuiz(quizName);
        nav(`/ActiveQuiz/${quizName}`);
    };

    return (
        <div className='search-dropdown-div' onClick={onClick}>{quizName}</div>
    )
};

export default HomeSearchItem;