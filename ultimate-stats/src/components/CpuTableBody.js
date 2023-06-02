import React, { useEffect, useState } from "react";
import '../App.css';


const CpuTableBody = ({ columns, tableData, deletePlayer }) => {


    return (
        <>
            {tableData.map((data, index) => {
                let classname;
                index < 5 ? classname = 'starterRoster' : classname = 'benchRoster';
                return (
                    <div key={index} className={classname}>
                        {columns.map(({ accessor }) => {
                            let tData;
                            if (accessor === 'player_name') {
                                tData = data.player[accessor] ? data.player[accessor] : "——";
                            }
                            else if (accessor === 'totals') {
                                tData = parseFloat(data.player['pts']) + parseFloat(data.player['ast']) + parseFloat(data.player['reb']) ? 
                                      parseFloat(data.player['pts']) + parseFloat(data.player['ast']) + parseFloat(data.player['reb']) : "——";
                            } else {     
                                tData = data.player[accessor] ? data.player[accessor] : "——";
                            }
                            if (typeof tData === 'number') {
                                tData = tData.toFixed(2);
                            }
                            return <div key={accessor} className='centered'>{tData}</div>;
                        })}
                    </div>
                );
            })}
        </>
       );
}

export default CpuTableBody;