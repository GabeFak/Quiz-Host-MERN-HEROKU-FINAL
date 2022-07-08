import {
    FILL_IN_QUIZ_EDIT,
    SET_LOADING,
    CURRENT_QUESTION_EDIT,
    CLEAR_CURRENT_QUESTION_EDIT,
    ADD_QUESTION,
    DELETE_QUESTION,
    UPDATE_QUESTION,
    SET_LOGGED_IN,
    SET_LOGGED_OFF,
    DELETE_QUIZ_WIP,
    ADD_QUIZ,
    UPDATE_PRIVATE_QUIZ,
    FILL_IN_NEW_QUIZ,
    CATCH_FILL_IN_NEW_QUIZ_FINISH,
    CATCH_FILL_IN_NEW_QUIZ_FINISH_FALSE,
    QUIZWIP_ERROR,
    GET_QUIZ_WIPS,
    CLEAR_QUIZ_WIPS,
    ALL_QUIZ_NAMES,
    CLEAR_QUIZ_EDIT
} from '../types';

const Reducer = (state, action) => {
    switch(action.type) {

        case CLEAR_QUIZ_EDIT:
            return {
                ...state,
                quizEdit: null
            };

        case GET_QUIZ_WIPS:
            return {
                ...state,
                quizes: action.payload,
                loading: false
            };

        case CLEAR_QUIZ_WIPS:
            return {
                ...state,
                loading: false,
                error: null,
                quizes: [],
                quizEdit: null,
                newQuizFill: null,
                currentQuestionEdit: null,
                loggedIn: false,
                FillInNewQuizFinish: false
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            };

        case SET_LOGGED_OFF:
            return {
                ...state,
                loggedIn: false
            };

        case FILL_IN_NEW_QUIZ:
            let orderArray = [
                [ 'user' , action.payload.user ],
                [ 'userName' , action.payload.userName ],
                [ 'quizName' , action.payload.quizName ],
                [ 'isPublished' , action.payload.isPublished ],
                [ 'date' , action.payload.date ],
                [ 'views', action.payload.views ],
                [ 'quizQuestions' ,action.payload.quizQuestions ]];
            const arToOb = (array) => {
                let obj={};
                array.forEach((pair) => {
                    let key = pair[0];
                    let value = pair[1];
                    obj[key] = value;
                });
                return obj;
            };
            const newQuiz = arToOb(orderArray);
            return {
                ...state,
                quizEdit: newQuiz,
                loading: false
            };

        case CATCH_FILL_IN_NEW_QUIZ_FINISH: 
            return {
                ...state,
                FillInNewQuizFinish: true
            };

        case CATCH_FILL_IN_NEW_QUIZ_FINISH_FALSE:
            return {
                ...state,
                FillInNewQuizFinish: false
            };

        case ADD_QUESTION:
            let newQ = state.quizEdit;
            newQ.quizQuestions.push(action.payload);
            return {
                ...state,
                quizEdit: newQ,
                loading: false
            };

        case UPDATE_QUESTION:
            return {
                ...state,
                quizEdit: action.payload,
                loading: false
            };

        case DELETE_QUESTION:
            let qToDelete = state.quizEdit;
            let toDelete = qToDelete.quizQuestions.filter(question => question.title !== action.payload);
            qToDelete.quizQuestions = toDelete;
            return {
                ...state,
                quizEdit: qToDelete,
                currentQuestionEdit: null,
                loading: false
            };

        case FILL_IN_QUIZ_EDIT:
            let newEditState = Object.assign( {}, state.quizes.filter(quiz => quiz.quizName === action.payload));
            let editState = newEditState[Object.keys(newEditState)[0]];
            return {
                ...state,
                quizEdit: editState,
                loading: false
            };

        case CURRENT_QUESTION_EDIT:
            return {
                ...state,
                currentQuestionEdit: action.payload
            };

        case CLEAR_CURRENT_QUESTION_EDIT:
            return {
                ...state,
                currentQuestionEdit: null
            };

        case ADD_QUIZ:
            return {
                ...state,
                quizes: [...state.quizes, action.payload],
                loading: false
            };

        case DELETE_QUIZ_WIP:
            let quizListMinusDeletedQuiz = state.quizes.filter(quiz => quiz._id !== action.payload);
            return {
                ...state,
                quizes: quizListMinusDeletedQuiz
            };

        case UPDATE_PRIVATE_QUIZ:
            let privateQuizToUpdate = state.quizes.filter(quiz => quiz._id !== action.payload._id);
            privateQuizToUpdate.push(action.payload);
            return {
                ...state,
                quizes: privateQuizToUpdate,
                loading: false
            };

        case QUIZWIP_ERROR: 
            return {
              ...state,
              error: action.payload  
            };
            
        case ALL_QUIZ_NAMES: 
        return {
            ...state,
            allQuizNamesPubAndWip: action.payload
        };
        
        default:
            return state;
    };
};

export default Reducer;