import { NavLink } from "react-router-dom";
import logo from "../assets/logos/logo.png";

function Header() {
  return (
    <header>
      <div className="container header__inner">
        <img src={logo} alt="Kasa" className="header__logo" />
        <nav className="header__nav" aria-label="Navigation principale">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Accueil</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>À propos</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;