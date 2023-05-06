import React, {useState, useEffect} from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import LetterGrid from "./components/LetterGrid";
import Navbar from "./components/Navbar";
import Keyboard from "./components/Keyboard";
import {WORDS} from "../public/WORDS";

function App() {
  const [rowNumber, setrowNumber] = useState(0);
  const [letterNumber, setletterNumber] = useState(0);

  const [guess, setguess] = useState("");
  const [correctWord, setcorrectWord] = useState();
  useEffect(() => {
    setcorrectWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  console.log("CORRECT WORD:", correctWord);
  console.log("rowNumber:", rowNumber);
  console.log("letterNumber:", letterNumber);
  console.log("guess:", guess);

  const [keyPressed, setkeyPressed] = useState({key: "", time: ""});
  const [letter, setletter] = useState("");
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
  useEffect(() => {
    const key = keyPressed.key;
    if (key >= 65 && key <= 90) {
      setguess(prevval => {
        if (prevval.length === 5) {
          return prevval;
        } else {
          return prevval + String.fromCharCode(key);
        }
      });
      setletter(String.fromCharCode(key).toLowerCase());
      setletterNumber(prevval => {
        return prevval === 5 ? prevval : prevval + 1;
      });
    }
    if (key === 13) {
      // enter key
      if (guess.length === 5 && letterNumber === 5) {
        if (WORDS.includes(guess.toLowerCase())) {
          setrowNumber(prevval => prevval + 1);
          setguess("");
          setletterNumber(0);
          // if word is correct end the game
          // or if ther user failed to guess the word after 6 rows
        } else {
          // wrong word
          console.log("word not found");
        }
      } else {
        // insufficient letters
        console.log("insufficient letters");
      }
    }
    if (key === 8) {
      // backspace key
      setguess(prevval => {
        return prevval.length === 0 ? prevval : prevval.slice(0, -1);
      });
      setletterNumber(prevval => {
        return prevval === 0 ? prevval : prevval - 1;
      });
      setletter("");
    }
  }, [keyPressed]);
  function handleKeyInput(keyPressed, e) {
    const asci =
      typeof keyPressed === "string" ? toAsci(keyPressed) : keyPressed;
    if (asci === 8) {
      // prevents the user from going back in browser history
      e.preventDefault();
    }
    setkeyPressed({key: asci, time: Date.now()});
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
  return (
    <>
      <BackgroundGrid />
      <Navbar />
      <LetterGrid
        letter={letter}
        letterNumber={letterNumber}
        rowNumber={rowNumber}
        guess={guess}
        correctWord={correctWord}
      />
      <Keyboard handleKeyInput={handleKeyInput} />
    </>
  );
}
export default App;
