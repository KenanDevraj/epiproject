import React, { useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Logo from "./Components/epi.jpg"
import defaultData from "./employees.json";

/**
* Root function where all Components are rendered
*/

function App() {
  const [currentData, setData] = useState(defaultData);

  
  function sortInAce()
  {
    console.log("HI")
  }

  return (
    <div className="App">
      <img src={Logo} />
      <Search />
      <div>
        <button onClick={() => {
          sortInAce()
        }}>
          Sort by Highest Earning
        </button>

      </div>
      <Results input={currentData}/>
    </div>
  );
}

export default App;
