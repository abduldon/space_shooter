import Spaceship from "./spaceship";
import Enemy from "./enemy";
import Bullet from "./bullet";
import Gameover from "./gameover";

function GameBoard({ shipPosition, enemies, bullets, gameOver, won, score, onRestart }) {
  return (
    <section className="game-board" aria-label="Space shooter game board">
      <div className="stars" aria-hidden="true" />
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} left={enemy.left} top={enemy.top} />
      ))}
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} left={bullet.left} top={bullet.top} />
      ))}
      <Spaceship position={shipPosition} />
      {gameOver && <Gameover score={score} won={won} onRestart={onRestart} />}
    </section>
  );
}

export default GameBoard;
