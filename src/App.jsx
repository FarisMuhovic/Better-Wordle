import React, {useState, useEffect} from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import LetterGrid from "./components/LetterGrid";
import Sidebar from "./components/Sidebar";
import Keyboard from "./components/Keyboard";
import {WORDS} from "../public/WORDS";
import TestGrid from "./components/Game";

function App() {
  // const [gridErrorModal, setGridErrorModal] = useState({type: "", show: false});

  // const [rowNumber, setRowNumber] = useState(0);
  // const [letterNumber, setLetterNumber] = useState(0);

  const [correctWord, setCorrectWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  console.log(correctWord);

  // const [keyPressed, setKeyPressed] = useState({key: "", time: ""});
  // const [letter, setLetter] = useState("");

  // useEffect(() => {
  //   const key = keyPressed.key;
  //   if (key >= 65 && key <= 90) {
  //     setGuess(prevval => {
  //       if (prevval.length === 5) {
  //         return prevval;
  //       } else {
  //         return prevval + String.fromCharCode(key);
  //       }
  //     });
  //     // setLetter(String.fromCharCode(key).toLowerCase());
  //     // setLetterNumber(prevval => {
  //     //   return prevval === 5 ? prevval : prevval + 1;
  //     // });
  //   }
  //   if (key === 13) {
  //     // enter key
  //     if (guess.length === 5 && letterNumber === 5) {
  //       if (WORDS.includes(guess.toLowerCase())) {
  //         if (rowNumber < 5) {
  //           // setGridErrorModal({type: "Next row", show: true});
  //           // setTimeout(() => {
  //           //   setGridErrorModal({type: "", show: false});
  //           // }, 3000);
  //         }
  //         setRowNumber(prevval => prevval + 1);
  //         setGuess("");
  //         setLetterNumber(0);
  //         if (guess.toLowerCase() === correctWord) {
  //           console.log("you won,word is found");
  //           // display modals for win
  //         }
  //       } else {
  //         // setGridErrorModal({type: "Not in word list", show: true});
  //         // setTimeout(() => {
  //         //   setGridErrorModal({type: "", show: false});
  //         // }, 3000);
  //       }
  //       if (rowNumber === 6 && guess.toLowerCase() !== correctWord) {
  //         // game over
  //         console.log("game over");
  //       }
  //     } else {
  //       // setGridErrorModal({type: "Not enough letters", show: true});
  //       // setTimeout(() => {
  //       //   setGridErrorModal({type: "", show: false});
  //       // }, 3000);
  //     }
  //   }
  //   if (key === 8) {
  //     // backspace key
  //     setGuess(prevval => {
  //       return prevval.length === 0 ? prevval : prevval.slice(0, -1);
  //     });
  //     setLetterNumber(prevval => {
  //       return prevval === 0 ? prevval : prevval - 1;
  //     });
  //     setLetter("");
  //   }
  // }, [keyPressed]);
  // function handleKeyInput(keyPressed, e) {
  //   const asci =
  //     typeof keyPressed === "string" ? toAsci(keyPressed) : keyPressed;

  //   if (asci >= 65 && asci <= 90) {
  //     setGuess(prevGuess => {
  //       if (prevGuess.length === 5) {
  //         return prevGuess;
  //       } else {
  //         return prevGuess + String.fromCharCode(asci);
  //       }
  //     });
  //   }
  //   // if (asci === 8) {
  //   //   // prevents the user from going back in browser history
  //   //   e.preventDefault();
  //   // }
  //   // setKeyPressed({key: asci, time: Date.now()});
  // }
  // function toAsci(keyPressed) {
  //   let asci;
  //   if (keyPressed === "Enter") {
  //     asci = 13;
  //   } else if (keyPressed === "Del") {
  //     asci = 8;
  //   } else {
  //     asci = keyPressed.charCodeAt(0);
  //   }
  //   return asci;
  // }
  // const [keyboardColors, setkeyboardColors] = useState([]);
  // function updatekeyboardColors(key, correct) {
  //   setkeyboardColors(prevval => {
  //     return [
  //       ...prevval,
  //       {
  //         key: key,
  //         color: correct === "correct-key" ? "correct-key" : "wrong-spot-key",
  //       },
  //     ];
  //   });
  // }

  return (
    <>
      {/* <Sidebar /> */}
      {/* <LetterGrid
        letter={letter}
        letterNumber={letterNumber}
        rowNumber={rowNumber}
        guess={guess}
        correctWord={correctWord}
        updatekeyboardColors={updatekeyboardColors}
        // gridErrorModal={gridErrorModal}
      /> */}
      <BackgroundGrid />
      <TestGrid correctWord={correctWord} />
      {/* <Keyboard
        handleKeyInput={handleKeyInput}
        keyboardColors={keyboardColors}
      /> */}
    </>
  );
}
export default App;
