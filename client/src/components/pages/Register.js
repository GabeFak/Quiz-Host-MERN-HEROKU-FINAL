import React from 'react';
import { Fragment, useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AlertContext from '../../context/Alert/AlertContext';
import AuthContext from '../../context/Auth/AuthContext';
import Alerts from '../layout/Alerts';

const Register = () => {
    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedOff } = quizWipContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated, logout} = authContext;

    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        };
    };

    const nav = useNavigate();
    useEffect(() => { 
        setLoggedOff();
        if(isAuthenticated) {
            nav('/dashboard');
        }else{
            logout();
        };
        if(error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        };
        if(error === 'User name is taken') {
            setAlert(error, 'danger');
            clearErrors();
        };
            //eslint-disable-next-line
    }, [error, isAuthenticated]);

    return (
        <Fragment>
            <div className="register-form-reg">
                <form className='reg-form' onSubmit={onSubmit}>
                    <h4>Register</h4>
                    <Alerts />
                    <div className='row'>
                        <div className='input-field'>
                            <input type='text' name='name' value={name} onChange={onChange} placeholder="User Name" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='Email' name='email' value={email} onChange={onChange} placeholder="Email" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='password' value={password} onChange={onChange} placeholder="Password" minLength="6"/>        
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='password2' value={password2} onChange={onChange} placeholder="Retype Password" minLength="6"/>
                        </div>
                    </div>
                    <div className="row">
                        <input className="submit-btn" type="submit" value="Register" />
                    </div>                  
                </form>
            </div>
            <div className='height-spacer-2'></div>
        </Fragment>
    )
};

export default Register;