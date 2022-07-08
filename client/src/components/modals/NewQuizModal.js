import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AuthContext from '../../context/Auth/AuthContext';
import useIsQuizNameTaken from '../hooks/useIsQuizNameTaken';
import AlertContext from '../../context/Alert/AlertContext';
import Alerts from '../layout/Alerts';


const NewQuizModal = ({ closeModal }) => {

    const [] = useIsQuizNameTaken();

    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { _id, name } = user;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;


    const quizWipContext = useContext(QuizWipContext);
    const { fillInNewQuiz, allQuizNamesPubAndWip } = quizWipContext;

    const nav = useNavigate();

    const [newQInfo, setNewQInfo] = useState({
        user: _id,
        userName: name,
        quizName: '',
        isPublished: 'Unpublished',
        date: 'date',
        views: 0,
        quizQuestions: []
    });
    
    const onChange = e => setNewQInfo({...newQInfo, [e.target.name]: e.target.value});

    
    const sub = (found) => {
        if(newQInfo.quizName !== '' && found === undefined) {
            fillInNewQuiz(newQInfo);
            nav(`/QuizEditor/${newQInfo.quizName}/${newQInfo.isPublished}`);
            closeModal(false); 
        }else if(newQInfo.quizName === '') {
            setAlert('Please give it a name.', 'danger');
        } else if( found !== undefined) {
            setAlert('Quiz name already exists!', 'danger');
        };
    };
    
    const submitQName = e => {
        e.preventDefault();
        let found = allQuizNamesPubAndWip.find(quiz => quiz === newQInfo.quizName);
        sub(found);
    };

    return ( 
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h1>New Quiz Name</h1>
                    </div>
                    <Alerts />
                    <div className='modal-selection-option'>
                        <input className="new-quiz-modal-input" onChange={onChange} type="text" placeholder="Quiz Name" value={newQInfo.quizName} name="quizName"/>
                        <button onClick={submitQName} className="modal-button">Create New Quiz</button>
                        <button className="modal-button-grey" onClick={() => {closeModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewQuizModal;
