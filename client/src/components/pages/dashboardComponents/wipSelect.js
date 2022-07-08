import React from 'react';
import QuizWipEdit from "../../QuizWips/QuizWipEdit";

const wipSelect = () => {
    return (
        <div className="works-in-progress dashboard-grid-container-item">
            <h1>Works In Progress</h1>
            <div className="wip-display-container">
                <QuizWipEdit />
            </div>
        </div>
    )
};

export default wipSelect;