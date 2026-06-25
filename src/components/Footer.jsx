import Button from './Button';
import logo from "../assets/logos/logo-transparent.png";

function Footer() {
  const handleContactClick = () => {
    // TODO: Ajouter logique de contact (email, formulaire, etc.)
    console.log('Contact clicked');
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="logo rock'n'roll de julIAn rITou Team" className="footer__logo" />
        <Button 
          variant="primary" 
          size="large" 
          onClick={handleContactClick}
        >
          Me contacter
        </Button>
        <p className="footer__text">2026 julIAn rITou Team.</p>
      </div>
    </footer>
  );
}

export default Footer;