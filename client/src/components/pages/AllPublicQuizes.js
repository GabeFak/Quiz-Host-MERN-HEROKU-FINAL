import React from 'react';
import { useContext, Fragment} from 'react';
import AllPublicQuizesItem from './AllPublicQuizesItems/AllPublicQuizesItem';
import AllPublicQuizesContext from '../../context/AllPublicQuizes/AllPublicQuizesContext';

const AllPublicQuizes = () => {
    const allPublicQuizesContext = useContext(AllPublicQuizesContext);
    const { publicQuizes } = allPublicQuizesContext;

    return (
        <Fragment>
            <div className='home-landing-wraper'>All Quizes 'page under construction'</div>
                {publicQuizes.map(quiz => (
                    <AllPublicQuizesItem quiz={quiz} key={quiz.id}/>
                ))}
        </Fragment>
    )
};

export default AllPublicQuizes;