function Bullet({ left, top }) {
  return <div className="bullet" style={{ left: `${left}%`, top: `${top}%` }} aria-label="Auto-fire bullet" />;
}

export default Bullet;
