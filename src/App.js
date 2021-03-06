import React, { useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Logo from "./Components/epi.jpg"
import defaultData from "./employees.json";
import displayResults from "./Components/Search";

/**
* Root function where all Components are called and rendered
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
  * Bubble sort algorithm to sort salaries Highest -> Lowest
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
      <img src={Logo} alt="NOT FOUND" />
      <Search />
      <div className="buttonContainer">
        <button class="sortingButtons" onClick={() => {
          sortByLowest(currentData)
          displayResults()
        }}>
          Sort by Lowest Earning
        </button>
        <button class="sortingButtons" onClick={() => {
          sortByHighest(currentData)
          displayResults()
        }}>
          Sort by Highest Earning
        </button>
      </div>
      {/*
      * Data is passed into the Results Component and is rendered to the user
       */}
      <Results input={currentData}/>
    </div>
  );
  
}
export default App;
