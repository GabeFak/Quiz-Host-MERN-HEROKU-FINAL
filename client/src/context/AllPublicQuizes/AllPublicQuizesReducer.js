import {
FILTER_ALL_PUBLIC_QUIZES,
CLEAR_FILTER_ALL_PUBLIC_QUIZES,
FILL_IN_CURRENT_ACTIVE_QUIZ,
GET_FROM_PUBLIC,
SET_LOADING_PUBLIC_ACCESS,
QUIZPUB_ERROR
} from '../types';

const Reducer = (state, action) => {
    switch(action.type) {
    case FILTER_ALL_PUBLIC_QUIZES:
        let filtered = state.publicQuizes.filter(quiz => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return quiz.quizName.match(regex) || quiz.userName.match(regex);
        });

        let newFiltered = filtered.splice(0, 6); //Limit of 6 quizes to be displayed 

        return {
            ...state,
            filtered: newFiltered
        };

    case CLEAR_FILTER_ALL_PUBLIC_QUIZES:
        return {
            ...state,
            filtered: null
        };

    case FILL_IN_CURRENT_ACTIVE_QUIZ:
        let newCurrentActive = Object.assign( {}, state.publicQuizes.filter(quiz => quiz.quizName === action.payload));
        let setNewCurrentActive = newCurrentActive[Object.keys(newCurrentActive)[0]];

        return {
            ...state,
            currentActiveQuiz: setNewCurrentActive
        };

    case GET_FROM_PUBLIC: 
        let newestQuizesFirst = action.payload.reverse();
        return {
            ...state,
            publicQuizes: newestQuizesFirst,
            loadingPublicAccessQuizes: false
        };

    case SET_LOADING_PUBLIC_ACCESS:
        return {
            ...state,
            loadingPublicAccessQuizes: true
        };

    case QUIZPUB_ERROR:
        return {
            ...state,
            error: action.payload,
            loadingPublicAccessQuizes: false  
        };

        default:
            return state;
    };

};

export default  Reducer;