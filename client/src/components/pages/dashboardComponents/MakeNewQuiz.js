import React from 'react';

const MakeNewQuiz = ({openModal}) => {
    return (
        <div className="make-new-quiz dashboard-grid-container-item">
            <h1 onClick={() => openModal(true)}>Make New Quiz</h1>
        </div>
    )
};

export default MakeNewQuiz;
