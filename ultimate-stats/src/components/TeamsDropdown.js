import '../App.css';
import React, { useEffect, useState } from "react";
import hoop from "../apis/hoop";


const TeamsDropdown = ({teamsData, setTeamsData, selectedTeam, setSelectedTeam, H_or_V}) => {


    useEffect(() => {
        let isSubscribed = true;
        const getTeams = async() => {
            let teams = await hoop.get(`/api/teamnames`);
            setTeamsData(teams.data);
        } 
        getTeams();   
        return () => isSubscribed = false;
    }, [])

    function handleTeamChange(event) {
        setSelectedTeam(() => event.target.value);
        console.log(selectedTeam)
    }

    return (
        <div className="season-flex">
          <div className="drop-title">
              TEAM
          </div>
          <select className='season-select' value={selectedTeam} onChange={handleTeamChange}>
            <option value="0">All Teams</option>
      
            {teamsData.map((option, index) => (
              <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
            ))}
            
          </select>
        </div>
    );
        
};
        
export default TeamsDropdown;