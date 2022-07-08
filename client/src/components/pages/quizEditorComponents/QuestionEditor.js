import React from 'react';
import { Fragment, useContext, useState, useEffect } from 'react';
import Spinner from '../../layout/Spinner';
import QuestionEditorMacroButtons from './questionEditorButtons/QuestionEditorMacroButtons';
import PleaseAddTitleAlert from '../../modals/PleaseAddTitleAlert';
import QuizWipContext from '../../../context/QuizWip/QuizWipContext';

const QuestionEditor = () => {
    const [modal, setModal] = useState(false);

    const quizToEdit = useContext(QuizWipContext);
    const { loading, currentQuestionEdit, addQuestion, deleteQuestion, updateQuestion, quizEdit} = quizToEdit;

    const [questionEdit, setQuestionEdit] = useState({
        title: '',
        Answer: '',
        WrongAnswer1: '',
        WrongAnswer2: '',
        WrongAnswer3: ''
    });

    const {title, Answer, WrongAnswer1, WrongAnswer2, WrongAnswer3} = questionEdit;

    const onChange = e => setQuestionEdit({...questionEdit, [e.target.name]: e.target.value});

    useEffect(() => {
        if (currentQuestionEdit !== null) {
            setQuestionEdit(currentQuestionEdit);
        }else{
            setQuestionEdit({
                title: '',
                Answer: '',
                WrongAnswer1: '',
                WrongAnswer2: '',
                WrongAnswer3: ''
            });
        };
    }, [currentQuestionEdit, setQuestionEdit]);

    const submitQ = e => {
        e.preventDefault();
        let nameTaken = false;
        quizEdit.quizQuestions.map(qName => {
            if(qName.title === questionEdit.title) {
                nameTaken = true;
            };
        });
        if(questionEdit.title !== '' && questionEdit.Answer !== '' && nameTaken !== true) {
            addQuestion(questionEdit);
        }else{
            setModal(true);
        };
        setQuestionEdit({
            title: '',
            Answer: '',
            WrongAnswer1: '',
            WrongAnswer2: '',
            WrongAnswer3: ''
        });
    };

    const updateQ = () => {
        if(currentQuestionEdit !== null) {
            if(questionEdit.title !== '' && questionEdit.Answer !== '') {
                updateQuestion(currentQuestionEdit.title, questionEdit);
            }else{
                setModal(true);
            };
        };
    };

    const onDelete = () => {
        if(currentQuestionEdit !== null) {
            deleteQuestion(currentQuestionEdit.title);
        };
    };

    if(loading) return <Spinner />;

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
                <button onMouseUp={currentQuestionEdit !== null ? updateQ : submitQ } className="question-dashboard-macros">{currentQuestionEdit !== null ? 'Update Question' : 'Add Question' }</button>
                <button onClick={onDelete} className="question-dashboard-macros">Remove Question</button>
            </div>
                { modal && <PleaseAddTitleAlert closeModal={setModal}/>}
        </Fragment>
    )
};

export default QuestionEditor;