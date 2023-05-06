const Keyboard = ({handleKeyInput}) => {
  function keyClick(e){
    handleKeyInput(e.target.innerText, e);
  }
  return (
    <div className="keyboard">
      <div className="first-row">
        <button className="keyboard-button" onClick={keyClick}>q</button>
        <button className="keyboard-button" onClick={keyClick}>w</button>
        <button className="keyboard-button" onClick={keyClick}>e</button>
        <button className="keyboard-button" onClick={keyClick}>r</button>
        <button className="keyboard-button" onClick={keyClick}>t</button>
        <button className="keyboard-button" onClick={keyClick}>y</button>
        <button className="keyboard-button" onClick={keyClick}>u</button>
        <button className="keyboard-button" onClick={keyClick}>i</button>
        <button className="keyboard-button" onClick={keyClick}>o</button>
        <button className="keyboard-button" onClick={keyClick}>p</button>
      </div>
      <div className="second-row">
        <button className="keyboard-button" onClick={keyClick}>a</button>
        <button className="keyboard-button" onClick={keyClick}>s</button>
        <button className="keyboard-button" onClick={keyClick}>d</button>
        <button className="keyboard-button" onClick={keyClick}>f</button>
        <button className="keyboard-button" onClick={keyClick}>g</button>
        <button className="keyboard-button" onClick={keyClick}>h</button>
        <button className="keyboard-button" onClick={keyClick}>j</button>
        <button className="keyboard-button" onClick={keyClick}>k</button>
        <button className="keyboard-button" onClick={keyClick}>l</button>
      </div>
      <div className="third-row">
        <button className="keyboard-button del" onClick={keyClick}>Del</button>
        <button className="keyboard-button" onClick={keyClick}>z</button>
        <button className="keyboard-button" onClick={keyClick}>x</button>
        <button className="keyboard-button" onClick={keyClick}>c</button>
        <button className="keyboard-button" onClick={keyClick}>v</button>
        <button className="keyboard-button" onClick={keyClick}>b</button>
        <button className="keyboard-button" onClick={keyClick}>n</button>
        <button className="keyboard-button" onClick={keyClick}>m</button>
        <button className="keyboard-button enter" onClick={keyClick}>Enter</button>
      </div>
    </div>
  );
};

export default Keyboard;
