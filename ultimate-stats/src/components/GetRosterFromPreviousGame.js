import '../App.css';
import React, { useEffect, useState, useRef } from "react";

import ExpectedFromRoster from "./ExpectedFromRoster";
import hoop from "../apis/hoop";


const GetRosterFromPreviousGame = ({ averageScore, 
                                        previousSeason, 
                                        homeExpectedResults, 
                                        setHomeExpectedResults, 
                                        visitorExpectedResults, 
                                        setVisitorExpectedResults, 
                                        matchup, 
                                        game, 
                                        previousGameId, 
                                        roster, 
                                        setRoster, 
                                        teamId, 
                                        setTeamId, 
                                        gameDate, 
                                        setGameDate, 
                                        selectedSeason, 
                                        setSelectedSeason, 
                                        H_or_V, 
                                        setH_or_V}) => {
    
    const [totalMins, setTotalMins] = useState(0);
    const [totalStat, setTotalStat] = useState(0);
    //const [postObj, setPostObj] = useState({});
    //const [averageScore, setAverageScore] = useState([{avg: 0}]);

    /*useEffect(() => {
        const getExpectedTotals = async() => {
            let results1 = await hoop.get(`boxScoresTraditional/sumstat/${selectedSeason}/${teamId}/${previousGameId}/min`)
            if (results1.data.length > 0) {
                setTotalMins(results1.data[0].sum)
            }
            let results2 = await hoop.get(`boxScoresTraditional/sumstat/${selectedSeason}/${teamId}/${previousGameId}/plus_minus`)
            if (results2.data.length > 0) {
                setTotalStat(results2.data[0].sum)
            }
        }
        if (previousGameId) {
            getExpectedTotals();
        }
    }, [previousGameId])*/

    //const [previousSeason, setPreviousSeason] = useState('');
/*    const [totalStat, setTotalStat] = useState(0);
    const [totalMins, setTotalMins] = useState(0);
    const [expected, setExpected] = useState(0);*/


    /*useEffect(() => {
        const setTotalMinsP240 = async() => {
            let mins = totalMins + parseFloat(playerAverages[0].min)
            setTotalMins(mins);
        }
        if (playerAverages.length > 0) {
            setTotalMinsP240();
        }
    }, [playerAverages, totalMins])

    useEffect(() => {
        const setTotalStatP240 = async() => {
            let stat = totalStat + parseFloat(playerAverages[0]["+/-"]);
            setTotalStat(stat);
        }
        if (playerAverages.length > 0) {
            setTotalStatP240();
        }
    }, [playerAverages, totalStat])

    useEffect(() => {
        const setExpectedP240 = async() => {
            let expectedP240 = totalStat / totalMins * 240;
            setExpected(expectedP240);
        }
        if (playerAverages.length > 0) {
            setExpectedP240();
        }
    }, [totalMins, playerAverages.length, totalStat])*/

/*
    useEffect(() => {
        const getAverageScore = async() => {
            if (previousGameId !== '1') {
                let results = await hoop.get(`/leagueGames/averageScore/${previousGameId}/${selectedSeason}`);
                console.log(results.data)

                setAverageScore(results.data);
                console.log(averageScore)
            } else {
                let results = await hoop.get(`/leagueGames/averageScore/${previousSeason}`);
                setAverageScore(results.data);
                console.log(results.data)
                console.log(averageScore)
            }
        }
        if (previousGameId && previousSeason) {
            getAverageScore();
        }
    }, [roster])
*/
/*
    useEffect(() => {
        const getPreviousSeason = async() => {
            let split = selectedSeason.split('-')
            let previous = parseInt(split[1]) - 1;
            let previous2 = parseInt(split[0]) - 1;
            let thisSeason = previous2 + '-' + previous;
            setPreviousSeason(thisSeason);
        }
        if (selectedSeason) {
            getPreviousSeason();
        }
    }, [selectedSeason])
*/

    useEffect(() => {
        const getRoster = async() => {

            if (previousGameId === '1') {
           
                let results = await hoop.get(`/api/boxPlayers/getroster/${selectedSeason}/${teamId}`)
                let data = results.data;
                setRoster(data);
            } else {
                let results = await hoop.get(`/api/boxPlayers/previousgame/gameid/${selectedSeason}/${teamId}/${previousGameId}`);
                let data = results.data;
                setRoster(data);
            }
        }
        if (game) {
            getRoster();
        }
    }, [game, previousGameId, selectedSeason, setRoster, teamId])



//{<ExpectedFromRoster totalStat={totalStat} setTotalStat={setTotalStat} totalMins={totalMins} setTotalMins={setTotalMins} gameId={previousGameId} previousSeason={previousSeason} selectedSeason={selectedSeason} playerId={player.player_id} H_or_V={H_or_V} teamId={teamId} />}

    return (
        <>
            {roster.map((player, index, roster) => (
                <ExpectedFromRoster key={index} gameDate={gameDate} matchup={matchup} averageScore={averageScore} previousSeason={previousSeason} H_or_V={H_or_V} roster={roster} homeExpectedResults={homeExpectedResults} setHomeExpectedResults={setHomeExpectedResults} visitorExpectedResults={visitorExpectedResults} setVisitorExpectedResults={setVisitorExpectedResults} index={index} totalStat={totalStat} setTotalStat={setTotalStat} totalMins={totalMins} setTotalMins={setTotalMins} gameId={previousGameId} selectedSeason={selectedSeason} playerId={player.player_id} teamId={teamId} />
            ))}
        </>
    )
}

export default GetRosterFromPreviousGame;