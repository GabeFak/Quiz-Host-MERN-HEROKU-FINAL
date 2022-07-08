import { useContext, useEffect} from "react";
import QuizPublicContext from "../../context/QuizPublic/QuizPublicContext";
import QuizWipContext from "../../context/QuizWip/QuizWipContext";

export default function useIsQuizNameTaken() {
    const quizPublicContext = useContext(QuizPublicContext);
    const { publicQuizes } = quizPublicContext;

    const quizWipContext = useContext(QuizWipContext);
    const { quizes, setAllQuizNames } = quizWipContext;
    let allUsersQuizNames = [];

    useEffect(() => {
        publicQuizes.forEach(quiz => {
            allUsersQuizNames.push(quiz.quizName);
        });
        quizes.forEach(quiz => {
            allUsersQuizNames.push(quiz.quizName);
        });
        setAllQuizNames(allUsersQuizNames);
    }, []);
    return allUsersQuizNames;
};