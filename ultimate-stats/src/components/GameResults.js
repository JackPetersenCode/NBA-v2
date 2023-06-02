import '../App.css';
import React, { useEffect, useState } from "react";

import ExpectedResults from "./ExpectedResults";
import hoop from "../apis/hoop";


const GameResults = ({ homeExpectedResults, 
                       setHomeExpectedResults, 
                       visitorExpectedResults, 
                       setVisitorExpectedResults, 
                       gameResults, 
                       setGameResults, 
                       selectedSeason, 
                       setSelectedSeason }) => {
    

    useEffect(() => {
        const getGameResults = async() => {
            let results = await hoop.get(`/api/leagueGames/withboxscoresummary/${selectedSeason}`)
            console.log(results.data.length);
            let data = results.data.slice(0, 2)
            setGameResults(data);
        }
        if (selectedSeason) {
            getGameResults();
        }
    }, [selectedSeason, setGameResults])

    return (
        <div>
            {gameResults.map((game, index) => (
                <div className="columnOdds" key={index}>{<ExpectedResults homeExpectedResults={homeExpectedResults} 
                                                                          setHomeExpectedResults={setHomeExpectedResults} 
                                                                          visitorExpectedResults={visitorExpectedResults} 
                                                                          setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                          game={game} 
                                                                          selectedSeason={selectedSeason} 
                                                                          setSelectedSeason={setSelectedSeason} 
                                                                        />}</div>
            ))}
        </div>
    )
}

export default GameResults;