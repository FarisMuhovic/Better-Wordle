import React, {useState, useEffect} from "react";
import {WORDS} from "../../public/WORDS";
import WordsGrid from "./WordsGrid";
import Keyboard from "./Keyboard";
import EndGameModal from "./modals/EndGameModal";
import {createPortal} from "react-dom";

const Game = props => {
  const {correctWord, setnewWord, gameStats, setGameStats} = props;
  const [gridErrorModal, setGridErrorModal] = useState({type: "", show: false});
  const [shakeRow, setShakeRow] = useState({row: 0, shake: false});
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [enterKeyPressed, setEnterKeyPressed] = useState({key: "", time: ""});
  const [gameEnding, setgameEnding] = useState({end: false, win: false});

  useEffect(() => {
    const handleKeyDown = e => {
      handleKeyInput(e.keyCode, e);
    };

    document.addEventListener("keydown", handleKeyDown);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  function handleKeyInput(keyPressed, e) {
    if (!gameEnding.end) {
      const asci =
        typeof keyPressed === "string" ? toAsci(keyPressed) : keyPressed;

      if (asci >= 65 && asci <= 90) {
        setGuess(prevGuess => {
          if (prevGuess.length === 5) {
            return prevGuess;
          } else {
            return prevGuess + String.fromCharCode(asci).toLowerCase();
          }
        });
      } else if (asci === 13) {
        // enter key
        setEnterKeyPressed({key: keyPressed, time: Date.now()});
      } else if (asci === 8) {
        // backspace key
        setGuess(prevGuess => {
          return prevGuess.length === 0 ? prevGuess : prevGuess.slice(0, -1);
        });
        // prevent user from going back to previous page
        e.preventDefault();
      }
    }
  }
  function toAsci(keyPressed) {
    let asci;
    if (keyPressed === "Enter") {
      asci = 13;
    } else if (keyPressed === "Del") {
      asci = 8;
    } else {
      asci = keyPressed.charCodeAt(0);
    }
    return asci;
  }
  useEffect(() => {
    if (rowNumber === 5 && correctWord !== guess) {
      setGameStats(prevGameStats => {
        const newStats = {...prevGameStats};
        newStats.played++;
        newStats.loses++;
        newStats.streak = 0;
        newStats.winrate = ((newStats.wins / newStats.played) * 100).toFixed(2);
        localStorage.setItem("played", newStats.played);
        localStorage.setItem("wins", newStats.wins);
        localStorage.setItem("loses", newStats.loses);
        localStorage.setItem("streak", newStats.streak);
        return newStats;
      });
      setTimeout(() => {
        setgameEnding({end: true, win: false});
        setRowNumber(0);
        setGuess("");
        setGuesses([]);
      }, 1800);
    } else if (correctWord === guess) {
      setGameStats(prevGameStats => {
        const newStats = {...prevGameStats};
        newStats.played++;
        newStats.wins++;
        newStats.streak++;
        newStats.winrate = ((newStats.wins / newStats.played) * 100).toFixed(2);
        if (newStats.streak > newStats.bestStreak) {
          newStats.bestStreak = newStats.streak;
          localStorage.setItem("bestStreak", newStats.bestStreak);
        }
        localStorage.setItem("played", newStats.played);
        localStorage.setItem("wins", newStats.wins);
        localStorage.setItem("loses", newStats.loses);
        localStorage.setItem("streak", newStats.streak);
        return newStats;
      });
      // win animations shake
      setTimeout(() => {
        setgameEnding({end: true, win: true});
        setRowNumber(0);
        setGuess("");
        setGuesses([]);
      }, 2500);
    }
  }, [enterKeyPressed]);
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
  }, [enterKeyPressed]);
  useEffect(() => {
    if (enterKeyPressed.key) {
      if (guess.length === 5) {
        if (WORDS.includes(guess)) {
          setGuesses(prevGuesses => {
            return [...prevGuesses, guess];
          });

          setRowNumber(prevRowNumber => {
            return prevRowNumber <= 5 ? prevRowNumber + 1 : prevRowNumber;
          });
          setGuess("");
        } else {
          setGridErrorModal({type: "Not in word list", show: true});
          setShakeRow({row: rowNumber, shake: true});
        }
      } else {
        setGridErrorModal({type: "Not enough letters", show: true});
        setShakeRow({row: rowNumber, shake: true});
      }
    }
  }, [enterKeyPressed]);

  useEffect(() => {
    if (shakeRow.shake) {
      const timeout = setTimeout(() => {
        setShakeRow({row: null, shake: false});
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [shakeRow]);

  return (
    <main>
      <WordsGrid
        correctWord={correctWord}
        guess={guess}
        rowNumber={rowNumber}
        gridErrorModal={gridErrorModal}
        setGridErrorModal={setGridErrorModal}
        shakeRow={shakeRow}
        gameEnding={gameEnding}
      />
      <Keyboard
        handleKeyInput={handleKeyInput}
        guesses={guesses}
        correctWord={correctWord}
        rowNumber={rowNumber}
        gameEnding={gameEnding}
      />
      {gameEnding.end &&
        createPortal(
          <EndGameModal
            win={gameEnding.win}
            word={correctWord}
            setnewWord={setnewWord}
            setgameEnding={setgameEnding}
            gameStats={gameStats}
          />,
          document.body
        )}
    </main>
  );
};

export default Game;
