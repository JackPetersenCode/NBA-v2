import React, { useEffect, useState } from "react";
import '../App.css';


const UserCapSpace = ({ roster, teamSalary, setTeamSalary, deletePlayer }) => {

    return (
        <div className="teamSalary">
            Cap space remaining:<span className="money-span">{" $" + (35 - teamSalary)}</span>
        </div>
    )
}

export default UserCapSpace;