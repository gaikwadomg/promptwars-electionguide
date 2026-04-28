export default function AshokaChakra({ size = 60, spinning = false, className = '' }) {
  const spokes = 24;
  const spokeElements = [];
  
  for (let i = 0; i < spokes; i++) {
    const angle = (i * 360) / spokes;
    spokeElements.push(
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="18"
        stroke="#000080"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform={`rotate(${angle} 50 50)`}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${spinning ? 'animate-spin-slow' : ''} ${className}`}
      style={{ animationDuration: spinning ? '8s' : undefined }}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#000080" strokeWidth="3" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#000080" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="5" fill="#000080" />
      {/* Spokes */}
      {spokeElements}
      {/* Small dots between spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const angle = ((i * 360) / spokes + 7.5) * (Math.PI / 180);
        const x = 50 + 37 * Math.sin(angle);
        const y = 50 - 37 * Math.cos(angle);
        return <circle key={`dot-${i}`} cx={x} cy={y} r="1.2" fill="#000080" />;
      })}
    </svg>
  );
}
