import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Logo from "./Components/epi.jpg"

/**
* Root function where all Components are rendered
*/

function App() {
  return (
    <div className="App">
      <img src={Logo} />
      <Search />
      <Results />
    </div>
  );
}

export default App;
