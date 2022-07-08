import React from 'react';
import { Fragment, useEffect, useContext, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AlertContext from '../../context/Alert/AlertContext';
import AuthContext from '../../context/Auth/AuthContext';
import Alerts from '../layout/Alerts';

const Login = () => {
    const nav = useNavigate();
    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedOff } = quizWipContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated, logout } = authContext;

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password} = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(email === '' || password === '') {
            setAlert('Please fill in all feilds', 'danger');
        }else{
            login({
                email,
                password
            });
        };
    };

    useEffect(() => { 
        setLoggedOff();
        if(isAuthenticated) {
            nav('/dashboard');
        }else{
            logout();
        };

        if(error === 'Invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        };
        //eslint-disable-next-line
    }, [error, isAuthenticated]);

    return ( 
        <Fragment>
            <div className="login-form-log">
                <form className='log-form' onSubmit={onSubmit}>
                    <h4>Login</h4>
                    <Alerts />
                    <div className='row'>
                        <div className='input-field'>
                            <input type='text' name='email' value={email} onChange={onChange} placeholder="Email" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='password' value={password} onChange={onChange} placeholder="Password" />
                        </div>
                    </div>
                    <div className="row">
                        <input className="submit-btn login-button" value="Login" type="submit" />
                    </div>
                </form>
            </div>
            <div className="link-to-reg-login">
                <div className='reg-from-login-link'>
                    <h4>Need an Account?</h4>
                    <div className="row">
                        <div className="submit-btn"><Link to="/Register">Register Today</Link></div>
                    </div>
                </div>
            </div>
            <div className='height-spacer-2'></div>
        </Fragment>
    )
};

export default Login;      