import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="site-header">
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
