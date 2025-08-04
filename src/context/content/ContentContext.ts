import {createContext} from "react";
import type {ContentContextType} from "./ContentProvider";

export const ContentContext = createContext<ContentContextType | undefined>(undefined);