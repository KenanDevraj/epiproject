import React, { useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Logo from "./Components/epi.jpg"
import defaultData from "./employees.json";
import displayResults from "./Components/Search";

/**
* Root function where all Components are rendered
*/

function App() {
  const [currentData, setData] = useState(defaultData);
  /**
  * Bubble sort algorithm to sort salaries Lowest -> Highest
  */
  function sortByLowest(currentData)
  {
    const arr = Array.from(currentData);
    let len = currentData.length;
    for (let i = 0; i < len-1; i++) { 
      for (let j = 0; j < len-1; j++) {
        if (arr[j].salary > arr[j + 1].salary) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    setData(arr)
  }
  /**
  * Bubble sort algorithm to sort salaries Lowest -> Highest
  */
  function sortByHighest(currentData) {

    const arr = Array.from(currentData);
    let len = currentData.length;
    for (let i = 0; i < len - 1; i++) { 
      for (let j = 0; j < len - 1; j++) {
        if (arr[j].salary < arr[j + 1].salary) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    setData(arr)
  }
  return (
    <div className="App">
      <img src={Logo} />
      <Search />
      <div className="buttonContainer">
        <button class="button-27" onClick={() => {
          sortByLowest(currentData)
          displayResults()
        }}>
          Sort by Lowest Earning
        </button>

        <button class="button-27" onClick={() => {
          sortByHighest(currentData)
          displayResults()
        }}>
          Sort by Highest Earning
        </button>

      </div>
      <Results input={currentData}/>
    </div>
  );
}

export default App;
