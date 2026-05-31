import './Header.css'
import { Grid3X3, Home, Info, Mail, Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/theme'

const navItems = [
	{ icon: Home, label: 'Inicio', to: '/' },
	{ icon: Mail, label: 'Contacto', to: '/contact' },
	{ icon: Info, label: 'Acerca', to: '/about' },
	{ icon: Grid3X3, label: 'Servicios', to: '/services' },
]

export const Header = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { isDarkMode, toggleDarkMode } = useTheme()

	const handleThemeToggle = (event) => {
		const rect = event.currentTarget.getBoundingClientRect()
		toggleDarkMode({
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		})
	}

	const handleNavigation = (event, to) => {
		if (
			event.defaultPrevented ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return
		}

		if (to === pathname) {
			return
		}

		event.preventDefault()

		if (!document.startViewTransition) {
			navigate(to)
			return
		}

		document.startViewTransition(() => {
			flushSync(() => {
				navigate(to)
			})
		})
	}

	return (
		<>
			<header className="site-header">
				<nav className="site-nav" aria-label="Main navigation">
					{navItems.map((item) => (
						<NavLink
							className="items-menu"
							key={item.to}
							onClick={(event) => handleNavigation(event, item.to)}
							to={item.to}
						>
							<item.icon size={16} strokeWidth={2.1} />
							{item.label}
						</NavLink>
					))}
					<button
						className="theme-toggle"
						type="button"
						aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
						onClick={handleThemeToggle}
					>
						{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
					</button>
				</nav>
			</header>
		</>
	)
}
