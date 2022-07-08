import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import quizPublicContext from './QuizPublicContext';
import quizPublicReducer from './QuizPublicReducer';
import axios from 'axios';
import {
    FILL_IN_QUIZ_EDIT_PUBLIC,
    SET_LOADING_PUBLIC,
    CURRENT_PUBLIC_Q_EDIT,
    CLEAR_CURRENT_PUBLIC_Q_EDIT,
    ADD_QUESTION_PUBLIC,
    DELETE_QUESTION_PUBLIC,
    UPDATE_QUESTION_PUBLIC,
    DELETE_QUIZ_PUBLIC,
    ADD_PUBLIC_QUIZ,
    UPDATE_PUBLIC_QUIZ,
    FILTER_PUBLIC_QUIZES,
    CLEAR_FILTER,
    SET_TOP_QUIZ,
    QUIZPUB_ERROR,
    GET_QUIZ_PUB,
    CLEAR_QUIZ_PUB,
    GET_FROM_PUBLIC_TO_CALC
} from '../types';


const QuizPublicState = props => {
    const initialState = {
        loadingPublic: false,
        publicQuizes: [            
        //     {
        //     id: '3',
        //     user: 'bunchOnumbers',
        //     userName: 'userX',
        //     quizName: 'Public Quiz 1',
        //     isPublished: 'Published',
        //     date: '2022-03-04T22:54:22.461+00:00',
        //     views: 1,
        //     quizQuestions:[
        //         {
        //             title: "whats my name?",
        //             Answer: "bongo",
        //             WrongAnswer1: "undefined",
        //             WrongAnswer2: "idk",
        //             WrongAnswer3: "something dumb probably"
        //         },
        //         {
        //             title: "what day is it",
        //             Answer: "could be anyday",
        //             WrongAnswer1: "tuesday",
        //             WrongAnswer2: "chewsday",
        //             WrongAnswer3: "donnerstag"
        //         }
        //     ]
        // },
        // {
        //     id: '4',
        //     user: 'bunchOnumbers',
        //     userName: 'userx',
        //     quizName: 'Public Quiz 2',
        //     isPublished: 'Published',
        //     date: '2022-04-04T22:54:22.461+00:00',
        //     views: 5,
        //     quizQuestions: [
        //         {
        //             title: "How are you today?",
        //             Answer: "Good",
        //             WrongAnswer1: "Not-a-so-good",
        //             WrongAnswer2: "red",
        //             WrongAnswer3: "sky"
        //         },
        //         {
        //             title: "whats 3 + 2?",
        //             Answer: "5",
        //             WrongAnswer1: "6",
        //             WrongAnswer2: "7",
        //             WrongAnswer3: "8"
        //         }
        //     ]
        // }
    ],
        quizEditPublic: {
            id: '',
            user: '',
            userName: '',
            quizName: '',
            isPublished: '',
            date: '',
            views: '',
            quizQuestions: [],
            postId: ''
        },
        error: null,
        currentQuestionEditPublic: null,
        filtered: null,
        allPublicQuizesToCalc: []
    };

    const [state, dispatch] = useReducer(quizPublicReducer, initialState);

    //GET_QUIZ_PUB
    const getQuizPub = async () => {
        setLoading();
        try {
            const res = await axios.get('/api/quizes');
            dispatch({ type: GET_QUIZ_PUB, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    // CLEAR_QUIZ_PUB
    const clearQuizPub = () => {
        dispatch({ type: CLEAR_QUIZ_PUB });
    };

    // FILL_IN_QUIZ_EDIT_PUBLIC
    const fillInQuizEditStatePublic = urlParam => {
        setLoading();
        dispatch({ type: FILL_IN_QUIZ_EDIT_PUBLIC, payload: urlParam });
    };
    
    // SET_LOADING_PUBLIC
    const setLoading = () => dispatch({ type: SET_LOADING_PUBLIC });

    // CLEAR_CURRENT_PUBLIC_Q_EDIT
    const clearCurrentQuestionEditPublic = () => dispatch({ type: CLEAR_CURRENT_PUBLIC_Q_EDIT });

    // CURRENT_PUBLIC_Q_EDIT
    const setCurrentQuestionEditPublic = questionName => {
        dispatch({ type: CURRENT_PUBLIC_Q_EDIT, payload: questionName });
    };

    // UPDATE_QUESTION_PUBLIC
    const updateQuestionPublic = (currentQ, questionToUpdate) => {
        setLoading();
        let payloadNew = state.quizEditPublic; 
        payloadNew.quizQuestions.forEach((question, index) => {
            if(question.title === currentQ) {
                payloadNew.quizQuestions[index] = questionToUpdate;
            };
        });
        dispatch({ type: UPDATE_QUESTION_PUBLIC, payload: payloadNew });
        clearCurrentQuestionEditPublic();
    };

    // DELETE_QUESTION_PUBLIC
    const deleteQuestionPublic = questionTitle => {
        setLoading();
        dispatch({ type: DELETE_QUESTION_PUBLIC, payload: questionTitle });
    };

    // ADD_QUESTION_PUBLIC
    const addQuestionPublic = newQuestion => {
        setLoading();
        dispatch({ type: ADD_QUESTION_PUBLIC, payload: newQuestion });
    };

    // ADD_PUBLIC_QUIZ
    const addQuizPublic = async newPublicQuiz => {
        setLoading();
        newPublicQuiz.postId = newPublicQuiz._id
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/quizes', newPublicQuiz, config);

            dispatch({ type: ADD_PUBLIC_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };

        try {
           await axios.post('/api/public', newPublicQuiz, config);
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    // DELETE_QUIZ_PUBLIC
    const deletePublicQuiz = async (currentQuizID, postId) => {
        try {
            await axios.delete(`/api/quizes/${currentQuizID}`);
            dispatch({ type:  DELETE_QUIZ_PUBLIC, payload: currentQuizID });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
        try {
            await axios.delete(`/api/public/${postId}`);
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    // UPDATE_PUBLIC_QUIZ
    const updatePublicQuiz = async quizToUpdate => {
        setLoading();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/quizes/${quizToUpdate._id}`, quizToUpdate, config);
            dispatch({ type: UPDATE_PUBLIC_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };

        try {
            await axios.put(`/api/public/${quizToUpdate.postId}`, quizToUpdate, config);
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    //FILTER_PUBLIC_QUIZES
    const filterPublicQuizes = input => {
        dispatch({ type: FILTER_PUBLIC_QUIZES, payload: input });
    };

    // CLEAR_FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    
    // SET_TOP_QUIZ
    const setTopQuizes = (quizInfo) => {
        dispatch({ type: SET_TOP_QUIZ, payload: quizInfo });
    };

    // GET_FROM_PUBLIC_TO_CALC
    const getAllPublicQuizesToCalc = async () => {
        try {
            const res = await axios.get('/api/public');

            dispatch({ type: GET_FROM_PUBLIC_TO_CALC, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    return (
        <quizPublicContext.Provider
            value={{
                loadingPublic: state.loading,
                publicQuizes: state.publicQuizes,
                quizEditPublic: state.quizEditPublic,
                quizNamesOrganizedByViews: state.quizNamesOrganizedByViews,
                currentQuestionEditPublic: state.currentQuestionEditPublic,
                filtered: state.filtered,
                error: state.error,
                allPublicQuizesToCalc: state.allPublicQuizesToCalc,
                getAllPublicQuizesToCalc,
                getQuizPub,
                clearQuizPub,
                setLoading,
                fillInQuizEditStatePublic,
                clearCurrentQuestionEditPublic,
                setCurrentQuestionEditPublic,
                updateQuestionPublic,
                deleteQuestionPublic,
                addQuestionPublic,
                deletePublicQuiz,
                addQuizPublic,
                updatePublicQuiz,
                filterPublicQuizes,
                clearFilter,
                setTopQuizes
            }}>
        { props.children }
        </quizPublicContext.Provider>
    )
};

export default QuizPublicState;