import React, {useState, useEffect} from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import Sidebar from "./components/Sidebar";
import {WORDS} from "../public/WORDS";
import Game from "./components/Game";

function App() {
  const [correctWord, setCorrectWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  function newWord() {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCorrectWord(newWord);
  }
  // console.log(correctWord);
  const [gameStats, setGameStats] = useState({
    played: 0,
    wins: 0,
    loses: 0,
    streak: 0,
    winrate: 0,
  });
  useEffect(() => {
    const played = localStorage.getItem("played");
    const wins = localStorage.getItem("wins");
    const loses = localStorage.getItem("loses");
    const streak = localStorage.getItem("streak");

    const winrate = played ? ((wins / played) * 100).toFixed(2) : 0;

    setGameStats({
      played: played || 0,
      wins: wins || 0,
      loses: loses || 0,
      streak: streak || 0,
      winrate: winrate || 0,
    });
  }, []);

  return (
    <>
      {/* <Sidebar /> */}
      <BackgroundGrid />
      <Game
        correctWord={correctWord}
        setnewWord={newWord}
        gameStats={gameStats}
        setGameStats={setGameStats}
      />
    </>
  );
}
export default App;
