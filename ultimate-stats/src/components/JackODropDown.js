import '../App.css';
import React, { useEffect, useState } from "react";

import hoop from "../apis/hoop";


const PredictionResultsTable = ({teamsH, setTeamsH, teamsV,
setTeamsV}) => {

    useEffect(() => {
        
        const getTeamsH = async() => {
            let results = await hoop.get(`/api/teamnames`);
            console.log(results.data);
            setTeamsH(results.data);
        }
        getTeamsH();
    }, [])

    useEffect(() => {
        const getTeamsV = async() => {
            let results = await hoop.get(`/api/teamnames`);
            let data = results.data
            setTeamsV(data);
        }
        if (teamsH)
            getTeamsV();
    }, [teamsH])

    
    return (
        <div>
            {teamsH.length > 0 ? teamsH[0].team_name : 'loading'}
        </div>
    )

}

export default PredictionResultsTable;