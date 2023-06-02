import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import '../App.css';
import hoop from "../apis/hoop";


const TableMisc = ({ selectedSeason, setSelectedSeason }) => {
    const [tableData, setTableData] = useState([]);
    
    let columns = [];
    useEffect(() => {
        hoop.get(`/api/statranked/boxScoresMisc/${selectedSeason}`) // your url may look different
        .then(data => setTableData(data.data)) // set data to state
    }, [selectedSeason]);
    console.log(tableData);

    columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "POINTS OFF TURNOVERS", accessor: "pts_off_tov" },
        { label: "2ND CHANCE POINTS", accessor: "pts_2nd_chance" },
        { label: "FASTBREAK POINTS", accessor: "pts_fb" },
        { label: "PAINT POINTS", accessor: "pts_paint" },
        { label: "OPPONENT POINTS OFF TURNOVERS", accessor: "opp_pts_off_tov" },
        { label: "OPPONENT 2ND CHANCE POINTS", accessor: "opp_pts_2nd_chance" },
        { label: "OPPONENT FASTBREAK POINTS", accessor: "opp_pts_fb" },
        { label: "OPPONENT PAINT POINTS", accessor: "opp_pts_paint" },
        { label: "BLK", accessor: "blk" },
        { label: "BLKA", accessor: "blka" },
        { label: "PF", accessor: "pf" },
        { label: "PFD", accessor: "pfd" },
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
        Click on a stat header to sort all players by stat
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting} smallHeaders={true}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default TableMisc;