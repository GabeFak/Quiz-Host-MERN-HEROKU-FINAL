import React from 'react';

const ActiveBtns = ({ saveQuiz, quizEdit, isQuizPublished, setAreYouSureState, publish, seeStats, linkToPreview }) => {
    return (
        <>
            { isQuizPublished.isPub === "Unpublished" ? 
                <>
                    <button className="quiz-editor-macros first-macro-button" onClick={saveQuiz}>
                        {quizEdit !== undefined ? 
                            <>
                                {quizEdit._id ? `Update Quiz` : `Save Quiz`}
                            </>
                        :
                            ''
                        }
                    </button>
                </>
            :
                <button className="quiz-editor-macros first-macro-button" onClick={saveQuiz}>
                    Update Quiz
                </button>
            }
            { isQuizPublished.isPub === "Unpublished" && quizEdit !== undefined && !quizEdit._id ?
                <>
                    <button className="quiz-editor-macros middle-macro-button grey-out" >Publish Quiz</button>
                    <button className="quiz-editor-macros middle-macro-button grey-out" >Preview Quiz</button>
                    <button className="quiz-editor-macros last-macro-button grey-out" >Delete Quiz</button>
                </>
            :
                <>
                    { isQuizPublished.isPub === "Unpublished" ? 
                        <button className="quiz-editor-macros middle-macro-button" onClick={publish}>Publish Quiz</button> 
                    :
                        <button className="quiz-editor-macros middle-macro-button" onClick={seeStats}>Quiz Stats</button> 
                    }
                    <button className="quiz-editor-macros middle-macro-button" onClick={linkToPreview}>Preview Quiz</button>
                    <button className="quiz-editor-macros last-macro-button" onClick={setAreYouSureState}>Delete Quiz</button>
                </>
            }
        </>
    )
};

export default ActiveBtns;