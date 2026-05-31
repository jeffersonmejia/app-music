import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
	isDarkMode: false,
	setDarkMode: () => {},
	toggleDarkMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)
