import React, { Fragment, useContext } from 'react';
import QuizWipEditItem  from './QuizWipEditItem';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const QuizWipEdit = () => {
    const quizContext = useContext(QuizWipContext);
    const { quizes } = quizContext;

    return (
        <Fragment>
            {quizes.map(quiz => (
                <QuizWipEditItem key={quiz._id} quiz={quiz} />
            ))}
        </Fragment>
    )
};

export default QuizWipEdit;
