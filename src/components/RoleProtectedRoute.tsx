import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../context/auth/UseAuth';
import type {UserRoleEnum} from '../api';

type Props = {
    allowedRole: UserRoleEnum;
    children: React.ReactNode;
};

export const RoleProtectedRoute =  ({allowedRole, children} : Props) => {
    const {user, loading, isAuthenticated} = useAuth();
    const location = useLocation();

    if (loading) return <div>Загрузка...</div>;
    if (!isAuthenticated) return <Navigate to="/" replace />;
    if (!user) return <Navigate to="/" replace />;
    if (user.status && user.status !== 'ACTIVE') {
        return <Navigate to="/status-error" replace state={{ status: user.status, from: location.pathname }} />;
    }
    if (user.role !== allowedRole) return <Navigate to="/" replace />;
    return <>{children}</>;
};
