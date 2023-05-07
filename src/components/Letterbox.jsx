const LetterBox = ({letter = "", correctSpot = false, wrongSpot = false}) => {
  return (
    <div
      className={`letter-box ${
        correctSpot ? "correct-spot" : "error-modal.hide-modal "
      } ${wrongSpot ? "wrong-spot" : ""}`}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
