import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/UseAuth.tsx';
import type {UserRoleEnum} from '../api';

type Props = {
    allowedRole: UserRoleEnum;
    children: React.ReactNode;
};

export const RoleProtectedRoute =  ({allowedRole, children} : Props) => {
    const {user, loading, isAuthenticated} = useAuth();

    if (loading) return <div>Загрузка...</div>;
    if (!isAuthenticated) return <Navigate to="/" replace />;
    if (!user || user.role !== allowedRole) return <Navigate to="/" replace />;

    return <>{children}</>;
};