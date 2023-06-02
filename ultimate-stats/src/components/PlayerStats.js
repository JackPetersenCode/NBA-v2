import '../App.css';
import React, { useEffect, useState } from "react";
import PlayerCareerStats from "./PlayerCareerStats";
import hoop from "../apis/hoop";


const PlayerStats = ({}) => {

    let [teamsData, setTeamsData] = useState([]);
    let [seasonsData, setSeasonsData] = useState([]);
    let [roster, setRosterData] = useState([]);

    const [playerId, setPlayerId] = useState('');
    const [boxScore, setBoxScore] = useState([]);

    let [selectedTeam, setSelectedTeam] = useState('');
    let [selectedSeason, setSelectedSeason] = useState('');
    let [selectedPlayer, setSelectedPlayer] = useState('');

    let options = null;

    useEffect(() => {
        
        let isSubscribed = true;

        const getTeams = async() => {
            let response = await hoop.get(`/api/teamnames`);
            if (isSubscribed) {
                setTeamsData(response.data);
            }
        }
        getTeams();
        return () => isSubscribed = false;
    }, [])
      
    useEffect(() => {
        
      let isSubscribed = true;
        const getSeasons = async() => {
            if (isSubscribed) {
                setSeasonsData([
                    {season: '2015-2016'},
                    {season: '2016-2017'},
                    {season: '2017-2018'},
                    {season: '2018-2019'},
                    {season: '2019-2020'},
                    {season: '2020-2021'},
                    {season: '2021-2022'},
                    {season: '2022-2023'}
                ])
            }
        }
        getSeasons();
        return () => isSubscribed = false;
    }, [])

    useEffect(() => {
        
      let isSubscribed = true;
        const getRoster = async() => {
            let teamid = await hoop.get(`/api/leagueGames/teamid/${selectedTeam}`)
            let response = await hoop.get(`/api/boxPlayers/getroster/${selectedSeason}/${teamid.data[0].team_id}`)
            if (isSubscribed) {
                setRosterData(response.data);
            }
        }
        if (selectedTeam) {
            getRoster()
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam])

    useEffect(() => {
        
        let isSubscribed = true;
            const getPlayerId = async() => {
            
                let playerid = await hoop.get(`/api/playersNBA/${selectedSeason}/${selectedPlayer}`)
                console.log(playerid.data);
                if (isSubscribed) {
                    setPlayerId(playerid.data[0]);
                }
          }
          if (selectedPlayer) {
              getPlayerId();
          }
          return () => isSubscribed = false;
    }, [selectedPlayer])

    useEffect(() => {
        
        let isSubscribed = true;
            const getAverages = async() => {
            
                let boxScore = await hoop.get(`/api/boxScoresTraditional/averages/${playerId.player_id}/${selectedSeason}`)
                if (isSubscribed) {
                    setBoxScore(boxScore.data);
                }
            }
            if (playerId) {

                getAverages();
            }
            return () => isSubscribed = false;
    }, [playerId])  
  
   /* useEffect(() => {
        
      let isSubscribed = true;
          const getGameStats = async() => {
          

              let boxScore = await hoop.get(`/boxScoresTraditional/${selectedSeason}/${game_id}/${playerid}`);
              if (isSubscribed) {
                  setBoxScore(boxScore.data);
              }
          }
          if (playerid) {

              getAverages();
          }
          return () => isSubscribed = false;
    }, [playerid])  */


    function handleTeamChange(event) {
        setSelectedPlayer('')
        setSelectedTeam(event.target.value);
        console.log(selectedTeam);
    }

    function handleSeasonChange(event) {
        setSelectedPlayer('')
        setSelectedSeason(event.target.value);
    }

    function handlePlayerChange(event) {
        setSelectedPlayer(event.target.value);
    }
    
    if (roster) {
        options = roster.map((option, index) => <option key={index} value={option['player_name']}>{option['player_name']}</option>);
    }
/*
    if (shotsData.length > 0 && boxScore.length > 0) {
        console.log('in here')
        shots = <ShotChartSVG shotsData={shotsData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>
    }
    if (shotsGameData.length > 0) {
        console.log(shotsGameData)
        console.log(shotsData)
        shotsGame = <ShotChartSVG shotsData={shotsGameData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>
        console.log(shotsGame)
        console.log(shots);
    }*/

    return (
      <label>
        <select value={selectedSeason} onChange={handleSeasonChange}>
          <option value="0">Select Season</option>

          {seasonsData.map((option, index) => (
            <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedTeam} onChange={handleTeamChange}>
          <option value="0">Select Team</option>

          {teamsData.map((option, index) => (
            <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedPlayer} onChange={handlePlayerChange}>
          <option value="0">Select Player</option>
        {options}
        </select>
        <br></br>
        <br></br>
        <div>{playerId ? <PlayerCareerStats playerId={playerId} selectedPlayer={selectedPlayer} selectedSeason={selectedSeason} seasonsData={seasonsData}/> : 'Select Player' }</div>
        <br></br>
        <br></br>
      </label>
    );
        
};
        
export default PlayerStats;