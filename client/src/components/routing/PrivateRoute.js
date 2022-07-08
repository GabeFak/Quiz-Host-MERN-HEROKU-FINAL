import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/Auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    if(!isAuthenticated && !loading) {
        return (
            <Navigate replace to='/login' />
        );
    }else{
        return <Outlet />;
    };
};

export default PrivateRoute;
