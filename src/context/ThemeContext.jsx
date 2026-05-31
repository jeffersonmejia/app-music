import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import PropTypes from 'prop-types'
import { ThemeContext } from './theme'

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark'
	})

	useEffect(() => {
		document.body.classList.toggle('dark-mode', isDarkMode)
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
	}, [isDarkMode])

	const setDarkMode = useCallback((nextMode, origin) => {
		if (nextMode === isDarkMode) return

		if (!origin || !document.startViewTransition) {
			setIsDarkMode(nextMode)
			return
		}

		const root = document.documentElement
		root.style.setProperty('--theme-x', `${origin.x}px`)
		root.style.setProperty('--theme-y', `${origin.y}px`)
		root.classList.add('theme-transition')

		const transition = document.startViewTransition(() => {
			flushSync(() => {
				setIsDarkMode(nextMode)
			})
		})

		transition.finished.finally(() => {
			root.classList.remove('theme-transition')
		})
	}, [isDarkMode])

	const toggleDarkMode = useCallback((origin) => {
		setDarkMode(!isDarkMode, origin)
	}, [isDarkMode, setDarkMode])

	return (
		<ThemeContext.Provider value={{ isDarkMode, setDarkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	)
}

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
