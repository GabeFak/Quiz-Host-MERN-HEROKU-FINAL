import React from 'react';
import useTopQuizCalc from '../hooks/useTopQuizCalc';

const YourTopQuizModal = ({ closeModal }) => {
    const [calc] = useTopQuizCalc();
    if(calc === undefined || calc.length === 0 || calc === null) {
        return ''
    } else {
        return (
            <div className='modal-background'>
                <div className='modal-border'>
                    <div className='modal-container'>
                        <div className='modal-title'>
                            <h3>Most Viewed Quiz</h3>
                        </div>
                        <div className='modal-selection-option'>
                            <div className='stats-views-2'><b>Quiz Name:</b> {calc[1]}</div>
                            <div className='stats-views-view-number'><b>Views:</b> {calc[0]}</div>
                            <button className="modal-button-grey" onClick={() => closeModal(false)} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default YourTopQuizModal;