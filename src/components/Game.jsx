import React, {useState, useEffect} from "react";
import {WORDS} from "../../public/WORDS";
import WordsGrid from "./WordsGrid";
import Keyboard from "./Keyboard";

const Game = props => {
  const {correctWord} = props;

  const [guess, setGuess] = useState("");
  const [rowNumber, setRowNumber] = useState(0);
  const [enterKeyPressed, setEnterKeyPressed] = useState({key: "", time: ""});

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
    if (enterKeyPressed.key) {
      if (guess.length === 5) {
        if (WORDS.includes(guess)) {
          console.log("in word list");
          setRowNumber(prevRowNumber => {
            return prevRowNumber <= 5 ? prevRowNumber + 1 : prevRowNumber;
          });
          setGuess("");
          // check letter positions
          if (rowNumber === 5) {
            console.log("game over");
          }
        } else if (correctWord === guess) {
          console.log("correct word");
        } else {
          console.log("not in word list");
        }
      } else {
        console.log("not enough letters");
      }
    }
  }, [enterKeyPressed]);

  return (
    <main>
      <WordsGrid
        correctWord={correctWord}
        guess={guess}
        rowNumber={rowNumber}
      />
      <Keyboard handleKeyInput={handleKeyInput} />
    </main>
  );
};

export default Game;
