function Scoreboard({ score, enemiesLeft, kills, survivalTime, difficulty }) {
  return (
    <div className="scoreboard">
      <p>Score <strong>{score}</strong></p>
      <p>Enemies active <strong>{enemiesLeft}</strong></p>
      <p>Kills <strong>{kills}</strong></p>
      <p>Survival <strong>{survivalTime}s</strong></p>
      <p>Level <strong>{difficulty}</strong></p>
    </div>
  );
}

export default Scoreboard;
