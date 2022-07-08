import React from 'react';
import EditPublicModalItem from './EditPublicModalItem';

const EditPublicModal = ({ closeModal, publicQuizes, modalState, setAreYouSure, quizToDel, setSeeStats, setSelectedQuizStats}) => {
    return (
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h1>{modalState.state}</h1>
                    </div>
                    <div className='modal-selection-option'>
                        {publicQuizes.map(PQuiz => (
                        <EditPublicModalItem key={PQuiz._id} setAreYouSure={setAreYouSure} modalState={modalState} closeModal={closeModal} quizToDel={quizToDel} publicQuizToList={PQuiz} setSelectedQuizStats={setSelectedQuizStats} setSeeStats={setSeeStats}/>
                        ))}
                        <button className="modal-button-grey" onClick={() => {closeModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditPublicModal;