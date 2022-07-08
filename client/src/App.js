import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './cssScaleUp.css';

import setAuthToken from './Utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from './components/routing/PrivateRoute';
import Footer from "./components/layout/Footer";
import Dashboard from './components/pages/Dashboard';
import QuizEditor from './components/pages/QuizEditor';
import QuizPreview from './components/pages/QuizPreview';
import ActiveQuiz from './components/pages/ActiveQuiz';
import QuizWipState from './context/QuizWip/QuizWipState';
import QuizPublicState from './context/QuizPublic/QuizPublicState';
import AllPublicQuizesState from './context/AllPublicQuizes/AllPublicQuizesState';
import AuthState from './context/Auth/AuthState';
import AlertState from './context/Alert/AlertState';


if(localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
  return (
    <div  id="outer-container" >
    <AlertState>
      <AuthState>
          <AllPublicQuizesState>
              <QuizPublicState>
                <QuizWipState>
                  <Router >
                    <Fragment>
                      <Navbar outerContainerId={"outer-container"}/>
                      {/* <Alerts /> */}
                        <div className="container">
                          <Routes>
                            <Route path="/" element= {<Home />}/>
                            <Route path="/login" element= {<Login />}/>
                            <Route path="/Register" element= {<Register />}/>
                            {/* <Route path="/AllPublicQuizes" element= {<AllPublicQuizes />}/> */}

                            <Route path="/Dashboard" element={<PrivateRoute />}>
                            <Route path="/Dashboard" element= {<Dashboard />}/></Route>
                            
                            <Route path="/QuizEditor/:quizName/:isPub" element={<PrivateRoute />}>
                            <Route path="/QuizEditor/:quizName/:isPub" element= {<QuizEditor />}/></Route>

                            <Route path="/QuizPreview/:quizName/:isPub" element={<PrivateRoute />}>
                            <Route path="/QuizPreview/:quizName/:isPub" element= { <QuizPreview />}/></Route>

                            <Route path="/ActiveQuiz/:quizName" element= { <ActiveQuiz />}/> 
                          </Routes>
                        </div>
                      <Footer />
                    </Fragment>
                  </Router>
                </QuizWipState>
              </QuizPublicState>
          </AllPublicQuizesState>
      </AuthState>
    </AlertState>
    </div>
  )
};

export default App;
