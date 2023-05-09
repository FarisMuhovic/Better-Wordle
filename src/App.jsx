import React, {useState, useEffect} from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import Sidebar from "./components/Sidebar";
import {WORDS} from "../public/WORDS";
import TestGrid from "./components/Game";

function App() {
  const [correctWord, setCorrectWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  console.log(correctWord);

  return (
    <>
      {/* <Sidebar /> */}
      <BackgroundGrid />
      <TestGrid correctWord={correctWord} />
    </>
  );
}
export default App;
