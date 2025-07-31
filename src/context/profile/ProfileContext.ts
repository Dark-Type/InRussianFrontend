import {createContext} from "react";
import type {ProfileContextType} from "./ProfileProvider.tsx";

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);