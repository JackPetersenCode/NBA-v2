import '../App.css';
import React, { useEffect, useState, useRef } from "react";

import hoop from "../apis/hoop";


const ExpectedFromRoster = ({   gameDate,
                                matchup,
                                //postObj,
                                //setPostObj,
                                averageScore, 
                                previousSeason, 
                                H_or_V, 
                                roster, 
                                homeExpectedResults, 
                                setHomeExpectedResults, 
                                visitorExpectedResults, 
                                setVisitorExpectedResults, 
                                index, 
                                totalStat, 
                                setTotalStat, 
                                totalMins, 
                                setTotalMins, 
                                gameId, 
                                selectedSeason, 
                                playerId, 
                                teamId }) => {
    

    const [playerAverages, setPlayerAverages] = useState([]);

    useEffect(() => {
        const getStats = async() => {
        
            if (gameId !== '1') {
                let results = await hoop.get(`/api/boxScoresTraditional/averages/82games/${gameId}/${playerId}/${selectedSeason}/${H_or_V}`)
                if (results.data.length > 0) {
                    setPlayerAverages(results.data);
                    setTotalMins((currentMins) => currentMins + parseFloat(results.data[0].min))
                    setTotalStat((currentStat) => currentStat + parseFloat(results.data[0]['+/-']))
                
                } else {
                    let results = await hoop.get(`/api/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                    if (results.data.length > 0) {
                        setPlayerAverages(results.data);
                        setTotalMins((currentMins) => currentMins + parseFloat(results.data[0].min))
                        setTotalStat((currentStat) => currentStat + parseFloat(results.data[0]['+/-']))
      
                    } else {
                        setPlayerAverages([{
                            "+/-": 0,
                            ast: 0,
                            blk: 0,
                            dreb: 0,
                            fg3_pct: 0,
                            fg3a: 0,
                            fg3m: 0,
                            fg_pct: 0,
                            fga: 0,
                            fgm: 0,
                            ft_pct: 0,
                            fta: 0,
                            ftm: 0,
                            min: 0,
                            oreb: 0,
                            pf: 0,
                            playerId: 0,
                            player_name: 'NO STATS FOR PLAYER',
                            pts: 0,
                            reb: 0,
                            stl: 0,
                            team_abbreviation: 'NO STATS FOR PLAYER',
                            team_id: 0,
                            to: 0
                        }])
                    }
                }
            } else {
                let results = await hoop.get(`/api/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                if (results.data.length > 0) {
                    
                    setPlayerAverages(results.data);
                    setTotalMins((currentMins) => currentMins + parseFloat(results.data[0].min))
                    setTotalStat((currentStat) => currentStat + parseFloat(results.data[0]['+/-']))
                } else {
                    setPlayerAverages([{
                        "+/-": 0,
                        ast: 0,
                        blk: 0,
                        dreb: 0,
                        fg3_pct: 0,
                        fg3a: 0,
                        fg3m: 0,
                        fg_pct: 0,
                        fga: 0,
                        fgm: 0,
                        ft_pct: 0,
                        fta: 0,
                        ftm: 0,
                        min: 0,
                        oreb: 0,
                        pf: 0,
                        playerId: 0,
                        player_name: 'NO STATS FOR PLAYER',
                        pts: 0,
                        reb: 0,
                        stl: 0,
                        team_abbreviation: 'NO STATS FOR PLAYER',
                        team_id: 0,
                        to: 0
                    }])
                }
            }

        }
        if (playerId) {
            getStats();
            

        }
    }, [playerId])

/*
    useEffect(() => {
        const calculateExpected = async() => {
            if (H_or_V === 'home') {
                console.log(averageScore)
                setHomeExpectedResults((averageScore + (totalStat / totalMins * 240)).toFixed(0))
                console.log(homeExpectedResults)


            } else {
                console.log(totalStat)
                setVisitorExpectedResults((averageScore + (totalStat / totalMins * 240)).toFixed(0))
                console.log(visitorExpectedResults)
            }
        }
        if (index === roster.length - 1 && playerAverages.length > 0 && averageScore > 0 && totalMins > 0 && totalStat) {
            calculateExpected();
        }
    }, [playerId, roster])
*/

    const doWant = ['fgm', 'fga', 'fg3m', 'fg3a', 'reb', 'ast', 'stl', 'blk', '+/-']
    /*
    return (
        <div>
            {playerAverages.length > 0 ? Object.keys(playerAverages[0])
            .filter(keys => doWant.includes(keys))
            .map((keyName, i) => (
                
                <li key={i}>
                    <span>{keyName}: {keyName !== 'name' ? parseFloat(playerAverages[0][keyName]).toFixed(2) : playerAverages[0][keyName]}</span>
                    <br></br>
                </li>
            )) : 'loading'}
        </div>
    )*/

                
    const postThePostObj = async(obj) => {
        //console.log(obj)
    }


    if (index === roster.length - 1) {
        if (averageScore > 0 && totalMins > 0) {
            let postObj = {
                gameDate: gameDate,
                matchup: matchup,
                expected: averageScore + (totalStat / totalMins * 240),
                H_or_V: H_or_V
            }
            postThePostObj(postObj)
        }
        
        return (
            <>
                {averageScore > 0 && totalMins > 0 ? (averageScore + (totalStat / totalMins * 240)).toFixed(0) : 'loading'}
            </>
        )
    }
    
}

export default ExpectedFromRoster;