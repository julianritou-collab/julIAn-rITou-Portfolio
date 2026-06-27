import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">Oups! La page que<span className="newline-mobile"> </span>vous demandez n'existe pas.</p>
      <Link to="/" className="not-found__link">Retourner sur la page d'accueil</Link>
    </div>
  );
}

export default NotFound;