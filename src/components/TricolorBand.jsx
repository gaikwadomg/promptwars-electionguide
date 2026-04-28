export default function TricolorBand({ className = '' }) {
  return (
    <div className={`tricolor-band ${className}`}>
      <div className="tricolor-saffron"></div>
      <div className="tricolor-white"></div>
      <div className="tricolor-green"></div>
    </div>
  );
}
