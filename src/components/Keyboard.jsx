const Keyboard = ({handleKeyInput, keyboardColors}) => {
  function keyClick(e) {
    handleKeyInput(e.target.innerText, e);
  }

  const firstrow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondrow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdrow = ["z", "x", "c", "v", "b", "n", "m"];

  const renderRowButtons = row => {
    return row.map(letter => {
      const color = keyboardColors.find(key => key.key === letter)?.color || "";
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
    <div className="keyboard">
      <div className="first-row">{renderRowButtons(firstrow)}</div>
      <div className="second-row">{renderRowButtons(secondrow)}</div>
      <div className="third-row">
        <button className={`keyboard-button`} onClick={keyClick}>
          Del
        </button>
        {renderRowButtons(thirdrow)}
        <button className="keyboard-button enter" onClick={keyClick}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
