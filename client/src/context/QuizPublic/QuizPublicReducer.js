import {
    FILL_IN_QUIZ_EDIT_PUBLIC,
    SET_LOADING_PUBLIC,
    CLEAR_CURRENT_PUBLIC_Q_EDIT,
    CURRENT_PUBLIC_Q_EDIT,
    UPDATE_QUESTION_PUBLIC,
    DELETE_QUESTION_PUBLIC,
    ADD_QUESTION_PUBLIC,
    DELETE_QUIZ_PUBLIC,
    ADD_PUBLIC_QUIZ,
    UPDATE_PUBLIC_QUIZ,
    FILTER_PUBLIC_QUIZES,
    CLEAR_FILTER,
    QUIZPUB_ERROR,
    GET_QUIZ_PUB,
    CLEAR_QUIZ_PUB,
    GET_FROM_PUBLIC_TO_CALC
} from '../types';

const Reducer = (state, action) => {
    switch(action.type) {

        case GET_QUIZ_PUB:
            let displayQuizesFromNewestToOldest = action.payload.reverse();
            return {
                ...state,
                publicQuizes: displayQuizesFromNewestToOldest,
                loadingPublic: false
            };

        case CLEAR_QUIZ_PUB:
            return {
                ...state,
                loadingPublic: false,
                error: null,
                publicQuizes: [],
                quizEditPublic: null,
                quizNamesOrganizedByViews: null,
                currentQuestionEditPublic: null,
                filtered: null
            };

        case QUIZPUB_ERROR: 
            return {
                ...state,
                error: action.payload  
            }

        case FILL_IN_QUIZ_EDIT_PUBLIC:
            let newEditState = Object.assign( {}, state.publicQuizes.filter(quiz => quiz.quizName === action.payload));
            let editState = newEditState[Object.keys(newEditState)[0]];
            return {
                ...state,
                quizEditPublic: editState,
                loadingPublic: false
            };

        case SET_LOADING_PUBLIC:
            return {
                ...state,
                loadingPublic: true
            };

        case CLEAR_CURRENT_PUBLIC_Q_EDIT:
            return {
                ...state,
                currentQuestionEditPublic: null,
                loadingPublic: false
            };

        case CURRENT_PUBLIC_Q_EDIT:
            return {
                ...state,
                currentQuestionEditPublic: action.payload
            };

        case UPDATE_QUESTION_PUBLIC:
            return {
                ...state,
                quizEditPublic: action.payload,
                loadingPublic: false
            };

        case DELETE_QUESTION_PUBLIC:
            let qToDelete = state.quizEditPublic;
            let toDelete = qToDelete.quizQuestions.filter(question => question.title !== action.payload);
            qToDelete.quizQuestions = toDelete;
            return {
                ...state,
                quizEditPublic: qToDelete,
                currentQuestionEditPublic: null,
                loadingPublic: false
            };

        case ADD_QUESTION_PUBLIC:
            let newQ = state.quizEditPublic;
            newQ.quizQuestions.push(action.payload);
            return {
                ...state,
                quizEditPublic: newQ,
                loadingPublic: false
            };

        case ADD_PUBLIC_QUIZ:
            return {
                ...state,
                publicQuizes: [action.payload, ...state.publicQuizes],
                loadingPublic: false
            };

        case DELETE_QUIZ_PUBLIC:
            let quizListMinusDeletedQuiz = state.publicQuizes.filter(quiz => quiz._id !== action.payload);
            return {
                ...state,
                publicQuizes: quizListMinusDeletedQuiz 
            };

        case UPDATE_PUBLIC_QUIZ:
            let publicQuizToUpdate = state.publicQuizes.filter(quiz => quiz._id !== action.payload._id);
            publicQuizToUpdate.push(action.payload);
            return {
                ...state,
                publicQuizes: publicQuizToUpdate,
                loadingPublic: false
            };

        case FILTER_PUBLIC_QUIZES:
            return {
                ...state,
                filtered: state.publicQuizes.filter(quiz => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return quiz.quizName.match(regex) || quiz.userName.match(regex);
                })
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        case GET_FROM_PUBLIC_TO_CALC:
            return {
                ...state,
                allPublicQuizesToCalc: action.payload
            };
        default:
            return state;
    };
};

export default Reducer;