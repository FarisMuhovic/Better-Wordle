const LetterBox = props => {
  const {letter, correctSpot, wrongSpot, wrongLetter} = props;

  return (
    <div
      className={`letter-box ${letter ? "full" : "full-out"} ${
        correctSpot ? "correct-spot" : ""
      }${wrongSpot ? "wrong-spot" : ""}${wrongLetter ? "neither" : ""}`}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
