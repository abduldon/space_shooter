function Control({ onMove, onDifficultyChange, difficulty, disabled }) {
  return (
    <div className="controls" aria-label="Game controls">
      <div className="difficulty-picker">
        <span>Difficulty:</span>
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            type="button"
            className={difficulty === level ? 'active-level' : ''}
            onClick={() => onDifficultyChange(level)}
            key={level}
          >
            {level}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => onMove(-1)} disabled={disabled}>
        Left
      </button>
      <button type="button" onClick={() => onMove(1)} disabled={disabled}>
        Right
      </button>
      <p>AK-47 fire is continuous. Move left and right to aim at enemies.</p>
    </div>
  );
}

export default Control;
