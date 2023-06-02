import React, { useEffect, useState } from "react";
import '../App.css';



const ComputerSalary = ({ cpuRoster }) => {

    return (
        <div className="teamSalary">
            <span>Cpu:</span>
            <br></br>
            {cpuRoster.length === 10 ? "$35" : "$0"}
        </div>
    )
}

export default ComputerSalary;