import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logos/logo-transparent.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerButtonRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        burgerButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__logo-container">
          <img src={logo} alt="logo rock'n'roll de julIAn rITou Team" className="header__logo" />
          <p className="header__logo-text">jul<strong>IA</strong>n r<strong>IT</strong>ou <strong>Team</strong></p>
        </div>

        <button
          ref={burgerButtonRef}
          type="button"
          className={`header__burger ${isMenuOpen ? "is-open" : ""}`}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="header__burger-line header__burger-line--top" aria-hidden="true"></span>
          <span className="header__burger-line header__burger-line--middle" aria-hidden="true"></span>
          <span className="header__burger-line header__burger-line--bottom" aria-hidden="true"></span>
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Navigation principale"
        >
          <NavLink to="/" end className={({ isActive }) => `header__nav-link ${isActive ? "active" : ""}`.trim()} onClick={closeMenu}>Accueil</NavLink>
          <NavLink to="/about" className={({ isActive }) => `header__nav-link ${isActive ? "active" : ""}`.trim()} onClick={closeMenu}>À propos</NavLink>
          <NavLink to="/skills" className={({ isActive }) => `header__nav-link ${isActive ? "active" : ""}`.trim()} onClick={closeMenu}>Compétences</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;