import React from 'react';
import { Fragment, useContext, useState, useEffect } from 'react';
import QuestionEditorMacroButtons from './questionEditorButtons/QuestionEditorMacroButtons';
import Spinner from '../../layout/Spinner';
import PleaseAddTitleAlert from '../../modals/PleaseAddTitleAlert';
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';

const QuestionEditorPublic = () => {
    const quizToEditPublic = useContext(QuizPublicContext);
    const { currentQuestionEditPublic, updateQuestionPublic, deleteQuestionPublic, loadingPublic, addQuestionPublic, quizEditPublic } = quizToEditPublic;

    const [modal, setModal] = useState(false);

    const [questionEditPublic, setQuestionEditPublic] = useState({
        title: '',
        Answer: '',
        WrongAnswer1: '',
        WrongAnswer2: '',
        WrongAnswer3: ''
    });
    const {title, Answer, WrongAnswer1, WrongAnswer2, WrongAnswer3} = questionEditPublic;

    const onChange = e => setQuestionEditPublic({...questionEditPublic, [e.target.name]: e.target.value});

    useEffect(() => {
        if (currentQuestionEditPublic !== null) {
            setQuestionEditPublic(currentQuestionEditPublic);
        }else{
            setQuestionEditPublic({
                title: '',
                Answer: '',
                WrongAnswer1: '',
                WrongAnswer2: '',
                WrongAnswer3: ''
            });
        };
    }, [quizToEditPublic, currentQuestionEditPublic, setQuestionEditPublic]);

    const submitQ = e => {
        e.preventDefault();
        let nameTaken = false;
        quizEditPublic.quizQuestions.map(qName => {
            if(qName.title === questionEditPublic.title) {
                nameTaken = true;
            };
        });
        if(questionEditPublic.title !== '' && questionEditPublic.Answer !== '' && nameTaken !== true) {
            addQuestionPublic(questionEditPublic);
        }else{
            setModal(true);
        }
        setQuestionEditPublic({
            title: '',
            Answer: '',
            WrongAnswer1: '',
            WrongAnswer2: '',
            WrongAnswer3: ''
        });
    };

    const updateQ = () => {
        if(currentQuestionEditPublic !== null) {
            if(questionEditPublic.title !== '' && questionEditPublic.Answer !== '') {
                updateQuestionPublic(currentQuestionEditPublic.title, questionEditPublic);
            }else{
                setModal(true);
            };
        };
    };

    const onDelete = () => {
        if(currentQuestionEditPublic !== null) {
            deleteQuestionPublic(currentQuestionEditPublic.title);
        };
    };

    if(loadingPublic) return <Spinner />;

    return (
        <Fragment>
            <div className="quiz-dashboard-macros-container">
                <QuestionEditorMacroButtons />
            </div>
            <div className="question-template">
                <div className="q-and-a-input">
                    <input onChange={onChange} type="text" placeholder="Question" value={title} name="title"/>
                    <input onChange={onChange} type="text" placeholder="Answer" value={Answer} name="Answer"/>
                </div>
                <div className="three-alt-options">
                    <input onChange={onChange} type="text" placeholder="Option A" value={WrongAnswer1} name="WrongAnswer1"/>
                    <input onChange={onChange} type="text" placeholder="Option B" value={WrongAnswer2} name="WrongAnswer2"/>
                    <input onChange={onChange} type="text" placeholder="Option C" value={WrongAnswer3} name="WrongAnswer3"/>
                </div>
            </div>
            <div className="question-dashboard-macros-container">
                <button onMouseUp={currentQuestionEditPublic !== null ? updateQ : submitQ } className="question-dashboard-macros">{currentQuestionEditPublic !== null ? 'Update Question' : 'Add Question' }</button>
                <button onClick={onDelete} className="question-dashboard-macros">Remove Question</button>
            </div>
                { modal && <PleaseAddTitleAlert closeModal={setModal}/>}
        </Fragment>
    )
};

export default QuestionEditorPublic;
