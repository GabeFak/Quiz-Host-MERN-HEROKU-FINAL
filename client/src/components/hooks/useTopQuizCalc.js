import { useEffect, useContext } from "react";
import QuizPublicContext from "../../context/QuizPublic/QuizPublicContext";
import AuthContext from "../../context/Auth/AuthContext";

export default function useTopQuizCalc() {
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

        let quizesToBeArangedByViews = quizesToCalc;

            let quizPopularityStats = [];
            let quizViews = [];
            let quizNames = [];
        
            quizesToBeArangedByViews.forEach((quiz, index) => {
                quizViews[index] = quiz.views;
                quizNames[index] = quiz.quizName;
            });

            for(let i = 0; i < quizViews.length; i++) {
                quizPopularityStats[i] = [quizViews[i], quizNames[i]];
            };

            let c = 0;
            quizPopularityStats.sort((a, b) => {
                if (a[c] === b[c]) {
                    return 0;
                }else {
                    return (a[c] < b[c]) ? 1 : -1;
                    
                };
            });
            return quizPopularityStats;     
    };
};