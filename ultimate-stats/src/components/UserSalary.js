import React, { useEffect, useState } from "react";
import '../App.css';


const UserSalary = ({ roster, teamSalary, setTeamSalary, deletePlayer }) => {

    return (
        <div className="teamSalary">
            Current roster salary:<span className="money-span">{" $" + teamSalary}</span>
        </div>
    )
}

export default UserSalary;