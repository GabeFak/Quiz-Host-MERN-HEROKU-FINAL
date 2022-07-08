import React from 'react';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import QuizNameAndQuestionsBox from './quizEditorComponents/QuizNameAndQuestionsBox';
import QuestionEditor from './quizEditorComponents/QuestionEditor';
import QuestionEditorPublic from './quizEditorComponents/QuestionEditorPublic';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import AuthContext from '../../context/Auth/AuthContext';

const QuizEditor = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const quizContext = useContext(QuizWipContext);
    const { fillInQuizEditState, loading, setLoggedIn, catchFillInNewQuizFinishFalse, FillInNewQuizFinish } = quizContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { fillInQuizEditStatePublic, loadingPublic } = quizPublicContext;
    
    const quizParam = useParams();

    useEffect(() => {
        loadUser();
        
        if(FillInNewQuizFinish === true) {
            catchFillInNewQuizFinishFalse();
        } else if(quizParam.isPub === 'Unpublished') { 
            fillInQuizEditState(quizParam.quizName);
        } else if(quizParam.isPub === 'Published') {
            fillInQuizEditStatePublic(quizParam.quizName);
        };
    
        setLoggedIn();
        //eslint-disable-next-line
    }, []);

    if(loading || loadingPublic) { return <Spinner />;
    } else {

    return (
        <div className="dashboard-container-quiz-edit dashboard-container">
            <div className="left-elements-quiz-creator">
                <QuizNameAndQuestionsBox />
            </div>
            <div className="right-elements">
                { quizParam.isPub === 'Unpublished' ? 
                        <QuestionEditor /> 
                    :
                        <QuestionEditorPublic />
                }
            </div>
        </div>
    )};
};

export default QuizEditor;