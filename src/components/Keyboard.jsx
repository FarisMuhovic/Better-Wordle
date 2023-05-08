const Keyboard = ({handleKeyInput, keyboardColors}) => {
  function keyClick(e) {
    handleKeyInput(e.target.innerText, e);
  }

  const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  const renderRowKeys = row => {
    return row.map(letter => {
      // const color = keyboardColors.find(key => key.key === letter)?.color || "";
      return (
        <button
          key={letter}
          // className={`keyboard-button ${color}`}
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
