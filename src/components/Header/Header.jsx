import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className={pathname === "/" ? "site-header home-header" : "site-header"}>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink className="items-menu" to="/">
            Home
          </NavLink>
          <NavLink className="items-menu" to="/contact">
            Contact
          </NavLink>
          <NavLink className="items-menu" to="/about">
            About
          </NavLink>
          <NavLink className="items-menu" to="/services">
            Services
          </NavLink>
        </nav>
      </header>
    </>
  );
};
