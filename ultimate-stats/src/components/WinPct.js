import '../App.css';
import React, { useEffect, useState, useMemo } from "react";
import hoop from "../apis/hoop";


const WinPct = ({ selectedSeason, selectedTeam }) => {

    const [winPct, setWinPct] = useState(0);
    const [greenOverall, setGreenOverall] = useState(0);
    const [redOverall, setRedOverall] = useState(0);
    const [redSeason, setRedSeason] = useState(0);
    const [greenSeason, setGreenSeason] = useState(0);

    useEffect(() => {

        const getWinPct = async() => {
            let results;
            if(!selectedTeam || selectedTeam === '0') {
                results = await hoop.get(`/api/gambling/winPct/${selectedSeason}`);
            } else {
                results = await hoop.get(`/api/gambling/winPctByTeam/${selectedTeam}/${selectedSeason}`);
            }
            let pct = (parseFloat(results.data[1].count) / (parseFloat(results.data[1].count) + parseFloat(results.data[0].count))) * 100;
            setRedSeason(results.data[0].count);
            setGreenSeason(results.data[1].count);
            setWinPct(pct.toFixed(2));
        }
        if(selectedSeason) {
            getWinPct();
        }
    }, [selectedSeason, selectedTeam])

    useMemo(() => {
        const getOverall = async() => {
            let results = await hoop.get(`/api/gambling/winPctOverall`);
            
            for(let i = 0; i < results.data.length; i++) {
                if(results.data[i].green_red === 'green') {
                    setGreenOverall((greenOverall) => greenOverall += parseFloat(results.data[i].count));

                } else {
                    setRedOverall((redOverall) => redOverall += parseFloat(results.data[i].count));
                }
            }
            

        }
        getOverall();
    }, [])



    return (
        <div className='win-pct-div'>
            {greenOverall > 0 && redOverall > 0 ?
            <div className='overall-flex' >
                <div className='overall-w-l'>
                    PREDICTIONS W-L RECORD (7 SEASONS):
                </div>
                <div className='overall-pct'>
                    {' ' + greenOverall + ' - ' + redOverall}  {'|'}  {' %' + (greenOverall / (redOverall + greenOverall) * 100).toFixed(2)}
                </div>
            </div>
            :
            ''}
            {greenOverall > 0 && redOverall > 0 ?
            <div>
                {selectedTeam !== '0' && selectedTeam !== '' ? 
                <div className='overall-flex' >
                    <div className='overall-w-l'>
                        {selectedSeason + ' ' + selectedTeam.toUpperCase() + ':'}
                    </div>
                    <div className='overall-pct'>
                        {greenSeason + ' - ' + redSeason + ' | %' + winPct}
                    </div>
                </div>
                :
                <div className='overall-flex' >
                    <div className='overall-w-l'> 
                        {selectedSeason + ' ALL TEAMS:'}
                    </div>
                    <div className='overall-pct'>
                        {greenSeason + ' - ' + redSeason + ' | %' + winPct}
                    </div>
                </div>
                }
            </div>
            :
            ''}
        </div>
    )
}

export default WinPct;