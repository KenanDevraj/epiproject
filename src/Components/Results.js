import "./Results.css";
import contact from "./contact.png";
import arrow from "./mediumArrow.png"
import React from "react";


/**
 * Person object- represents an individual in this company
 */
function Person(n, s, b, num, sal, rol, rep, child) {
    this.name = n;
    this.surname = s;
    this.birth = b;
    this.empNum = num;
    this.salary = sal;
    this.role = rol;
    this.repLine = rep;
    this.children = child;
}
/**
 * Declare arrays to store Persons in arrays
 */



function Results(input) {
 /**
 * Retrieve data from database
 */
    let data = input.input
    var managers = []
    var employees = []
    var trainees = []
   
    //Populate Trainee array from "Database"
    for (let i = 0; i < data.length; i++) {
        if (data[i].role === "Trainee") {
            trainees.push(new Person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
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
            employees.push(new Person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
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
            managers.push(new Person(data[i].name, data[i].surname, data[i].birth, data[i].empNum,
                data[i].salary, data[i].role, data[i].repLine, managersEmps))
        }
    }
/**
 * Render the data in the arrays populated above
 */
    return (
        <div className="displayResults">
            <ul className="managerList" id="managerList">
                <h1>Managers</h1>
                {managers.map((manager) => {
                    return (
                        <div>
                            <li><p onClick={() => { updateResults(manager); }} title={[manager.salary, manager.birth]} className="managerChip"><img src={contact} alt="IMG not found!" />{manager.empNum} - [{manager.role}] {manager.name} {manager.surname} {manager.birth} R{manager.salary}</p>
                                {manager.children.map((e) => {
                                    return (
                                        <div id={e.empNum} className="manEmployees">
                                            <img className="arrow" src={arrow} alt="IMG not found!" /><p title={e.salary} className="empChip"><img src={contact} alt="IMG not found!" />{e.empNum} -[{e.role}] {e.name} {e.surname} {e.birth} R{e.salary}</p>
                                            {e.children.map((t) => {                                         
                                                return (
                                                    <div className="manEmployees">
                                                        <img className="arrow" src={arrow} alt="IMG not found!" /> <p title={t.salary} className="traineeChip"><img src={contact} alt="IMG not found!" />{t.empNum} - [{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p>
                                                    </div>
                                                )})}
                                        </div>
                                    )})}
                            </li>
                        </div>
                    )})}
            </ul>
            <ul className="employeeList" id="employeeList">
                <h1>Employees</h1>

                {employees.map((em) => {
                    return (
                        <div>
                            <li  ><p onClick={() => { updateResults(em); }} title={[em.salary, em.birth]} className="empChip2"><img src={contact} alt="IMG not found!" />{em.empNum} - [{em.role}] {em.name} {em.surname} {em.birth} R{em.salary}</p>

                                {em.children.map((t) => {
                                    let uniqueID = "EMP" + t.empNum
                                    return (
                                        <div id={uniqueID} className="manEmployees" >
                                            <img className="arrow" src={arrow} alt="IMG not found!" /><p title={t.salary} className="traineeChip"><img src={contact} alt="IMG not found!" />{t.empNum} - [{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p>
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
                <h1>Trainees</h1>

                {trainees.map((t) => {                   
                    return (
                        <div>
                            <li><p title={[t.salary, t.birth]} className="traineeChip"><img src={contact} alt="IMG not found!" />{t.empNum} - [{t.role}] {t.name} {t.surname} {t.birth} R{t.salary}</p></li>
                        </div>
                    )
                }
                )}
            </ul>
            <h2>[NO ENTRIES FOUND]</h2>
        </div>
    );
}

export default Results;
/**
* Update data when Dropdowns are clicked on
*/
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