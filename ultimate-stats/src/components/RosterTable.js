import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";
import TeamName from "./TeamName";


const RosterTable = ({ roster, setRoster, teamSalary, setTeamSalary, deletePlayer }) => {
    
    let columns = ['ROSTER']

    return (
        <div>
            <table>
                <TableBody columns={columns} tableData={roster.map(player => player.substring(player.indexOf('|') + 1))} deletePlayer={deletePlayer} />
            </table>
        </div>

    )
}

export default RosterTable;
