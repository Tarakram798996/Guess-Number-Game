import { useState, useEffect } from "react";

export default function App() {
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [chances, setChances] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const[prevInput, setPrevInput] = useState("");

  const checkGuess = () => {
    if (chances <= 0 || gameOver) return;
    const num = parseInt(guess);
    if (isNaN(num)) return setMessage("Enter a number");

    if (num === target) {
      setMessage(`🎉 Correct! The number was ${target}`);
      setGameOver(true);
    } else {
      setChances((prev) => prev - 1);
      if (chances - 1 === 0) {
        setMessage(`❌ Out of chances! The number was ${target}`);
        setGameOver(true);
      } else if (num < target) {
        setMessage(`📉 Too low! `);
      } else {
        setMessage(`📈 Too high!`);
      }
    }
    setPrevInput((prev) => `${prev} ${guess}`);
    setGuess("");
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setChances(10);
    setGameOver(false);
    setPrevInput("");
  };

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameOver]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Guess the Number</h1>
      <p>Chances Left: {chances}</p>
      <input
        style={{margin:21,padding:10, border: "2px solid black", borderRadius:10 }}
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        disabled={chances <= 0 || gameOver}
      />
      <button onClick={checkGuess} disabled={chances <= 0 || gameOver}>
        Guess
      </button><br></br><br/>
      <button onClick={resetGame}>Reset</button>
      <br/><br/>
      {prevInput && <p>Previous Input :: {prevInput}</p>}
      <br/>
      <p>{message}</p>
      {gameOver && <p>Game will reset in 5 seconds...</p>}
    </div>
  );
}
