import axios from "axios";
import Dropdown from "../components/Dropdown"
import React, { useEffect, useState } from "react";
import TeamsDropdown from "../components/TeamsDropdown";
import Jackarithm from "../pages/jack-o-rithm";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import hoop from "../apis/hoop";


const Schedule = ({ selectedSeason, setSelectedSeason, scheduleData, setScheduleData}) => {

    useEffect(() => {
        const getSchedule = async() => {
            let schedule = await hoop.get(`/api/leagueGames/frontSchedule/${selectedSeason}`)
            console.log(schedule.data)
            setScheduleData(schedule.data);
        }
        if (selectedSeason) {
            getSchedule();
        }
    }, [selectedSeason])

    let columns = [
        {label: 'GAME ID', accessor: 'game_id'},
        {label: 'MATCHUP', accessor: 'matchup'},
        {label: 'WIN/LOSS', accessor: 'wl'},
        {label: 'GAME DATE', accessor: 'game_date'},
        {label: 'POINTS', accessor: 'pts'},
        {label: '+/-', accessor: 'plus_minus'},
    ]

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...scheduleData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;
          let nonNumeric = ['player_id', 'player_name', 'team_id', 'team_abbreviation', 'matchup', 'wl', 'game_date', 'game_id'];
          if (!nonNumeric.includes(sortField)) {
            if (typeof a[sortField] === 'string') {
                a[sortField] = parseFloat(a[sortField]);
            }
            if (typeof b[sortField] === 'string') {
                b[sortField] = parseFloat(b[sortField]);
            }
            a[sortField] = a[sortField].toFixed(2);
            b[sortField] = b[sortField].toFixed(2);            
          }
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "desc" ? 1 : -1)
          );
         });
         setScheduleData(sorted);
        }
    };

    return (
        <>
            <table className="ultimate">
                <caption>
                 {selectedSeason} NBA Schedule
                </caption>
                <TableHead columns={columns} handleSorting={handleSorting}/>
                {scheduleData.length > 0 ? <TableBody columns={columns} tableData={scheduleData} /> : <tbody><tr><td>{'Select Season'}</td></tr></tbody>}
            </table>
        </>
    )
}

export default Schedule;