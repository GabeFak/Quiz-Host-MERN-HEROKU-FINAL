import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../Utils/setAuthToken';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
    SET_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // SET_LOADING
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    //USER_LOADED AUTH_ERROR
    const loadUser = async () => {
        setLoading();
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        };
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            });
        };
    };

    //REGISTER_SUCCESS REGISTER_FAIL
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        };
    };

    //LOGIN_SUCCESS LOGIN_FAIL
    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        };
    };

    //LOGOUT
    const logout = () => dispatch({ type: LOGOUT });

    //CLEAR_ERRORS 
    const clearErrors= () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;