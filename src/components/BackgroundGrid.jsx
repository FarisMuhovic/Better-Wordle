import React, {useState, useEffect} from "react";
const BackgroundGrid = () => {
  const [grid, setgrid] = useState([]);
  const [rows, setrows] = useState(0);
  const [cols, setcols] = useState(0);
  const [squareSize, setsquareSize] = useState(100);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    if (screenSize.width < 600) {
      setsquareSize(50);
    } else if (screenSize.width < 900) {
      setsquareSize(70);
    } else if (screenSize.width > 2400) {
      setsquareSize(200);
    } else {
      setsquareSize(100);
    }
    const rows = Math.floor(screenSize.height / squareSize) + 2;
    const cols = Math.floor(screenSize.width / squareSize) + 2;

    for (let i = 0; i < rows * cols; i++) {
      const randomNum = Math.random();
      setgrid(grid => [
        ...grid,
        <div className={randomNum < 0.5 ? "green-box" : "yellow-box"}></div>,
      ]);
    }
    setrows(rows);
    setcols(cols);
    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div
      className="bg-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${squareSize}px)`,
      }}
    >
      {grid}
    </div>
  );
};

export default BackgroundGrid;
