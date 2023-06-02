import React, { useEffect, useState } from "react";
import '../App.css';



const ComputerTeamName = ({ cpuRoster, cpuName, setCpuName }) => {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    let names = [
        "Seattle Soggy Sox",
        "Louisville Daffodils",
        "Las Vegas Waterparks",
        "Montreal Basketballs",
        "Quebec Body-Surfers",
        "St. Louis Lagers",
        "Mexico City Glaciers",
        "Albuquerque Mountain Goats"
    ]

    useEffect(() => {
        const getCpuName = async() => {
            setCpuName(names[getRandomInt(0, names.length)])
        }
        if (cpuRoster.length === 10) {
            getCpuName();
        }
    }, [cpuRoster])

    return (
        <>
            <h2 className="cpu-team-name">
                {cpuName ? cpuName : ''}
            </h2>
        </>
    )
}

export default ComputerTeamName;