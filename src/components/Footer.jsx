import Button from './Button';
import linkedin from "../assets/logos/InBug-White.png";
import { useRef } from 'react';

function Footer({ onOpenContact }) {
  const wasFocusedBeforePointerRef = useRef(false);

  const handleContactMouseDownCapture = (event) => {
    wasFocusedBeforePointerRef.current = document.activeElement === event.currentTarget;
  };

  const handleContactClick = (event) => {
    if (onOpenContact) {
      const isKeyboardActivation = event.detail === 0;
      const shouldRestoreFocus = isKeyboardActivation || wasFocusedBeforePointerRef.current;
      onOpenContact(event.currentTarget, shouldRestoreFocus);
    }

    wasFocusedBeforePointerRef.current = false;
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
          onMouseDownCapture={handleContactMouseDownCapture}
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