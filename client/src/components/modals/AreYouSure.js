import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const AreYouSure = ({ quizID, quizToDeletePublic, setAreYouSure, isPublished, postId}) => {
    const quizPublicContext = useContext(QuizPublicContext);
    const { deletePublicQuiz } = quizPublicContext;

    const quizWipContext = useContext(QuizWipContext);
    const { deleteWipQuiz } = quizWipContext;

    const nav = useNavigate();

    const deleteAction = () => {
        if(isPublished === 'Unpublished') {
            deleteWipQuiz(quizID); //Checks if user is deleting an unpublished quiz, deletes from different state
        }else if(isPublished === 'Published' || isPublished === undefined) {
            deletePublicQuiz(quizToDeletePublic, postId);
        };

        if(isPublished === 'Unpublished' || isPublished === 'Published') {
            nav('../../Dashboard');
        };//redirects to dashboard if user is in either the public editor or the private editor

        setAreYouSure(false); //closes modal   
    }; 

  return (
    <div className='modal-background'>
        <div className='modal-border'>
            <div className='modal-container'>
                <div className='modal-title'>
                    <h3>Are You Sure You Want To Delete This Quiz?</h3>
                </div>
                <div className='modal-selection-option'>
                    <button onClick={deleteAction} className='modal-button'>Yes</button>
                    <button className="modal-button-grey" onClick={() => setAreYouSure(false)} >Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
};

export default AreYouSure;
