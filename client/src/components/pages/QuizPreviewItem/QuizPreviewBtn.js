import React from 'react';
import { useState } from 'react';

const QuizPreviewBtn = ({responce, answer, setSelected, selectedAnAnswer}) => {
    const [correctState, setCorrectState] = useState({
        correctOrNotCorrect: ''
    });
    
    const selectAnswer = () => {
        if(!selectedAnAnswer) {
            if(responce === answer) {
                setCorrectState({correctOrNotCorrect: 'correct'});
                setSelected({
                    isCorrect: true,
                    selectedAnAnswer: true,
                });
            } else {
                setCorrectState({correctOrNotCorrect: 'wrong'});
                setSelected({
                    isCorrect: false,
                    selectedAnAnswer: true,
                });
            };
        };
    };
    return (<button className={`${correctState.correctOrNotCorrect} btn`} onClick={selectAnswer}>{responce}</button>)
};

export default QuizPreviewBtn;