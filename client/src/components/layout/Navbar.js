import React, { Fragment } from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AuthContext from '../../context/Auth/AuthContext';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import BurgerMenu from './BurgerMenu';

const Navbar = ({ outerContainerId }) => {
    const authContext = useContext(AuthContext);
    const { logout, user, loading } = authContext;

    const quizContext = useContext(QuizWipContext);
    const { loggedIn, clearQuizWIPS } = quizContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { clearQuizPub } = quizPublicContext;

    const onLogout = () => {
        logout();
        clearQuizWIPS();
        clearQuizPub();
    }; 

    if(loading) {
        return ''
    } else {

    return (
        //s
        <>
            <header className='browser-default'>
                <div className="header-logo">
                    <h1>QUIZHOST</h1>
                </div>
                <BurgerMenu pageWrapId={"page-wrap"} outerContainerId={outerContainerId} onLogout={onLogout}/>
                <div id='page-wrap' className={`header-user-name ${loggedIn ? '' : "hide"}`}>{user !== null ? user.name : ''}</div>
                    {/* <div className={`header-links ${loggedIn ? 'hide' : ''}`}>
                        <Link to="/AllPublicQuizes" >All Quizes |</Link>
                    </div> */}
                    <div className="space"></div>
                    { loggedIn ? 
                        <Fragment>
                            <div className="header-links">
                                <Link to="/Dashboard">Dashboard</Link>
                            </div> 
                            <div className='pipe'></div>
                            <div className="header-link-blue">
                                <a onClick={onLogout} href='#!'>Log Out</a>
                            </div> 
                            
                        </Fragment> 
                    : 
                        <Fragment>
                            <div className="header-links">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="header-links">
                                <Link to="/login">Log In</Link>
                            </div>
                            <div className="header-links">
                                <Link to="/register">Register</Link>
                            </div>
                        </Fragment>
                    }
            </header>
            
        </>
    )};
};

export default Navbar;