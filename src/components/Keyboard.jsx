import React, {useState, useEffect} from "react";
const Keyboard = ({handleKeyInput, guesses, correctWord, rowNumber}) => {
  function keyClick(e) {
    handleKeyInput(e.target.innerText, e);
  }
  const [keyboardColors, setKeyboardColors] = useState(new Set());
  useEffect(() => {
    if (guesses.length > 0) {
      for (let i = 0; i < correctWord.length; i++) {
        if (guesses[rowNumber - 1][i] === correctWord[i]) {
          setKeyboardColors(prev => {
            const newSet = new Set(prev);
            newSet.add(
              JSON.stringify({
                key: guesses[rowNumber - 1][i],
                color: "correct-key",
                time: Date.now(),
              })
            );
            return newSet;
          });
        } else if (correctWord.includes(guesses[rowNumber - 1][i])) {
          setKeyboardColors(prev => {
            const newSet = new Set(prev);
            newSet.add(
              JSON.stringify({
                key: guesses[rowNumber - 1][i],
                color: "wrong-spot-key",
                time: Date.now(),
              })
            );
            return newSet;
          });
        } else {
          setKeyboardColors(prev => {
            const newSet = new Set(prev);
            newSet.add(
              JSON.stringify({
                key: guesses[rowNumber - 1][i],
                color: "neither-key",
                time: Date.now(),
              })
            );
            return newSet;
          });
        }
      }
    }
  }, [guesses]);

  const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  const renderRowKeys = row => {
    const getColor = letter => {
      const colorObjArray = Array.from(keyboardColors)
        .map(colorObj => JSON.parse(colorObj))
        .filter(colorObj => colorObj.key === letter)
        .sort((a, b) => b.time - a.time); // Sort by descending timestamp

      const latestColor = colorObjArray.length != 0 ? colorObjArray[0] : "";

      if (latestColor.color === "right-spot") {
        return "right-spot"; // Keep the "right-spot" color
      }

      const wrongSpotColors = colorObjArray.filter(
        colorObj => colorObj.color === "wrong-spot"
      );
      const prevWrongSpotTime =
        wrongSpotColors.length > 0 ? wrongSpotColors[0].time : 0;

      if (
        latestColor.color === "wrong-spot" &&
        latestColor.time > prevWrongSpotTime
      ) {
        return "right-spot"; // Change the "wrong-spot" color to "right-spot"
      }

      return latestColor.color; // Keep the existing color
    };

    return row.map(letter => {
      const color = getColor(letter);

      return (
        <button
          key={letter}
          className={`keyboard-button ${color}`}
          onClick={keyClick}
        >
          {letter}
        </button>
      );
    });
  };

  return (
    <section className="keyboard">
      <div className="first-row">{renderRowKeys(firstRow)}</div>
      <div className="second-row">{renderRowKeys(secondRow)}</div>
      <div className="third-row">
        <button className={`keyboard-button`} onClick={keyClick}>
          Del
        </button>
        {renderRowKeys(thirdRow)}
        <button className="keyboard-button enter" onClick={keyClick}>
          Enter
        </button>
      </div>
    </section>
  );
};

export default Keyboard;
