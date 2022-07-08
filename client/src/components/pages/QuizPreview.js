import React from 'react';
import { useEffect, useContext, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AuthContext from '../../context/Auth/AuthContext';
import randomResponses from '../json/randomResponses.json';

let currentIndex = 0;
let correctCounter = 0;

const QuizPreview = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const nav = useNavigate();

    const quizPublicContext = useContext(QuizPublicContext);
    const { quizEditPublic } = quizPublicContext;

    const quizWipContext = useContext(QuizWipContext);
    const { quizEdit } = quizWipContext;

    //state for quiestions, current index of question, and quiz name
    const [previewQuizQuestions, setPreviewQuizQuestions] = useState({
        quizName: null,
        quizQuestions: null
    });

    const { quizQuestions, quizName } = previewQuizQuestions;

    const [selected, setSelected] = useState({
        isCorrect:'',
        selectedAnAnswer:'',
        endOfQuiz: ''
    });

    const { selectedAnAnswer, endOfQuiz } = selected;

    //state for current question
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        answer: '',
        responces: ''
    });

    const { responces, question, answer } = currentQuestion;

    const [bntState, changeBtnState] = useState({
        btn1: 'btn',
        btn2: 'btn',
        btn3: 'btn',
        btn4: 'btn'
    });

    const { btn1, btn2, btn3, btn4 } = bntState;

    const [startQuizControl, setStartQuizControl] = useState(true);

    const [showQuestion, setShowQuestion] = useState(false);

    const quizParam = useParams();

    useEffect(() => {
        loadUser();

        if(quizParam.isPub === 'Unpublished') { 
            if(quizEdit.id === '') {
                nav('/dashboard')
            };
            setPreviewQuizQuestions({...previewQuizQuestions, quizName: quizEdit.quizName, quizQuestions: quizEdit.quizQuestions});
        } else if(quizParam.isPub === 'Published') {
            if(quizEditPublic.id === '') {
                nav('/dashboard')
            };
            setPreviewQuizQuestions({...previewQuizQuestions, quizName: quizEditPublic.quizName, quizQuestions: quizEditPublic.quizQuestions});
        };
        // eslint-disable-next-line
    }, []);
    
    const start = () => {
        currentIndex = 0;
        if(startQuizControl) {
            setStartQuizControl(false);
            setShowQuestion(true);
            setNextQ();
        };
    };

    const incCorrectCounter = () => {
        correctCounter++
    };

    const displayQuestion = (question) => {
        let responces = []
            for(let i = 0; i <= 4; i++) {
                if(question[Object.keys(question)[i]] === '') {
                    let randNames = Object.entries(randomResponses);
                    let randomSelection = Math.floor(Math.random() * (Object.keys(randomResponses).length - 1 + 1) + 1);
                    let bogusAnswer = randNames[randomSelection - 1][1];
                    responces[i] = bogusAnswer;
                } else {
                responces[i] = question[Object.keys(question)[i]];
                };
            };
        responces.splice(0,1);
        const shuffledResponces = responces.sort(() => Math.random() - .5);
        setCurrentQuestion({...currentQuestion, question: question.title, answer: question.Answer, responces: shuffledResponces});
    };

    const setNextQ = () => {
        displayQuestion(previewQuizQuestions.quizQuestions[currentIndex]);
    };

    const QAdvance = () => {
        currentIndex = currentIndex + 1;
            if(currentIndex === quizQuestions.length) {
                setSelected({...selected, endOfQuiz: true});
            } else {
                setSelected({
                    ...selected,
                    isCorrect:'',
                    selectedAnAnswer:''
                });
            changeBtnState({
                btn1: 'btn',
                btn2: 'btn',
                btn3: 'btn',
                btn4: 'btn'
            });
            setNextQ();
        };
    };

    const reStart = () => {
        currentIndex = 0;
        correctCounter = 0;
        setSelected({
            isCorrect:'',
            selectedAnAnswer:'',
            endOfQuiz: ''
        });
        changeBtnState({
            btn1: 'btn',
            btn2: 'btn',
            btn3: 'btn',
            btn4: 'btn'
        });
        setNextQ();
    };

    const selectAnswer = (e) => {
        let name = e.target.name;
        if(e.target.value === answer && !selectedAnAnswer) {
            changeBtnState({...bntState, [name]: 'correct btn'});
            incCorrectCounter();
            setSelected({
                isCorrect: true,
                selectedAnAnswer: true
            });
        }else if(!selectedAnAnswer) {
            changeBtnState({...bntState, [name]: 'wrong btn'});
            setSelected({
                isCorrect: false,
                selectedAnAnswer: true
            });
        };
    };

    const endQuiz = () => {
        correctCounter = 0;
        nav('/dashboard');
    };

    return (
        <div className='quizPreviewContainer'>
            <div className="quizPreviewContainerInner">
            <div className={startQuizControl ? 'inQuiz-question-display' : 'hide'}>{quizName}</div>
            <div id="question-container"className={!showQuestion || endOfQuiz ? "hide" : ''}>
                <div id="question" className='inQuiz-question-display'>{question}</div>
                <div id="answer-buttons" className="btn-grid">
                    <button className={btn1} name='btn1' value={responces[0]} onClick={selectAnswer}>{responces[0]}</button>
                    <button className={btn2} name='btn2' value={responces[1]} onClick={selectAnswer}>{responces[1]}</button>
                    <button className={btn3} name='btn3' value={responces[2]} onClick={selectAnswer}>{responces[2]}</button>
                    <button className={btn4} name='btn4' value={responces[3]} onClick={selectAnswer}>{responces[3]}</button>   
                </div>
            </div>
            <div className="controls">
                <button id="start-btn" className={startQuizControl ? "start-btn btn" : "hide"} onClick={start} >Start</button>
                    { endOfQuiz ? 
                            <>
                                <div className='score'>{`You got ${correctCounter} out of ${quizQuestions.length}!`}</div>
                                <button id="next-btn" className={!selectedAnAnswer ? "next-btn btn hide" : "next-btn btn"} onClick={endQuiz}>End Quiz</button>
                                <button id="next-btn" className={!selectedAnAnswer ? "next-btn btn hide" : "next-btn btn"} onClick={reStart}>Restart</button>
                            </>
                        : 
                            <button id="next-btn" className={!selectedAnAnswer ? "next-btn btn hide" : "next-q-btn next-btn btn"} onClick={QAdvance}>Next</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default QuizPreview;
