import {useContext} from "react";
import {ThemeContext} from './ThemeContext.ts';

export const useTheme = () => useContext(ThemeContext);