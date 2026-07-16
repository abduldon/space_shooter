function Spaceship({ position }) {
  return (
    <div className="spaceship" style={{ left: `${position}%` }} aria-label="Your spaceship">
      <span>🚀</span>
      <span className="gun-emoji" aria-hidden="true">▄︻デ══━一💥</span>
    </div>
  );
}

export default Spaceship;
