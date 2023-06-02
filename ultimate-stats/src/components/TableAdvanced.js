import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import '../App.css';
import hoop from "../apis/hoop";


const TableAdvanced = ({ selectedSeason, setSelectedSeason }) => {
    const [tableData, setTableData] = useState([]);
    
    let columns = [];
    useEffect(() => {
        hoop.get(`/api/statranked/boxScores/${selectedSeason}`) // your url may look different
        .then(data => setTableData(data.data)) // set data to state
    }, [selectedSeason]);
    console.log(tableData);

    columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "E OFF RATING", accessor: "e_off_rating" },
        { label: "OFF RATING", accessor: "off_rating" },
        { label: "E DEF RATING", accessor: "e_def_rating" },
        { label: "DEF RATING", accessor: "def_rating" },
        { label: "E NET RATING", accessor: "e_net_rating" },
        { label: "NET RATING", accessor: "net_rating" },
        { label: "AST PCT", accessor: "ast_pct" },
        { label: "AST TOV", accessor: "ast_tov" },
        { label: "AST RATIO", accessor: "ast_ratio" },
        { label: "OREB PCT", accessor: "oreb_pct" },
        { label: "DREB PCT", accessor: "dreb_pct" },
        { label: "REB PCT", accessor: "reb_pct" },
        { label: "TM TOV PCT", accessor: "tm_tov_pct" },
        { label: "EFG PCT", accessor: "efg_pct" },
        { label: "TS PCT", accessor: "ts_pct" },
        { label: "USG PCT", accessor: "usg_pct" },
        { label: "E USG PCT", accessor: "e_usg_pct" },
        { label: "E PACE", accessor: "e_pace" },
        { label: "PACE", accessor: "pace" },
        { label: "PACE PER40", accessor: "pace_per40" },
        { label: "POSS", accessor: "poss" },
        { label: "PIE", accessor: "pie" }
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
        Please allow a moment for advanced stats to load...
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting} smallHeaders={true}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default TableAdvanced;