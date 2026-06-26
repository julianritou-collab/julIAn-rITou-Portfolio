import Button from './Button';
import linkedin from "../assets/logos/InBug-White.png";

function Footer() {
  const handleContactClick = () => {
    // TODO: Ajouter logique de contact (email, formulaire, etc.)
    console.log('Contact clicked');
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="https://www.linkedin.com/in/julian-ritou-203416202" className="footer__linkedin-link" target="_blank"
            rel="noreferrer noopener" aria-label="Aller sur mon profil LinkedIn" >
            <img src={linkedin} alt="" className="footer__logo" />
        </a>
        <Button
          variant="primary" 
          size="large" 
          onClick={handleContactClick}
        >
          Me contacter
        </Button>
        <p className="footer__text">2026 - Julian RITOU</p>
      </div>
    </footer>
  );
}

export default Footer;