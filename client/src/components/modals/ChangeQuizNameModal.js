import React from 'react';
import { useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const ChangeQuizNameModal = ({closeModal}) => {
    const isQuizPublished = useParams();

    const quizPublicContext = useContext(QuizPublicContext);
    const {quizEditPublic} = quizPublicContext;

    const quizWipContext = useContext(QuizWipContext);
    const {quizEdit} = quizWipContext;

    const [newQuizName, setNewQuizName] = useState({
        newQName: ''
    });

    const onChange = e => setNewQuizName({...newQuizName, [e.target.name]: e.target.value});

    const submitQName = e => {
        e.preventDefault();
        if(newQuizName.newQName !== '') {
            if(isQuizPublished.isPub === "Unpublished") {
                quizEdit.quizName = newQuizName.newQName;
                closeModal(false);
            }else if(isQuizPublished.isPub === "Published") {
                quizEditPublic.quizName = newQuizName.newQName;
                closeModal(false);
            };
        };
    };

    return (
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h1>Reset Quiz Name</h1>
                    </div>
                    <div className='modal-selection-option'>
                        <input onChange={onChange} type="text" placeholder="New Quiz Name" value={newQuizName.newQName} name="newQName"/>
                        <button onClick={submitQName} className="modal-button">Create New Quiz</button>
                        <button className="modal-button-grey" onClick={() => {closeModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChangeQuizNameModal;
