import {createContext, useState, useEffect, ReactNode} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() =>{
        const storagedTheme = localStorage.getItem("let-me-ask-theme");
        return (storagedTheme ?? "light") as Theme;
    });
    
    useEffect(() => {
        localStorage.setItem('let-me-ask-theme', currentTheme);

        if (currentTheme === "dark") {
          document.querySelector("body")?.classList.add("dark-theme");
        } else {
          document.querySelector("body")?.classList.remove("dark-theme");
        }

      }, [currentTheme]);

    function toggleTheme() {
      setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}