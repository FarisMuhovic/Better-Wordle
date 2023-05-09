import React, {useState, useEffect} from "react";
import {WORDS} from "../../public/WORDS";
import WordsGrid from "./WordsGrid";
import Keyboard from "./Keyboard";

const Game = props => {
  const {correctWord} = props;
  const [gridErrorModal, setGridErrorModal] = useState({type: "", show: false});
  const [shakeRow, setShakeRow] = useState({row: 0, shake: false});
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
          if (rowNumber === 5 && correctWord !== guess) {
            console.log("game over");
          } else if (correctWord === guess) {
            console.log("correct word");
          }
          console.log("in word list");
          setRowNumber(prevRowNumber => {
            return prevRowNumber <= 5 ? prevRowNumber + 1 : prevRowNumber;
          });
          setGuess("");
        } else if (correctWord === guess) {
          console.log("correct word");
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
  console.log(shakeRow);
  return (
    <main>
      <WordsGrid
        correctWord={correctWord}
        guess={guess}
        rowNumber={rowNumber}
        gridErrorModal={gridErrorModal}
        setGridErrorModal={setGridErrorModal}
        shakeRow={shakeRow}
        setShakeRow={setShakeRow}
      />
      <Keyboard handleKeyInput={handleKeyInput} />
    </main>
  );
};

export default Game;
