import {createContext} from "react";
import type {ExpertContextType} from "./ExpertContext";

export const ExpertContext = createContext<ExpertContextType | undefined>(undefined);