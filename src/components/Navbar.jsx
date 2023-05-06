const Navbar = () => {
  return (
    <nav>
      <div className="icon-container">
        <i className="fa-solid fa-chart-simple"></i>
      </div>
      <h1>Better Wordle</h1>
      <div className="nav-right">
        <div className="icon-container">
          <i className="fa-solid fa-question"></i>
        </div>
        <div className="icon-container">
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
