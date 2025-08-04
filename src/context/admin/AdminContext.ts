import {createContext} from 'react';
import type {User} from '../../api';

export interface AdminContextType {
    users: User[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    updateUser: (id: string, updates: Partial<User>) => Promise<void>;
    getFilteredUsers: () => User[];
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);