function Enemy({ left, top }) {
  return (
    <div className="enemy" style={{ left: `${left}%`, top: `${top}%` }} aria-label="Enemy">
      <span className="enemy-emoji" role="img" aria-label="Bacteria">🦠</span>
    </div>
  );
}

export default Enemy;
