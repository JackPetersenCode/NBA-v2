import React, { useEffect, useState } from "react";
import '../App.css';
import BallerTableBody from "./BallerTableBody";
import TableHead from "./TableHead";
import hoop from "../apis/hoop";

const $35Ballers = ({ ballers, setBallers, highscore, baller, setBaller, lockflag, teamName, teamSalary, totalRatingUser }) => {
    
    console.log(baller)

    let columns = [
        { label: 'TEAM', accessor: 'name' },
        { label: 'SCORE', accessor: 'score' },
        { label: 'SALARY', accessor: 'salary' }
    ]
    //<button onClick={handleClick}>Submit High Score</button>

    return (
        <>
            <div className="high-scores">
                High Scores
            </div>
            { ballers.length > 0 ? 
            <div style={{maxHeight: '300px', overflow: 'auto'}}>
                <table className="ballers">
                    <TableHead columns={columns}/>
                    <BallerTableBody columns={columns} tableData={ballers} />
                </table>
            </div> : null }
            
        </>
    )
}

export default $35Ballers;