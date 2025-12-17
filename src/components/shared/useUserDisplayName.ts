import {useState, useEffect} from 'react';
import {useAuth} from "../../context/auth/UseAuth.ts";
import {AdminService} from "../../services/AdminService.ts";
import {useProfile} from "../../context/profile/UseProfile.tsx";

export function useUserDisplayName() {
    const {user} = useAuth();
    const [displayName, setDisplayName] = useState('Пользователь');
    const {getStaffProfileById} = useProfile();

    useEffect(() => {
        if (!user?.email) {
             setDisplayName('Пользователь');
             return;
        }

        const fetchUserName = async () => {
            let foundName = '';

            // 1. Try to get from AdminService (all users) as requested
            try {
                const response = await AdminService.getUsers(1, 100);
                let users: any[] = [];
                
                if (Array.isArray(response.data)) {
                    users = response.data;
                } else if (response.data && Array.isArray((response.data as any).content)) {
                    users = (response.data as any).content;
                }

                const userEmail = user.email.toLowerCase().trim();
                const foundUser = users.find(u => u.email?.toLowerCase().trim() === userEmail);

                if (foundUser) {
                    foundName = [foundUser.surname, foundUser.name].filter(Boolean).join(' ');
                }
            } catch (error) {
                console.warn("Failed to fetch users via AdminService (likely permission issue):", error);
            }

            if (foundName) {
                setDisplayName(foundName);
                return;
            }

            // 2. Fallback: Try to get from ProfileService (current user profile)
            if (user.id) {
                try {
                    const profile = await getStaffProfileById(user.id);
                    foundName = [profile.surname, profile.name].filter(Boolean).join(' ');
                } catch (error) {
                    console.warn("Failed to fetch profile via ProfileService:", error);
                }
            }

            // 3. Final fallback: Email or default
            setDisplayName(foundName || user.email || 'Пользователь');
        };

        fetchUserName();
    }, [user, getStaffProfileById]);
    return displayName;
}