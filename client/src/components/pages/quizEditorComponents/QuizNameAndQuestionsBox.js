import React from 'react';
import { useParams } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import Spinner from '../../layout/Spinner';
import QuizQuestionEditItem from './QuizQuestionEditItem';
import ChangeQuizNameModal from '../../modals/ChangeQuizNameModal';
import QuizWipContext from '../../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';

const QuizNameAndQuestionsBox = () => {
    const isQuizPublished = useParams();

    const quizToEditWip = useContext(QuizWipContext);
    const { quizEdit, loading, clearCurrentQuestionEdit } = quizToEditWip;

    const quizPublicContext = useContext(QuizPublicContext);
    const { quizEditPublic, clearCurrentQuestionEditPublic, loadingPublic} = quizPublicContext;

    const [modal, setModal] = useState(false);

    const onClick = () => {
        setModal(true);
    };

    if(loading || loadingPublic) return <Spinner />;

    return (
        <Fragment>
            <div className="quiz-name change-cursor" onClick={onClick}>
                { quizEdit === undefined || quizEdit.quizQuestions === undefined || quizEditPublic === undefined || quizEditPublic.quizQuestions === undefined ? 
                    <i></i> :
                <>
                    {isQuizPublished.isPub === 'Unpublished' ? <h3>{quizEdit.quizName}<i className="far fa-star"></i></h3> : <h3>{quizEditPublic.quizName}<i className="fas fa-star"></i></h3>} 
                </> }              
            </div>
                <div className="quiz-q-frames">
                    <h2>Questions</h2>
                    <div className="question-container">
                        { quizEdit === undefined || quizEdit.quizQuestions === undefined || quizEditPublic === undefined || quizEditPublic.quizQuestions === undefined  ?
                            <i></i> :
                        <>
                            {isQuizPublished.isPub === 'Unpublished' ? 
                                quizEdit.quizQuestions.map(question => (
                                    <QuizQuestionEditItem key={question.title} question={question} />
                                ))
                            :
                                quizEditPublic.quizQuestions.map(question => (
                                    <QuizQuestionEditItem key={question.title} question={question} />
                                ))
                            }
                        </> }
                        <button onClick={() => {
                            if(isQuizPublished.isPub === 'Unpublished') {
                                clearCurrentQuestionEdit();
                            } else if(isQuizPublished.isPub === 'Published') {
                                clearCurrentQuestionEditPublic();
                            };
                        }} className="question-element q-element-text-large"><b>+</b></button>
                    </div>
                </div>
                    { modal && <ChangeQuizNameModal closeModal={setModal}/>}
        </Fragment>
    )
};

export default QuizNameAndQuestionsBox;