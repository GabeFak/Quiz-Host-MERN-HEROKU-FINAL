import { useEffect, useContext } from "react";
import QuizPublicContext from "../../context/QuizPublic/QuizPublicContext";
import AuthContext from "../../context/Auth/AuthContext";

export default function useGetQuizStats(quizNameToCalc) {
    const quizPublicContext = useContext(QuizPublicContext);
    const { getAllPublicQuizesToCalc, allPublicQuizesToCalc } = quizPublicContext;

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    let quizesToCalc;

    useEffect(() => {
        getAllPublicQuizesToCalc();
    }, []);

    if(allPublicQuizesToCalc !== null || allPublicQuizesToCalc !== []) {
        quizesToCalc = allPublicQuizesToCalc.filter(quizes => {
            if(quizes.userName === user.name) {
                return quizes;
            };
        });
        
        let stats = quizesToCalc.filter(quizes => quizes.quizName === quizNameToCalc);
        return stats;
    };
};