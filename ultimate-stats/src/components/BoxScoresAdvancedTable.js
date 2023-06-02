import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import '../App.css';
import hoop from "../apis/hoop";


const BoxScoresAdvancedTable = ({ selectedSeason, setSelectedSeason }) => {

    const [tableData, setTableData] = useState([]);
    let columns = [];

    useEffect(() => {

        const getAdvanced = async() => {
            try {
                let data = await hoop.get(`/api/advancedPerGame/${selectedSeason}`)
                console.log(data.data)

                setTableData(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        if (selectedSeason) {
            getAdvanced()
        }
    }, [selectedSeason]);

    columns = [
        { label: "NAME", accessor: "name" },
        { label: "TEAM", accessor: "teamAbbreviation" },
        { label: "TM TOV PCT", accessor: "season" },
        { label: "MIN", accessor: "min" },
        { label: "AST PCT", accessor: "astPct" },
        { label: "AST RATIO", accessor: "astRatio" },
        { label: "AST TO", accessor: "astTo" },
        { label: "DEF RATING", accessor: "defRating" },
        { label: "DEF REB PCT", accessor: "drebPct" },
        { label: "EFG PCT", accessor: "efgPct" },
        { label: "GP", accessor: "gp" },
        { label: "NET RATING", accessor: "netRating" },
        { label: "OFF RATING", accessor: "offRating" },
        { label: "OREB PCT", accessor: "orebPct" },
        { label: "PACE", accessor: "pace" },
        { label: "REB PCT", accessor: "rebPct" },
        { label: "TM TOV PCT", accessor: "tmTovPct" },
        { label: "TS PCT", accessor: "tsPct" },
        { label: "USG PCT", accessor: "usgPct" },
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
                if (sortField !== 'name') {
                    a = a.stats;
                    b = b.stats;
                }
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                let nonNumeric = ['name','teamAbbreviation'];
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
      <table className="ultimate">
       <caption>
        Please allow a moment for advanced stats to load...
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting} smallHeaders={true}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};


export default BoxScoresAdvancedTable;