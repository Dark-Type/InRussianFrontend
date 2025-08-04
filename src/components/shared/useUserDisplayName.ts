import {useState, useEffect} from 'react';
import {useProfile} from "../../context/profile/UseProfile.tsx";

export function useUserDisplayName() {
    const [displayName, setDisplayName] = useState('Пользователь');
    const {getStaffProfileById} = useProfile();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        getStaffProfileById(userId)
            .then(profile => {
                const {name, patronymic} = profile;
                setDisplayName(patronymic ? `${name} ${patronymic}` : name);
            })
            .catch(() => setDisplayName('Администратор'));
    }, [getStaffProfileById]);
    return displayName;
}