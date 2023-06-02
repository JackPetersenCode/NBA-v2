import '../App.css';
import React, { useEffect, useState } from "react";

import ExpectedResults from "./ExpectedResults";
import hoop from "../apis/hoop";


const PostMatchups = ({//homeExpectedResults, 
                       //setHomeExpectedResults, 
                       //visitorExpectedResults, 
                       //setVisitorExpectedResults, 
                       selectedSeason, 
                       setSelectedSeason }) => {        
    

    const [games, setGames] = useState([])
    const [homeExpectedResults, setHomeExpectedResults] = useState(0);
    const [visitorExpectedResults, setVisitorExpectedResults] = useState(0);


    useEffect(() => {
        const getGames = async() => {
            let results = await hoop.get(`/api/leagueGames/withboxscoresummary/${selectedSeason}`)
            let data = results.data.slice(0, 2)
            setGames(data);
        }
        if (selectedSeason) {
            getGames();
        }
    }, [selectedSeason, setGames])




    useEffect(() => {
        const postMatchupResults = async() => {

            games.map((game, index) => {
                <ExpectedResults key={index}
                                 homeExpectedResults={homeExpectedResults} 
                                 setHomeExpectedResults={setHomeExpectedResults} 
                                 visitorExpectedResults={visitorExpectedResults} 
                                 setVisitorExpectedResults={setVisitorExpectedResults} 
                                 game={game} 
                                 selectedSeason={selectedSeason} 
                                 setSelectedSeason={setSelectedSeason} 
                                 />
            })
            /*let results = await hoop.post(`/gambling/matchupResults/${selectedSeason}`,
            {

            })
            console.log(results.data);*/
        }
    /*
        && <ActualResults game={game} H_or_V={'home'}/> && <ActualResults game={game} H_or_V={'visitor'}/>
        && <GetRosterFromPreviousGame game={game} previousGameId={homePreviousGameId} roster={homeRoster} setRoster={setHomeRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'home'} setH_or_V={setH_or_V}/>
        && <GetRosterFromPreviousGame game={game} previousGameId={visitorPreviousGameId} roster={visitorRoster} setRoster={setVisitorRoster} teamId={visitorTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'visitor'} setH_or_V={setH_or_V}/>
        && <Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'home'}/>
        && <Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'visitor'}/>
    */
        if (games) {
            console.log('whistles')
            postMatchupResults()
        }
    }, [games])
}

export default PostMatchups;