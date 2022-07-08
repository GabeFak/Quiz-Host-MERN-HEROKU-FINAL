import React from 'react';
import useGetQuizStats from '../hooks/useGetQuizStats';

const SeeStatsModalPublicQuizEdit = ({quizName, resetModal}) => {
    const [stats] = useGetQuizStats(quizName)
    if(stats === undefined || stats.length === 0 || stats === null) {
        return '';
    } else {
        return (
            <div className='modal-background'>
                <div className='modal-border'>
                    <div className='modal-container'>
                        <div className='modal-title'>
                            <h3>{stats.quizName}</h3>
                        </div>
                        <div className='modal-selection-option'>
                            <div className='stats-views'>{stats.views} Views</div>
                            <button className="modal-button-grey" onClick={() => resetModal(false)} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default SeeStatsModalPublicQuizEdit;