import React, { Fragment, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AreYouSure from '../../../modals/AreYouSure';
import SeeStatsModalPublicQuizEdit from '../../../modals/SeeStatsModalPublicQuizEdit';
import QuizWipContext from '../../../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../../../context/QuizPublic/QuizPublicContext';
import ActiveBtns from './ActiveBtns';
import GreyedOut from './GreyedOut';

const QuestionEditorMacroButtons = () => {
    const nav = useNavigate();

    const quizWipContext = useContext(QuizWipContext);
    const { quizEdit, quizes, deleteWipQuiz, updatePrivateQuiz, addQuizToWip } = quizWipContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { quizEditPublic, addQuizPublic, updatePublicQuiz} = quizPublicContext;

    const isQuizPublished = useParams();

    const [areYouSure, setAreYouSure] = useState({
        openModal: false,
        isNotPublished: null
    });

    const [seeStatsModal, setSeeStatsModal] = useState(false);

    const setAreYouSureState = () => {
        if(isQuizPublished.isPub === "Unpublished") {
            setAreYouSure({
                openModal: true,
                isNotPublished: true
            });
        }else if(isQuizPublished.isPub === "Published") {
            setAreYouSure({
                openModal: true,
                isNotPublished: false 
            });
        };
    };

    const publish = () => {
        const addToPrivate = quizes.filter(quiz => quiz._id === quizEdit._id);
        const addPrivate = addToPrivate[Object.keys(addToPrivate)[0]];
        addPrivate.isPublished = "Published";
        addQuizPublic(addPrivate);
        deleteWipQuiz(quizEdit._id);
        nav('../../Dashboard');
    };

    const saveQuiz = () => {
        if(!quizEdit._id && isQuizPublished.isPub === "Unpublished") {
            addQuizToWip(quizEdit);
        } else if(isQuizPublished.isPub === "Unpublished") {
            updatePrivateQuiz(quizEdit);
        }else if(isQuizPublished.isPub === "Published") {
            updatePublicQuiz(quizEditPublic);
        }
        nav('../../Dashboard');
    };

    const linkToPreview = () => {
        if(!quizEdit._id && isQuizPublished.isPub === "Unpublished") {
            addQuizToWip(quizEdit);
        } else if(isQuizPublished.isPub === "Unpublished") {
            updatePrivateQuiz(quizEdit);
        }else if(isQuizPublished.isPub === "Published") {
            updatePublicQuiz(quizEditPublic);
        }
        nav(`/QuizPreview/${isQuizPublished.quizName}/${isQuizPublished.isPub}`);
    };

    const seeStats = () => {
        setSeeStatsModal(true);
    };

    const greyedOut = () => {
        return (
            <GreyedOut saveQuiz={saveQuiz} isQuizPublished={isQuizPublished} quizEdit={quizEdit}/>
        )
    };

    const activeBtns = () => {
        return(
            <ActiveBtns saveQuiz={saveQuiz} quizEdit={quizEdit} isQuizPublished={isQuizPublished} setAreYouSureState={setAreYouSureState} publish={publish} seeStats={seeStats} linkToPreview={linkToPreview} />
        )
    };

    return (
        <Fragment>
            {isQuizPublished.isPub === "Unpublished" ? 
                <>
                    {quizEdit !== undefined ? 
                        <>{quizEdit.quizQuestions.length === 0 ? greyedOut() : activeBtns()}</>
                    :
                        ''
                    }
                </>
            :
                <>
                    {quizEditPublic !== undefined ? 
                        <>{quizEditPublic.quizQuestions.length === 0 ? greyedOut() : activeBtns()}</>
                    :
                        ''
                    }
                </>
            }
            { areYouSure.openModal && areYouSure.isNotPublished && 
                <AreYouSure quizID={quizEdit._id} setAreYouSure={setAreYouSure} isPublished={isQuizPublished.isPub} />
            }
            { areYouSure.openModal && !areYouSure.isNotPublished && 
                <AreYouSure postId={quizEditPublic.postId} quizToDeletePublic={quizEditPublic._id} setAreYouSure={setAreYouSure} isPublished={isQuizPublished.isPub} />
            }
            { seeStatsModal && 
                <SeeStatsModalPublicQuizEdit resetModal={setSeeStatsModal} views={quizEditPublic.views} quizName={quizEditPublic.quizName}/> 
            }
        </Fragment>
    )
};

export default QuestionEditorMacroButtons;
