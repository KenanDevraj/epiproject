import "./Results.css";
import contact from "./contact.png";
import arrow from "./mediumArrow.png"
import React, { useState } from "react";
import e from ".././employees.json";


function person(n, s, b, num, sal, rol, rep, child) {
    this.name = n;
    this.surname = s;
    this.birth = b;
    this.empNum = num;
    this.salary = sal;
    this.role = rol;
    this.repLine = rep;
    this.children = child;
}
var managers = []
var employees = []
var trainees = []






function Results() {

    const [data] = useState(e);
    const [m, setManangers] = useState([]);
    const [em, setEmployees] = useState([]);
    const [t, setTrainees] = useState([]);
    managers = []
    employees = []
    trainees = []
    populateArrays(data);

    //    setTrainees(trainees);
    //    console.log(t)


    // setTrainees(trainees)


    return (
        <div className="displayResults">

            <ul className="managerList" id="managerList">
                <h1>Managers</h1>
                {managers.map((manager) => {
                    return (

                        <div >
                            <li><p onClick={() => { updateResults(manager); }} title={manager.salary} className="managerChip"><img src={contact} />[{manager.role}] {manager.name} {manager.surname} {manager.birth} R{manager.salary}</p>
                                {manager.children.map((e) => {

                                    return (
                                        <div id={e.empNum} className="manEmployees">
                                            <img className="arrow" src={arrow} /><p title={e.salary} className="empChip"><img src={contact} />[{e.role}] {e.name} {e.surname} {e.birth} R{e.salary}</p>

                                            {e.children.map((t) => {
                                                {/* let uniqueID = "MANEMP" + t.empNum         */ }
                                                return (
                                                    <div className="manEmployees">
                                                        <img className="arrow" src={arrow} /> <p title={t.salary} className="traineeChip"><img src={contact} />[{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p>
                                                    </div>
                                                )

                                            })
                                            }
                                        </div>
                                    )

                                })
                                }
                            </li>
                        </div>
                    )
                }

                )}
            </ul>
            <ul className="employeeList" id="employeeList">
                <h1 >Employees</h1>

                {employees.map((em) => {
                    return (
                        <div>
                            <li  ><p onClick={() => { updateResults(em); }} title={em.salary} className="empChip"><img src={contact} />[{em.role}] {em.name} {em.surname} {em.birth} R{em.salary}</p>

                                {em.children.map((t) => {
                                    let uniqueID = "EMP" + t.empNum
                                    return (
                                        <div id={uniqueID} className="manEmployees" >
                                            <img className="arrow" src={arrow} /><p title={t.salary} className="traineeChip"><img src={contact} />[{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p>
                                        </div>
                                    )

                                }

                                )}
                            </li>
                        </div>
                    )
                }
                )}
            </ul>
            <ul className="traineeList" id="traineeList">
                <h1>TRAINEES</h1>

                {trainees.map((t) => {

                    return (
                        <div>
                            <li><p title={[t.salary, t.birth]} className="traineeChip"><img src={contact} />[{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p></li>
                        </div>
                    )
                }
                )}
            </ul>

            <div>
                <button onClick={() => {
                    console.log("HEllo");
                    console.log(t);
                    //  setTrainees(trainees)
                }}>
                    Sort by Highest Earning
                </button>

                <button onClick={() => { sortDataDec(); }}>
                    Sort by Lowest Earning
                </button>
            </div>

        </div>


    );


}

export default Results;


function updateResults(clickedObject) {
    let temp = ""

    if (clickedObject.role === "Employee") {
        temp = "EMP";
    }

    for (let a = 0; a < clickedObject.children.length; a++) {
        let hideDiv = document.getElementById(temp + clickedObject.children[a].empNum)
        if (hideDiv.style.display !== "none") {
            hideDiv.style.display = "none";
        } else hideDiv.style.display = "";



    }

}

function populateArrays(data) {
    //Populate Trainee array from "Database"
    for (let i = 0; i < data.length; i++) {
        if (data[i].role === "Trainee") {
            trainees.push(new person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
                data[i].salary, data[i].role, data[i].repLine, null))
        }

    }
    //Populate Employee array from "Database"
    for (let i = 0; i < data.length; i++) {
        if (data[i].role === "Employee") {

            let empsTrainees = []
            for (let j = 0; j < trainees.length; j++) {
                if (data[i].empNum === trainees[j].repLine) {
                    empsTrainees.push(trainees[j])
                }
            }
            employees.push(new person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
                data[i].salary, data[i].role, data[i].repLine, empsTrainees))

        }
    }
    //Populate Manager array from "Database"
    for (let i = 0; i < data.length; i++) {
        if (data[i].role === "Manager") {
            let managersEmps = []
            for (let j = 0; j < employees.length; j++) {
                if (employees[j].role === "Employee" && employees[j].repLine === data[i].empNum) {
                    managersEmps.push(employees[j])
                }
            }
            managers.push(new person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
                data[i].salary, data[i].role, data[i].repLine, managersEmps))
        }
    }
}

function sortDataAce(traineesArr, setTrainees) {
    console.log(traineesArr[0].name)
    traineesArr[0].name = "HELLO"
    console.log(traineesArr[0].name)
    setTrainees(traineesArr)
    // for (let i = 0; i < managerArray.length; i++) {
    //     for (let j = 0; j < managerArray.length; j++) {

    //         if (parseInt(managerArray[j].salary) > parseInt(managerArray[j+1].salary)) {
    //             //     console.log(managerArray[j+1].salary)
    //             //     // let tmp = managerArray[j].salary;
    //             //     // managerArray[j].salary = managerArray[j + 1].salary;
    //             //     // managerArray[j + 1].salary = tmp;




}


function sortDataDec() {
    console.log(managers)
    console.log(employees)
    console.log(trainees)



}


function reloadWindow() {
    if (!window.location.hash) {
        // window.location = window.location + '#loaded';

    }
}



//TABLE OF ENTRIES

{/* <div class="displayResults">
    <table class="content">
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Date of Birth</th>
                <th>Employee No.</th>
                <th>Salary</th
                <th>Role</th>
                <th>Reporting Line</th>
            </tr>
        </thead>
        <tbody>

            {managers.map((value) => {
                return (
                    <tr>
                        <td>{value.name}</td>
                        <td>{value.surname}</td>
                        <td>{value.birth}</td>

                    </tr>


                )
            })}


        </tbody>
    </table>
</div> */}
