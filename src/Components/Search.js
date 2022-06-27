import React, { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

import "./Search.css";

let min, max, minA, maxA
let currDate;

function Search() {

    const [dateState, setDateState] = useState(new Date())
    currDate = dateState
    const changeDate = (e) => {
        setDateState(e)
        currDate = e
        displayResults()
       
        
    }
    
/**
* Use states to update the UI of the range selectors
*/
  

    const [minValue, onMinChange] = useState(0);
    const [maxValue, onMaxChange] = useState(100);
    const [minAge, onMinAge] = useState(0);
    const [maxAge, onMaxAge] = useState(100);
    min = minValue
    max = maxValue
    minA=minAge
    maxA=maxAge

        return (
            <div>
                <input className="search" id="userInput" type="text" onKeyUp={displayResults} placeholder="Search..." />
                <div className="roleSelectorBlock">
                    <b>Filter by Role:</b>
                    <select onChange={({ target: { value: radius } }) => {
                        // console("Hello WORld")
                         displayResults();
                    }} id="roleType" className="roleSelector">
                        <option >All</option>
                        <option>Managers</option>
                        <option>Employees</option>
                        <option>Trainees</option>
                    </select>
                </div>

                <div className="dateSelectorBlock">
                    <select onChange={({ target: { value: radius } }) => {
                      
                        displayResults();
                    }} id="dateSelector" className="dateSelector">
                        <option>Disabled</option>
                        <option>Born Before</option>
                        <option>Born After</option>
                    </select>
                </div>

                <div className="salary-slider">
                    <b>Min. Salary</b>  <input type="range" min="0" max="100" value={minValue}
                        onChange={({ target: { value: radius } }) => {
                            onMinChange(radius);
                            displayResults();
                        }}
                    />
                    <div className="buble">
                        <b>R{minValue * 10000}</b>
                    </div>
                    <b>Max. Salary</b> <input type="range" min="0" max="100" value={maxValue}
                        onChange={({ target: { value: radius } }) => {
                            onMaxChange(radius);
                            displayResults();
                        }}
                    />

                    <div className="buble">
                        <b>R{maxValue * 10000}</b>
                    </div>
                </div>

                <div className="age-slider">
                    <Calendar
                        value={dateState}
                        onChange={changeDate}      
                    />
                    <p><b>{moment(dateState).format('MMMM Do YYYY')}</b></p>                  
                </div>
            </div>
        )
    

/**
* Render the Search component
*/
  
}
/**
* Update the displayed data when a user performs searches
*/
let lists = ["managerList", "employeeList", "traineeList"]
function displayResults() {

    for (let b = 0; b < lists.length; b++) {
        var input, filter, ul, li, a, i, txtValue;
        let headerFlag = false
        input = document.getElementById("userInput");
        filter = input.value.toUpperCase();

        ul = document.getElementById(lists[b]);

        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("p")[0];
            txtValue = a.textContent || a.innerText;
            let filteringValues = a.title.split(",")
            let salary = filteringValues[0]
            let birth = filteringValues[1]
            if (txtValue.toUpperCase().indexOf(filter) > -1 && checkRoleType(txtValue)
                && min * 10000 < salary && checkDate(currDate,birth)&&(max === 0 || max * 10000 > salary)) {
                li[i].style.display = "";
                headerFlag = true;
            } else {
                li[i].style.display = "none";
            }
        }

        var header = ul.getElementsByTagName("h1")[0];
        if (headerFlag) {
            header.style.display = "";
        }
        else {
            header.style.display = "none"
        }
    }

    let headers = document.getElementsByTagName("h1");
    let notFoundFlag = false;
    for(let c = 0 ; c<headers.length ; c++)
    {
        if (headers[c].style.display!=="none")
        {
            notFoundFlag = true;
        }
    }
    if(notFoundFlag)
    {
        console.log(document.getElementsByTagName("h2"))
    }

    else{
        
    }
}

function checkDate(selectedDate,empDate)
{
    // console.log(selectedDate)
    // console.log(selectedDate.getDate())
    // console.log(selectedDate.getMonth()+1)
    // console.log(selectedDate.getFullYear())

    let empDateArray = empDate.split("-");
    if (document.getElementById("dateSelector").value==="Disabled")
    {
        return true;
    }
    else if (document.getElementById("dateSelector").value === "Born Before")
    {
        if (parseInt(empDateArray[2]) < selectedDate.getFullYear() 
        // && parseInt(empDateArray[1]) < selectedDate.getMonth() + 1 &&
        //     parseInt(empDateArray[0]) < selectedDate.getDate()
            ) {
            return true;
        }
    }

    else if (document.getElementById("dateSelector").value === "Born After") {
        if (parseInt(empDateArray[2]) > selectedDate.getFullYear()
        //  &&parseInt(empDateArray[1]) > selectedDate.getMonth() + 1 &&
        //     parseInt(empDateArray[0]) > selectedDate.getDate()
            ) {
            return true;
        }
    }
    return false;
}
/**
* Update Data when a user selects a role type
*/
function checkRoleType(txtValue) {
    if (document.getElementById("roleType").value === "All") {
        return true;
    }

    else if (document.getElementById("roleType").value === "Managers") {
        if (txtValue.includes("Manager"))
            return true;
    }

    else if (document.getElementById("roleType").value === "Employees") {
        if (txtValue.includes("Employee"))
            return true;
    }

    else if (document.getElementById("roleType").value === "Trainees") {
        if (txtValue.includes("Trainee"))
            return true;
    }
    else return false;
}
export default Search




    // < div className = "age-slider" >
    //                 <b>Born After:</b>  <input type="range" min="1950" max="2005" value={minAge}
    //                     onChange={({ target: { value: radius } }) => {
    //                         onMinAge(radius);
    //                         displayResults();
    //                     }}
    //                 />
    //                 <div className="buble">
    //                     <b>{minAge}</b>
    //                 </div>

    //                 <b>Born Before:</b> <input type="range" min="1950" max="2005" value={maxAge}
    //                     onChange={({ target: { value: radius } }) => {
    //                         onMaxAge(radius);
    //                         displayResults();
    //                     }}
    //                 />

    //                 <div className="buble">
    //                     <b>{maxAge}</b>
    //                 </div>