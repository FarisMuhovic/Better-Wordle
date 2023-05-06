import React, {useState, useEffect} from "react";
import LetterBox from "./Letterbox";
const LetterGrid = ({letter, letterNumber, rowNumber, correctWord}) => {
  // a grid of 6x5
  const [row, setrow] = useState([
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
  ]);
  const [gridBox, setgridBox] = useState([
    [row],
    [row],
    [row],
    [row],
    [row],
    [row],
  ]);
  useEffect(() => {
    setrow(prevval => {
      const newrow = [...prevval];
      if (letter) {
        newrow[letterNumber - 1] = <LetterBox letter={letter} />;
      } else {
        newrow[letterNumber] = <LetterBox />;
      }
      return newrow;
    });
  }, [letterNumber, letter, rowNumber]);
  useEffect(() => {
    setgridBox(prevval => {
      const newgrid = [...prevval];
      newgrid[rowNumber] = row;
      return newgrid;
    });
  }, [row]);
  useEffect(() => {
    if (rowNumber > 0) {
      setgridBox(prevval => {
        const newgrid = [...prevval];
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
        newgrid[rowNumber - 1] = newrow.map(letterInfo => {
          if (letterInfo.correct) {
            if (letterInfo.rightSpot) {
              return (
                <LetterBox
                  letter={letterInfo.letter}
                  correctSpot={true}
                  wrongSpot={false}
                />
              );
            } else {
              return (
                <LetterBox
                  letter={letterInfo.letter}
                  correctSpot={false}
                  wrongSpot={true}
                />
              );
            }
          } else {
            return (
              <LetterBox
                letter={letterInfo.letter}
                correctSpot={false}
                wrongSpot={false}
              />
            );
          }
        });
        setrow([
          <LetterBox />,
          <LetterBox />,
          <LetterBox />,
          <LetterBox />,
          <LetterBox />,
        ]);
        return newgrid;
      });
    }
  }, [rowNumber]);

  return (
    <div className="letter-grid">
      {gridBox.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map(letter => {
              return letter;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default LetterGrid;
