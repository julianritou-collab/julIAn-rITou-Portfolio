import logo from "../assets/logos/logo.png";

function Footer() {
  return (
    <footer>
      <div className="footer__inner">
        <img src={logo} alt="julIAn rITou Team" className="footer__logo" />
        <p className="footer__text">© 2026 julIAn rITou Team<span className="newline-mobile"> </span>rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;