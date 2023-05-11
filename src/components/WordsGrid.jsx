import React, {useState, useEffect} from "react";
import LetterBox from "./Letterbox";
import GridErrorModal from "./modals/GridErrorModal";
const WordsGrid = props => {
  const {
    correctWord,
    guess,
    rowNumber,
    gridErrorModal,
    setGridErrorModal,
    shakeRow,
  } = props;

  const [row, setRow] = useState([
    <LetterBox key={1} />,
    <LetterBox key={2} />,
    <LetterBox key={3} />,
    <LetterBox key={4} />,
    <LetterBox key={5} />,
  ]);
  const [gridBox, setGridBox] = useState([row, row, row, row, row, row]);
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setRow(prevval => {
        const newgrid = [...prevval];
        newgrid[i] = <LetterBox letter={guess[i] ? guess[i] : null} key={i} />;
        return newgrid;
      });
    }
  }, [guess]);

  useEffect(() => {
    if (rowNumber < 6) {
      setGridBox(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[rowNumber] = row;
        return newGrid;
      });
    }
  }, [row]);

  useEffect(() => {
    if (rowNumber <= 6) {
      setGridBox(prevGrid => {
        const newgrid = [...prevGrid];
        const newrow = row.flatMap((letter, index) => {
          if (correctWord.includes(letter.props.letter)) {
            if (correctWord[index] === letter.props.letter) {
              return {
                letter: letter.props.letter,
                correct: true,
                rightSpot: true,
              };
            } else {
              return {
                letter: letter.props.letter,
                correct: true,
                rightSpot: false,
              };
            }
          } else {
            return {
              letter: letter.props.letter,
              correct: false,
              rightSpot: false,
            };
          }
        });
        newgrid[rowNumber - 1] = newrow.map((letterInfo, index) => {
          if (letterInfo.correct) {
            if (letterInfo.rightSpot) {
              return (
                <LetterBox
                  letter={letterInfo.letter}
                  correctSpot={true}
                  wrongSpot={false}
                  key={index}
                />
              );
            } else {
              return (
                <LetterBox
                  letter={letterInfo.letter}
                  correctSpot={false}
                  wrongSpot={true}
                  key={index}
                />
              );
            }
          } else {
            return (
              <LetterBox
                letter={letterInfo.letter}
                wrongLetter={true}
                key={index}
              />
            );
          }
        });
        setRow([
          <LetterBox key={1} />,
          <LetterBox key={2} />,
          <LetterBox key={3} />,
          <LetterBox key={4} />,
          <LetterBox key={5} />,
        ]);
        return newgrid;
      });
    }
  }, [rowNumber]);
  useEffect(() => {
    if (gridErrorModal.show) {
      const timeout = setTimeout(() => {
        setGridErrorModal({type: "", show: false});
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [gridErrorModal]);

  return (
    <section className="words-grid">
      {gridBox.map((row, index) => {
        return (
          <div
            className={`grid-row ${
              shakeRow.row === index && shakeRow.shake ? "shake-row" : ""
            }`}
            key={index}
          >
            {row.map(letter => {
              return letter;
            })}
          </div>
        );
      })}
      {gridErrorModal.show && <GridErrorModal type={gridErrorModal.type} />}
    </section>
  );
};

export default WordsGrid;
