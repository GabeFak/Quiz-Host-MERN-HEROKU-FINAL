import React from 'react';

const PleaseAddTitleAlert = ({ closeModal }) => {
    return (
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h1>Please add a Question and an Answer. Questions cannot have the same name.</h1>
                    </div>
                    <div className='modal-selection-option'>
                        <button className="modal-button-grey" onClick={() => {closeModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PleaseAddTitleAlert;
