import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useContext, useRef} from 'react';
import HomeSearchItem from './HomeItems/HomeSearchItem';
import AuthContext from '../../context/Auth/AuthContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import AllPublicQuizesContext from '../../context/AllPublicQuizes/AllPublicQuizesContext';
import HomeQuizList from './HomeItems/HomeQuizList';

const Home = () => {
    const searchText = useRef('');
    const nav = useNavigate();

    const allPublicQuizesContext = useContext(AllPublicQuizesContext);
    const { filterALLPublicQuizes, clearAllPublicQuizesFilter, filtered, getFromPublic, publicQuizes } = allPublicQuizesContext;

    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedOff } = quizWipContext;

    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout} = authContext;

    useEffect(() => { 
        setLoggedOff();
        getFromPublic();
        if(isAuthenticated) {
            nav('/dashboard');
        } else {
            logout();
        };

        if(filtered === null) {
            searchText.current.value = '';
        };
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const clearInput = () => {
        searchText.current.value = "";
        clearAllPublicQuizesFilter();
    };

    function onChange(e) {
        if((searchText.current.value !== '')) {
            if(!searchText.current.value.includes('\\')) {
                filterALLPublicQuizes(e.target.value);
            };
        }else{
            clearAllPublicQuizesFilter();
        };
    };

    return (
        <Fragment>
            {/* <div className="home-landing-wraper">
                <div className="home-register-container">
                    <h1>Quiz Creation Made Easy</h1>
                        <div className="register-form-home">
                            <div className="register-today">
                                <h2>Register With Us Today</h2>
                            </div>
                            <div className="reg-btn-home"><Link to="/register">Register</Link></div>
                        </div>
                </div>
            </div> */}
            <div className="search-wrapper">
                <div className='search-all-quizes'>Search All Quizes</div>
                <div className='search-bar-dropdown'>
                    <input ref={searchText} type="text" className='search' placeholder="Search All Quizes" onChange={onChange}/>
                    <div className='list-group'>
                        {filtered !== null && filtered.map(filter => (
                        <HomeSearchItem quizName={filter.quizName} key={filter._id} clearInput={clearInput}/>
                        ))}
                        
                    </div>
                    
                </div>
            </div>
            <div className="quiz-wrapper">
                <div className='all-quizes'>All Quizes</div>
                {publicQuizes.map(quiz => (
                    <HomeQuizList key={quiz._id} quizName={quiz.quizName} quizAuthor={quiz.userName} views={quiz.views}/>
                ))}
            </div>
            <div className='height-spacer'></div>
            
            {/* <div className="recent-quizes-wrapper">
                <div className="most-recent">
                    <h1>Most Recent Quizes</h1>
                        <div className="home-quiz-container">
                            <Link to="/"><div className="quiz-item-home"></div></Link>
                            <Link to="/"><div className="quiz-item-home"></div></Link>
                            <Link to="/"><div className="quiz-item-home"></div></Link>
                            <Link to="/"><div className="quiz-item-home"></div></Link>
                        </div>
                </div>
            </div> */}
        </Fragment>
    )
};

export default Home;