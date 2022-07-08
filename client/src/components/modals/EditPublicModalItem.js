import React from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const EditPublicModalItem = ({publicQuizToList, modalState, closeModal, setAreYouSure, quizToDel, setSeeStats, setSelectedQuizStats}) => {
  const quizPublicContext = useContext(QuizPublicContext);
  const { deletePublicQuiz, publicQuizes} = quizPublicContext;

  const quizWipContext = useContext(QuizWipContext);
  const { addQuizToWip } = quizWipContext;

  const nav = useNavigate(); 
  
  const {quizName, _id, isPublished, postId } = publicQuizToList;

  const quizSelectionAction = () => {
    switch(modalState.state) {
      case 'Quiz Stats':
        setSelectedQuizStats({selectedQuizName: quizName});
        closeModal(false);
        setSeeStats(true);
        break;
      case 'Delete Quiz':
        setAreYouSure(true);
        quizToDel({
          publicQuizToDeleteID: _id,
          publicQuizToDeletePostId: postId
        });
        closeModal(false);
        break;
      case 'Edit Public Quizes':
        nav(`/QuizEditor/${quizName}/${isPublished}`);
        break;
      case 'Make Quiz Private':
        const addToPrivate = publicQuizes.filter(quiz => quiz.quizName === quizName);
        const addPrivate = addToPrivate[Object.keys(addToPrivate)[0]];
        addPrivate.isPublished = "Unpublished";
        addQuizToWip(addPrivate);
        deletePublicQuiz(_id, postId);
        closeModal(false);
        break;
      default:
        console.log('didnt work');
    };
  };

  return (
    <button onClick={quizSelectionAction} className='modal-button'>{quizName}</button>
  )
};

export default EditPublicModalItem;
