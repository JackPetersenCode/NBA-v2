import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import '../App.css';
import hoop from "../apis/hoop";


const HustleTable = ({selectedSeason}) => {
    const [tableData, setTableData] = useState([]);
    
    
    let columns = [];
    useEffect(() => {
        hoop.get(`/api/statranked/hustleStats/${selectedSeason}`) // your url may look different
        .then(data => 
            setTableData(data.data)) // set data to state
    }, [selectedSeason]);
    console.log(tableData);

    columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "AGE", accessor: "age" },
        { label: "GAMES", accessor: "g" },
        { label: "MIN", accessor: "min" },
        { label: "CONTESTED SHOTS", accessor: "contested_shots" },
        { label: "CONTESTED 2PT", accessor: "contested_shots_2pt" },
        { label: "CONTESTED 3PT", accessor: "contested_shots_3pt" },
        { label: "DEFLECTIONS", accessor: "deflections" },
        { label: "CHARGES DRAWN", accessor: "charges_drawn" },
        { label: "SCREEN ASSISTS", accessor: "screen_assists" },
        { label: "SCREEN AST PTS", accessor: "screen_ast_pts" },
        { label: "OFF LOOSE BALL RECOVERED", accessor: "off_loose_balls_recovered" },
        { label: "DEF LOOSE BALL RECOVERED", accessor: "def_loose_balls_recovered" },
        { label: "LOOSE BALLS RECOVERED", accessor: "loose_balls_recovered" },
        { label: "PCT LOOSE BALL REC OFF", accessor: "pct_loose_balls_recovered_off" },
        { label: "PCT LOOSE BALL REC DEF", accessor: "pct_loose_balls_recovered_def" },
        { label: "OFF BOXOUTS", accessor: "off_boxouts" },
        { label: "DEF BOXOUTS", accessor: "def_boxouts" },
        { label: "BOX OUT PLAYER TEAM REBS", accessor: "box_out_player_team_rebs" },
        { label: "BOX OUT PLAYER REBS", accessor: "box_out_player_rebs" },
        { label: "BOX OUTS", accessor: "box_outs" },
        { label: "PCT BOX OUTS OFF", accessor: "pct_box_outs_off" },
        { label: "PCT BOX OUTS DEF", accessor: "pct_box_outs_def" },
        { label: "PCT BOX OUTS TEAM REB", accessor: "pct_box_outs_team_reb" },
        { label: "PCT BOX OUTS REB", accessor: "pct_box_outs_reb" }
    ];
/*
    const columns = [
        { label: "NAME", accessor: "player_name" },
        //{ label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "avg" },
    ];*/
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
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
     <>
      <table className="ultimateTable">
       <caption>
        Click on a column header to sort by stat.
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting} smallHeaders={true}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default HustleTable;