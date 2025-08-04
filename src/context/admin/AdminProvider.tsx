import React, {type ReactNode, useEffect, useState} from 'react';
import {AdminService} from '../../services/AdminService.ts';
import {AdminContext} from './AdminContext';
import type {User} from '../../api';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        (async () => {
            const usersResp = await AdminService.getUsers();
            setUsers(usersResp.data || []);
        })();
    }, []);

    const updateUser = async (id: string, updates: Partial<User>) => {
        await AdminService.updateUser(id, updates);
        const usersResp = await AdminService.getUsers();
        setUsers(usersResp.data || []);
    };

    const getFilteredUsers = () => {
        if (!searchTerm) return users;
        return users.filter(user =>
            (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <AdminContext.Provider value={{
            users,
            searchTerm,
            setSearchTerm,
            updateUser,
            getFilteredUsers
        }}>
            {children}
        </AdminContext.Provider>
    );
};

