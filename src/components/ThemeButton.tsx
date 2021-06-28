import { ButtonHTMLAttributes } from 'react';

import sumImg from '../assets/images/sum.svg';
import moonImg from '../assets/images/moon.svg';

import {useTheme} from '../hooks/useTheme';

import '../styles/themeButton.scss';

type ThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isFixed?:boolean;
};

export function ThemeButton ({isFixed = false, ...props}:ThemeButtonProps ) {
    const {theme, toggleTheme} = useTheme();

    return (
        <button 
            className={`${theme === "dark" ? "dark-theme" : "" } ${isFixed ? "is-fixed": ""} `}
            id="theme-button"
            onClick={toggleTheme}
        >
            <img src={moonImg} alt="Lua" />
            <div></div>
            <img src={sumImg} alt="Sol" />
        </button>
    );
}