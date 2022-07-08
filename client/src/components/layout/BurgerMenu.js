import React from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const BurgerMenu = ({...props}) => {
    const { onLogout } = props;

    const quizContext = useContext(QuizWipContext);
    const { loggedIn } = quizContext;

  return (
    <div>
        <Menu {...props}>
            { loggedIn ? 
                <>
                    <Link to="/Dashboard" className="menu-item" >Dashboard</Link>

                    <a onClick={onLogout} href='#!' className="menu-item" >Log Out</a>

                </>
            :
                <>
                    <Link to="/" className="menu-item" >Home</Link>

                    <Link to="/login" className="menu-item" >Log In</Link>

                    <Link to="/register" className="menu-item" >Register</Link>
                </>
            }
        </Menu>
    </div>
  )
};

export default BurgerMenu;