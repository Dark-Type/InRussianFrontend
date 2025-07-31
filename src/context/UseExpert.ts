import {useContext} from "react";
import { ExpertContext } from "./UseExpert.tsx";
export const useExpert = () => {
    const context = useContext(ExpertContext);
    if (context === undefined) {
        throw new Error('useExpert must be used within an ExpertProvider');
    }
    return context;
};