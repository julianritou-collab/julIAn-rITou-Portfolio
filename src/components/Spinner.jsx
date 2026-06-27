function Spinner({ message = "Chargement en cours..." }) {
  return (
    <div className="spinner">
      <div className="spinner__circle"></div>
      {message && <p className="spinner__message">{message}</p>}
    </div>
  );
}

export default Spinner;