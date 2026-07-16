import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/header";
import GameBoard from "./components/gameboard";
import Scoreboard from "./components/scoreboard";
import Control from "./components/control";

const SHIP_STEP = 8;
const DIFFICULTIES = {
  easy: { label: "Easy", enemySpeed: 0.35, timeLimit: 45 },
  medium: { label: "Medium", enemySpeed: 0.65, timeLimit: 30 },
  hard: { label: "Hard", enemySpeed: 1.1, timeLimit: 20 },
};
const STARTING_ENEMIES = [
  { id: 1, left: 15, top: 6 },
  { id: 2, left: 33, top: 13 },
  { id: 3, left: 51, top: 5 },
  { id: 4, left: 69, top: 12 },
  { id: 5, left: 87, top: 7 },
];

function createEnemies() {
  return STARTING_ENEMIES.map((enemy) => ({ ...enemy }));
}

function App() {
  const [shipPosition, setShipPosition] = useState(50);
  const [enemies, setEnemies] = useState(createEnemies);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [survivalTime, setSurvivalTime] = useState(0);
  const [bullets, setBullets] = useState([]);
  const nextEnemyId = useRef(6);

  const moveShip = (direction) => {
    if (gameOver) return;
    setShipPosition((position) => Math.max(5, Math.min(95, position + direction * SHIP_STEP)));
  };

  const shoot = () => {
    if (gameOver || enemies.length === 0) return;

    setBullets((currentBullets) => {
      if (currentBullets.length >= 6) return currentBullets;

      return [...currentBullets, {
        id: Date.now() + Math.random(),
        left: shipPosition,
        top: 78,
      }];
    });
  };

  const startGame = (nextDifficulty = difficulty) => {
    setShipPosition(50);
    setEnemies(createEnemies());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setSurvivalTime(0);
    setBullets([]);
  };

  const changeDifficulty = (nextDifficulty) => {
    setDifficulty(nextDifficulty);
    startGame(nextDifficulty);
  };

  useEffect(() => {
    if (gameOver) return undefined;

    const enemyTimer = window.setInterval(() => {
      setEnemies((currentEnemies) => {
        const nextEnemies = currentEnemies.map((enemy) => ({
          ...enemy,
          top: enemy.top + DIFFICULTIES[difficulty].enemySpeed,
        }));

        if (nextEnemies.some((enemy) => enemy.top >= 78)) {
          setGameOver(true);
          setWon(false);
        }

        return nextEnemies;
      });
    }, 180);

    return () => window.clearInterval(enemyTimer);
  }, [difficulty, gameOver]);

  useEffect(() => {
    if (gameOver) return undefined;

    const spawnDelay = difficulty === "easy" ? 1700 : difficulty === "medium" ? 1200 : 850;
    const enemySpawner = window.setInterval(() => {
      setEnemies((currentEnemies) => [
        ...currentEnemies,
        {
          id: nextEnemyId.current++,
          left: 10 + Math.random() * 80,
          top: -8,
        },
      ]);
    }, spawnDelay);

    return () => window.clearInterval(enemySpawner);
  }, [difficulty, gameOver]);

  useEffect(() => {
    if (bullets.length === 0 || gameOver) return undefined;

    const bulletTimer = window.setInterval(() => {
      const enemyIdsHit = new Set();

      const nextBullets = bullets.flatMap((bullet) => {
        const nextTop = bullet.top - 6;
        const enemyHit = enemies.find(
          (enemy) => Math.abs(enemy.left - bullet.left) <= 5 && Math.abs(enemy.top - nextTop) <= 6,
        );

        if (enemyHit) {
          enemyIdsHit.add(enemyHit.id);
          return [];
        }

        if (nextTop <= 0) return [];
        return [{ ...bullet, top: nextTop }];
      });

      setBullets(nextBullets);

      if (enemyIdsHit.size > 0) {
        setEnemies((currentEnemies) => currentEnemies.filter((enemy) => !enemyIdsHit.has(enemy.id)));
        setScore((currentScore) => currentScore + enemyIdsHit.size * 100);
      }
    }, 45);

    return () => window.clearInterval(bulletTimer);
  }, [bullets, enemies, gameOver]);

  useEffect(() => {
    if (gameOver || enemies.length === 0) return undefined;

    const autoFire = window.setInterval(shoot, 120);
    return () => window.clearInterval(autoFire);
  }, [enemies, gameOver, shipPosition]);

  useEffect(() => {
    if (gameOver) return undefined;

    const survivalTimer = window.setInterval(() => {
      setSurvivalTime((currentTime) => currentTime + 1);
    }, 1000);

    return () => window.clearInterval(survivalTimer);
  }, [gameOver]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") moveShip(-1);
      if (event.key === "ArrowRight") moveShip(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, enemies, shipPosition]);

  return (
    <main className="app">
      <Header />
      <Scoreboard
        score={score}
        enemiesLeft={enemies.length}
        kills={score / 100}
        survivalTime={survivalTime}
        difficulty={DIFFICULTIES[difficulty].label}
      />
      <GameBoard
        shipPosition={shipPosition}
        enemies={enemies}
        bullets={bullets}
        gameOver={gameOver}
        won={won}
        score={score}
        onRestart={startGame}
      />
      <Control
        onMove={moveShip}
        onDifficultyChange={changeDifficulty}
        difficulty={difficulty}
        disabled={gameOver}
      />
    </main>
  );
}

export default App;
