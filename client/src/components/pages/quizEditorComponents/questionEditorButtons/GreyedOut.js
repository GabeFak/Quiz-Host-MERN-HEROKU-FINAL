import React from 'react';

const GreyedOut = ({ saveQuiz, quizEdit, isQuizPublished}) => {
    return (
        <>
            { isQuizPublished.isPub === "Unpublished" ? 
                <button className="quiz-editor-macros first-macro-button" onClick={saveQuiz}>
                    {quizEdit !== undefined ? 
                        <>
                            {quizEdit._id ? `Update Quiz` : `Save Quiz`}
                        </>
                    :
                        ''
                    }
                </button>
            :
                <button className="quiz-editor-macros first-macro-button grey-out">Update Quiz</button>
            }
            { isQuizPublished.isPub === "Unpublished" ? 
                <button className="quiz-editor-macros middle-macro-button grey-out">Publish Quiz</button> 
            :
                <button className="quiz-editor-macros middle-macro-button grey-out">Quiz Stats</button> 
            }
            <button className="quiz-editor-macros middle-macro-button grey-out" >Preview Quiz</button>
            <button className="quiz-editor-macros last-macro-button grey-out" >Delete Quiz</button>
        </>
    )
};

export default GreyedOut;