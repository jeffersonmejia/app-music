import './Header.css'
import { flushSync } from 'react-dom'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
	{ label: 'Inicio', to: '/' },
	{ label: 'Contacto', to: '/contact' },
	{ label: 'Acerca', to: '/about' },
	{ label: 'Servicios', to: '/services' },
]

export const Header = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

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
							{item.label}
						</NavLink>
					))}
				</nav>
			</header>
		</>
	)
}
