import React, { useReducer } from 'react';
import allPublicQuizesReducer from './AllPublicQuizesReducer';
import allPublicQuizesContext from './AllPublicQuizesContext';
import axios from 'axios';
import {
    FILTER_ALL_PUBLIC_QUIZES,
    CLEAR_FILTER_ALL_PUBLIC_QUIZES,
    FILL_IN_CURRENT_ACTIVE_QUIZ,
    // ADD_TO_VIEWS
    // ADD_PUBLIC_QUIZ_TO_PUBLIC_DATABASE,
    // UPDATE_PUBLIC_QUIZ_PUBLIC_DATABASE,
    // DELETE_QUIZ_FROM_DATABASE,
    GET_FROM_PUBLIC,
    QUIZPUB_ERROR,
    SET_LOADING_PUBLIC_ACCESS
} from '../types';

const AllPublicQuizesState = props => {
    const initialState = {
        publicQuizes: [            
        //     {
        //     id: '1',
        //     user: 'bunchOnumbers',
        //     userName: 'userA',
        //     quizName: 'How Well do you know DOGS',
        //     isPublished: 'Published',
        //     date: '2022-03-04T22:54:22.461+00:00',
        //     views: 9,
        //     quizQuestions:[
        //         {
        //             title: "How Many dog breeds are there?",
        //             Answer: "12,256",
        //             WrongAnswer1: "No one knows",
        //             WrongAnswer2: "5,350",
        //             WrongAnswer3: "80,245"
        //         },
        //         {
        //             title: "Do dogs think humans are dogs?",
        //             Answer: "No, they know we are not dogs",
        //             WrongAnswer1: "They think we are big weird looking dogs",
        //             WrongAnswer2: "They think we are exactly like them",
        //             WrongAnswer3: "Depends on the dog"
        //         }
        //     ]
        // },
        // {
        //     id: '2',
        //     user: 'bunchOnumbers',
        //     userName: 'userB',
        //     quizName: 'Dumb Quiz',
        //     isPublished: 'Published',
        //     date: '2022-04-04T22:54:22.461+00:00',
        //     views: 6,
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
        // },
        // {
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
        error: null,
        loadingPublicAccessQuizes: false,
        filtered: null,
        currentActiveQuiz: {
            id: '',
            user: '',
            userName: '',
            quizName: '',
            isPublished: '',
            date: '',
            views: '',
            quizQuestions: []
        }
    };

    const [state, dispatch] = useReducer(allPublicQuizesReducer, initialState);

    // FILTER_ALL_PUBLIC_QUIZES filter public quizes search
    const filterALLPublicQuizes = input => {
        dispatch({ type: FILTER_ALL_PUBLIC_QUIZES, payload: input });
    };

    // CLEAR_FILTER_ALL_PUBLIC_QUIZES
    const clearAllPublicQuizesFilter = () => {
        dispatch({ type: CLEAR_FILTER_ALL_PUBLIC_QUIZES });
    };

    // FILL_IN_CURRENT_ACTIVE_QUIZ
    const fillIncurrentActiveQuiz = quizName => {
        dispatch({ type: FILL_IN_CURRENT_ACTIVE_QUIZ, payload: quizName});
    };

    // GET_FROM_PUBLIC
    const getFromPublic = async () => {
        setLoadingPublic();
        try {
            const res = await axios.get('/api/public');

            dispatch({ type: GET_FROM_PUBLIC, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    // SET_LOADING_PUBLIC_ACCESS
    const setLoadingPublic = () => {
        dispatch({ type: SET_LOADING_PUBLIC_ACCESS });
    };

    // PATCH REQUEST FOR PUBLIC VIEW
    const patchViews = async postId => {
        setLoadingPublic();
        try {
            await axios.patch(`/api/public/${postId}`);
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    return (
        <allPublicQuizesContext.Provider
            value={{
                publicQuizes: state.publicQuizes,
                filtered: state.filtered,
                currentActiveQuiz: state.currentActiveQuiz,
                loadingPublicAccessQuizes: state.loadingPublicAccessQuizes,
                error: state.error,
                patchViews,
                getFromPublic,
                filterALLPublicQuizes,
                clearAllPublicQuizesFilter,
                fillIncurrentActiveQuiz
            }}>
        { props.children }
        </allPublicQuizesContext.Provider>
    )
};

export default AllPublicQuizesState;