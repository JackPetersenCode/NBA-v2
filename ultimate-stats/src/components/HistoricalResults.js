import '../App.css';
import React, { useEffect, useState } from "react";
import hoop from "../apis/hoop";
import HistoricalGrid from './HistoricalGrid';

const HistoricalResults = ({selectedSeason, setSelectedSeason, selectedTeam, setSelectedTeam}) => {

    const [historicalResults, setHistoricalResults] = useState([]);
    const [historicalResultsByTeam, setHistoricalResultsByTeam] = useState([]);

 
    useEffect(() => {

        const getHistoricalResults = async() => {
            let results;
            if (selectedTeam === '0' || selectedTeam === '') {
                results = await hoop.get(`/api/gambling/historicalResults/${selectedSeason}`);
                console.log(results.data);
                setHistoricalResults(results.data);
            } else {
                results = await hoop.get(`/api/gambling/historicalResults/ByTeam/${selectedTeam}/${selectedSeason}`);
                console.log(results.data);
                setHistoricalResults(results.data);
            }
        }
        if (selectedSeason) {
            getHistoricalResults();
        }
    }, [selectedSeason, selectedTeam])
/*
    useEffect(() => {

        const getHistoricalResultsByTeam = async() => {

            let results = await hoop.get(`/api/gambling/historicalResults/ByTeam/${selectedTeam}/${selectedSeason}`);
            console.log(results.data);
            setHistoricalResultsByTeam(results.data);
        }
        if (selectedSeason && selectedTeam) {
            getHistoricalResultsByTeam();
        }
    }, [selectedSeason, selectedTeam])
*/

    return (
        <div className="historical-container">
            {historicalResults.map((game, index) => (
                <div key={index}>
                    <HistoricalGrid game={game} />
                </div>
            ))}
        </div>
    )
}

export default HistoricalResults;

/*
 game.green_red === 'green' ? 
                <div className="historicalGreen" key={index}>
                    <p className='gamedate'>{game.game_date}</p>
                    <div className="column25predictions">
                        H vs. V
                        <br></br>
                        {game.matchup.substring(0,3)}
                        <br></br>
                        {game.matchup.substring(8,11)}
                    </div>
                    <div className="column25predictions">
                        Exp.
                        <br></br>
                        {game.home_expected}
                        <br></br>
                        {game.visitor_expected}
                    </div>
                    <div className="column25predictions">
                        Act.
                        <br></br>
                        {game.home_actual}
                        <br></br>
                        {game.visitor_actual}
                    </div>
                    <div className="column25predictions">
                        Odds
                        <br></br>
                        {game.home_odds}
                        <br></br>
                        {game.visitor_odds}
                    </div>
                </div>
                :
                <div className="historicalRed" key={index}>
                    <p className='gamedate'>{game.game_date}</p>
                    <div className="column25predictions">
                        H vs. V
                        <br></br>
                        {game.matchup.substring(0,3)}
                        <br></br>
                        {game.matchup.substring(8,11)}
                    </div>
                    <div className="column25predictions">
                        Exp.
                        <br></br>
                        {game.home_expected}
                        <br></br>
                        {game.visitor_expected}
                    </div>
                    <div className="column25predictions">
                        Act.
                        <br></br>
                        {game.home_actual}
                        <br></br>
                        {game.visitor_actual}
                    </div>
                    <div className="column25predictions">
                        Odds
                        <br></br>
                        {game.home_odds}
                        <br></br>
                        {game.visitor_odds}
                    </div>
                </div>
            ))}
        </div>
        */