import React from 'react';

const MostViewedQuiz = ({ openModal }) => {
    const onClick = () => {
        openModal(true);  
    }; 
    return (
        <div className="your-top-quiz dashboard-grid-container-item" onClick={onClick}>
            <h1>Your Top Quiz</h1>
        </div>
    )
};

export default MostViewedQuiz;