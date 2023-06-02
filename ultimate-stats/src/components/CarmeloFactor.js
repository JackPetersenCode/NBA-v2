import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import '../App.css';
import hoop from "../apis/hoop";


//add up hustle totals, divide by minutes to get hustle factor.
//def_rating
//efg% - 100 + husteFactor

const CarmeloFactor = ({ selectedSeason }) => {
    const [tableData, setTableData] = useState([]);
    let columns = [];
    useEffect(() => {
        const getCarmeloFactor = async() => {
            let results = await hoop.get(`/api/carmelo/newCarmelo/${selectedSeason}`)
            if (results.data.length > 0) {
                setTableData(results.data);
            }
        }
        if (selectedSeason) {
            getCarmeloFactor();
        }
    }, [selectedSeason])

    columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "TOTAL HUSTLE STATS", accessor: "total_stats" },
        { label: "eFG%", accessor: "efg" },
        { label: "CARMELO FACTOR", accessor: "carmelo_factor" },
        { label: "MVP POINTS", accessor: "mvp_points"}
    ];

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
            return (a[sortField] - b[sortField]) * (sortOrder === "desc" ? 1 : -1);           
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
      <table className="cumTable">
       <caption>
        Click on a stat header to sort all players by stat
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default CarmeloFactor;