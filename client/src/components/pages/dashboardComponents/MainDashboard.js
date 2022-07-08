import React from 'react';
import { Fragment, useState } from 'react'; 
import MakeNewQuiz from './MakeNewQuiz';
import MostViewedQuiz from './MostViewedQuiz';
import WipSelect from './wipSelect';
import EditPublicModal from '../../modals/EditPublicModal';
import YourTopQuizModal from '../../modals/YourTopQuizModal';
import NewQuizModal from '../../modals/NewQuizModal';
import AreYouSure from '../../modals/AreYouSure';
import SeeStats from '../../modals/SeeStats';


const MainDashboard = ({publicQuizes}) => {
    const [modal, setModal] = useState(false);

    const [modalState, setModalState] = useState({
      state: ''
    });

    const [selectedPublicQuizToDelete, setSelectPublicQuizToDelete] = useState({
      publicQuizToDeleteID: null,
      publicQuizToDeletePostId: null
    });

    const [areYouSure, setAreYouSure] = useState(false);

    const [newQuizModal, setNewQuizModal] = useState(false);

    const [seeStats, setSeeStats] = useState(false);

    const [selectedQuizStats, setSelectedQuizStats] = useState({ selectedQuizName: null });

    const [topQuizModalState, setTopQuizModalState] = useState(false);

    return (
        <Fragment>
            <div className="quiz-dashboard-macros-container-main quiz-dashboard-macros-container">
                <button className="quiz-dashboard-macros first-macro-button" onClick={() => {setModal(true); setModalState({state:'Quiz Stats'})}}>Quiz Stats</button>
                <button className="quiz-dashboard-macros middle-macro-button" onClick={() => {setModal(true); setModalState({state:'Delete Quiz'})}}>Delete Quiz</button>
                <button className="quiz-dashboard-macros middle-macro-button" onClick={() => {setModal(true); setModalState({state:'Edit Public Quizes'})}}>Edit Quiz</button>
                <button className="quiz-dashboard-macros last-macro-button" onClick={() => {setModal(true); setModalState({state:'Make Quiz Private'})}}>Make Quiz Private</button>
            </div>
            <div className="dashboard-grid-container">
                <MakeNewQuiz openModal={setNewQuizModal}/>
                <MostViewedQuiz openModal={setTopQuizModalState}/>
                <WipSelect />
                {/* <div className='height-spacer-3'></div> */}
            </div>
                { modal && <EditPublicModal quizToDel={setSelectPublicQuizToDelete} setAreYouSure={setAreYouSure} modalState={modalState} closeModal={setModal} publicQuizes={publicQuizes} setSeeStats={setSeeStats} setSelectedQuizStats={setSelectedQuizStats}/>}
                { areYouSure && <AreYouSure postId={selectedPublicQuizToDelete.publicQuizToDeletePostId} quizToDeletePublic={selectedPublicQuizToDelete.publicQuizToDeleteID} setAreYouSure={setAreYouSure} />}
                { seeStats && <SeeStats selectedQuizStats={selectedQuizStats} resetModal={setSeeStats}/>}
                { newQuizModal && <NewQuizModal closeModal={setNewQuizModal} />}
                { topQuizModalState && <YourTopQuizModal closeModal={setTopQuizModalState}/>}
        </Fragment>
    )             
};

export default MainDashboard;
