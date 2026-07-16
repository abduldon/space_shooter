function Gameover({ score, won, onRestart }) {
  return (
    <section className="game-over" role="dialog" aria-modal="true">
      <h2>{won ? "Sector clear!" : "Game over"}</h2>
      <p>{won ? `You earned ${score} points.` : `An enemy escaped. Final score: ${score}.`}</p>
      <button type="button" onClick={onRestart}>Play again</button>
    </section>
  );
}

export default Gameover;
