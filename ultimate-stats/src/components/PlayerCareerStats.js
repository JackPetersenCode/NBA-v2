import '../App.css';
import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import hoop from "../apis/hoop";


const PlayerCareerStats = ({ playerId, selectedPlayer, selectedSeason, seasonsData }) => {

    const [tableData, setTableData] = useState([]);
    const [careerArray, setCareerArray] = useState([]);
    console.log(playerId)
    console.log(seasonsData)
    
    let columns = [];

    useEffect(() => {
        const getCareerStats = async() => {
            let arr = [];
            console.log(seasonsData)
            let truefalse = false;
            for (let i = 0; i < seasonsData.length; i++) {
                let results = await hoop.get(`/api/boxScoresTraditional/averages/${playerId.player_id}/${seasonsData[i].season}`);
                console.log(results)
                if (results.data.length > 0) {
                    results.data[0]["season"] = seasonsData[i].season;
                    arr.push(results.data[0]);
                    console.log(arr);
                }
                if (i === seasonsData.length - 1) {
                    truefalse = true;
                }
            }
            if (truefalse) {
                setCareerArray(arr);
                console.log(careerArray[0]);
            }

        }
        if (playerId && seasonsData) {
            console.log('ya')
            getCareerStats();
        }
    }, [playerId])

    columns = [
        { label: "SEASON", accessor: "season" },
        { label: "TEAM", accessor: "team" },
        { label: "MIN", accessor: "min" },
        { label: "PTS", accessor: "pts" },
        { label: "FGM", accessor: "fgm" },
        { label: "FGA", accessor: "fga" },
        { label: "FG PCT", accessor: "fg_pct" },
        { label: "FG3M", accessor: "fg3m" },
        { label: "FG3A", accessor: "fg3a" },
        { label: "FG3 PCT", accessor: "fg3_pct" },
        { label: "FTM", accessor: "ftm" },
        { label: "FTA", accessor: "fta" },
        { label: "FT PCT", accessor: "ft_pct" },
        { label: "OREB", accessor: "oreb" },
        { label: "DREB", accessor: "dreb" },
        { label: "REB", accessor: "reb" },
        { label: "AST", accessor: "ast" },
        { label: "STL", accessor: "stl" },
        { label: "BLK", accessor: "blk" },
        { label: "TO", accessor: "to" },
        { label: "+/-", accessor: "+/-" },
    ];

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...careerArray].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;
          let nonNumeric = ['player_id', 'player_name', 'team_id', 'team_abbreviation'];
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
         setTableData(sorted);
        }
    };

    return (
        <table className="ultimate">
        <caption>
         Please allow a moment for stats to load...
        </caption>
            <TableHead columns={columns} handleSorting={handleSorting} smallHeaders={true}/>
            <TableBody columns={columns} tableData={careerArray} />
        </table>
    )
}

export default PlayerCareerStats;
