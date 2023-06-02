import '../App.css';
import React, { useEffect, useState } from "react";

import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ActualResults from "./ActualResults";
import Odds from "./Odds";
import hoop from "../apis/hoop";
import {TOR, DEN, HOU, IND, CHI, GSW, BOS, LAC, POR, ATL, CLE, DAL, NOP, SAC, MIL, WAS, BKN, LAL,
        SAS, OKC, CHA, MIN, PHX, MEM, NYK, PHI, ORL, MIA, UTA, DET } from 'react-nba-logos';


const ExpectedResults = ({ homeExpectedResults, 
                           setHomeExpectedResults, 
                           visitorExpectedResults, 
                           setVisitorExpectedResults, 
                           game, 
                           selectedSeason, 
                           setSelectedSeason }) => {

    const [homeTeamId, setHomeTeamId] = useState('');
    const [visitorTeamId, setVisitorTeamId] = useState('');
    const [homeRoster, setHomeRoster] = useState([]);
    const [visitorRoster, setVisitorRoster] = useState([]);
    const [gameDate, setGameDate] = useState('');
    const [teamId, setTeamId] = useState('');
    const [homePreviousGameId, setHomePreviousGameId] = useState('');
    const [visitorPreviousGameId, setVisitorPreviousGameId] = useState('');
    const [H_or_V, setH_or_V] = useState('');
    const [matchup, setMatchup] = useState('');
    
    const [averageScore, setAverageScore] = useState(0);
    const [previousSeason, setPreviousSeason] = useState('');
    //const [HomeLogo, setHomeLogo] = useState('');
    //const [VisitorLogo, setVisitorLogo] = useState('');


    const components = {
        TOR: TOR,
        DEN: DEN,
        HOU: HOU,
        DET: DET,
        UTA: UTA,
        MIA: MIA,
        ORL: ORL,
        PHI: PHI,
        NYK: NYK,
        MEM: MEM,
        PHX: PHX,
        MIN: MIN,
        CHA: CHA,
        OKC: OKC,
        SAS: SAS,
        LAL: LAL,
        BKN: BKN,
        WAS: WAS,
        MIL: MIL,
        SAC: SAC,
        NOP: NOP,
        DAL: DAL,
        CLE: CLE,
        ATL: ATL,
        POR: POR,
        LAC: LAC,
        BOS: BOS,
        GSW: GSW,
        CHI: CHI,
        IND: IND
    };

    let HomeLogo;
    let VisitorLogo;

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


    useEffect(() => {
        const getAverageScore = async() => {
            if (homePreviousGameId !== '1') {
                let results = await hoop.get(`/api/leagueGames/averageScore/${homePreviousGameId}/${selectedSeason}`);
                setAverageScore(results.data[0].avg);
            } else {
                let results = await hoop.get(`/api/leagueGames/averageScore/${previousSeason}`);
                setAverageScore(results.data[0].avg);
            }
        }
        if (homePreviousGameId && previousSeason) {
            getAverageScore();
        }
    }, [game, homePreviousGameId, previousSeason])

    useEffect(() => {
        const getPreviousGameIds = async() => {
            if (game.game_id === 'upcoming') {
                let homePrevious = await hoop.get(`/api/boxScoresTraditional/previousgame/gameid/${selectedSeason}/${homeTeamId}`)
                if (homePrevious.data.length > 0) {
                    setHomePreviousGameId(homePrevious.data[0].game_id)
                } else {
                    setHomePreviousGameId('1')
                }
            } else {
                
                let homePrevious = await hoop.get(`/api/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${homeTeamId}`)
                if (homePrevious.data.length > 0) {
                    setHomePreviousGameId(homePrevious.data[0].game_id)
                } else {
                    setHomePreviousGameId('1')
                }
            }
            if (game.game_id === 'upcoming') {
                let visitorPrevious = await hoop.get(`/api/boxScoresTraditional/previousgame/gameid/${selectedSeason}/${visitorTeamId}`)
                if (visitorPrevious.data.length > 0) {
                    setVisitorPreviousGameId(visitorPrevious.data[0].game_id)
                } else {
                    setVisitorPreviousGameId('1')
                }
            } else {
                let visitorPrevious = await hoop.get(`/api/boxScoresTraditional/previousgameid/${game.game_id}/${selectedSeason}/${visitorTeamId}`)
                if (visitorPrevious.data.length > 0) {
                    setVisitorPreviousGameId(visitorPrevious.data[0].game_id)
                } else {
                    setVisitorPreviousGameId('1')
                }
            }
        } 
        if (homeTeamId && visitorTeamId) {
            getPreviousGameIds();
        }
    }, [game, homeTeamId, visitorTeamId, selectedSeason])

    useEffect(() => {
        const getTeamIds = async() => {
            if (game.game_id === 'upcoming') {
                let results = await hoop.get(`/api/leagueGames/teamid/${game.home_team}`)
                setHomeTeamId(results.data[0].team_id)
                let results2 = await hoop.get(`/api/leagueGames/teamid/${game.away_team}`)
                setVisitorTeamId(results2.data[0].team_id)
                setGameDate(game.commence_time.substring(0, 10));
                let results3 = await hoop.get(`/api/leagueGames/teamabbreviation/${game.home_team}`)
                let results4 = await hoop.get(`/api/leagueGames/teamabbreviation/${game.away_team}`)
                setMatchup(results3.data[0].team_abbreviation + ' vs. ' + results4.data[0].team_abbreviation);

            } else {
                setHomeTeamId(game.home_team_id);
                setVisitorTeamId(game.visitor_team_id);
                setGameDate(game.game_date);
                setMatchup(game.matchup)
                /*setActualHome(<ActualResults game={game} H_or_V={'home'}/>)
                setActualVisitor(<ActualResults game={game} H_or_V={'visitor'}/>)
                setExpectedHome(<GetRosterFromPreviousGame game={game} previousGameId={homePreviousGameId} roster={homeRoster} setRoster={setHomeRoster} teamId={homeTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'home'} setH_or_V={setH_or_V}/>)
                setExpectedVisitor(<GetRosterFromPreviousGame game={game} previousGameId={visitorPreviousGameId} roster={visitorRoster} setRoster={setVisitorRoster} teamId={visitorTeamId} setTeamId={setTeamId} gameDate={gameDate} setGameDate={setGameDate} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} H_or_V={'visitor'} setH_or_V={setH_or_V}/>)
                setOddsHome(<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'home'}/>)
                setOddsVisitor(<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'visitor'}/>)
            */
            }
        }
        if (game) {
            getTeamIds()
        }
    }, [game])
    
    console.log(matchup.substring(0,3))
    HomeLogo = components[matchup.substring(0,3)]
    VisitorLogo = components[matchup.substring(8,11)]
    //FOR UPCOMING P8REDICTIONS, PASS IN SOME STRING AS GAME TO GETROSTERFROMPREVIOUSGAME AND SET HOMEPREVIOUSGAMEID = LAST GAME_ID IN THE TABLE
    return (
        <div>{game.game_id !== 'upcoming' ? 
            <div>
                {game.game_date}
                <br></br>
                <div>
                    <div className="column25predictions">
                    <p>H vs. V</p>
                    {matchup ? matchup.substring(0,3)  : 'loading'}
                    <br></br>
                    vs.
                    <br></br>
                    {matchup ? matchup.substring(8, 11) : 'loading'}
                    </div>
                    <div className="column25predictions">
                    <p>Exp.</p>
                    {homePreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore}
                                                                     previousSeason={previousSeason} 
                                                                     homeExpectedResults={homeExpectedResults} 
                                                                     setHomeExpectedResults={setHomeExpectedResults} 
                                                                     visitorExpectedResults={visitorExpectedResults} 
                                                                     setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                     matchup={matchup} 
                                                                     game={game} 
                                                                     previousGameId={homePreviousGameId} 
                                                                     roster={homeRoster} 
                                                                     setRoster={setHomeRoster} 
                                                                     teamId={homeTeamId} 
                                                                     setTeamId={setTeamId} 
                                                                     gameDate={gameDate} 
                                                                     setGameDate={setGameDate} 
                                                                     selectedSeason={selectedSeason} 
                                                                     setSelectedSeason={setSelectedSeason} 
                                                                     H_or_V={'home'} 
                                                                     setH_or_V={setH_or_V}/> : 'loading'}
                    <br></br>
                    {visitorPreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore} 
                                                                        previousSeason={previousSeason} 
                                                                        homeExpectedResults={homeExpectedResults} 
                                                                        setHomeExpectedResults={setHomeExpectedResults} 
                                                                        visitorExpectedResults={visitorExpectedResults} 
                                                                        setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                        matchup={matchup} 
                                                                        game={game} 
                                                                        previousGameId={visitorPreviousGameId} 
                                                                        roster={visitorRoster} 
                                                                        setRoster={setVisitorRoster} 
                                                                        teamId={visitorTeamId} 
                                                                        setTeamId={setTeamId} 
                                                                        gameDate={gameDate} 
                                                                        setGameDate={setGameDate} 
                                                                        selectedSeason={selectedSeason} 
                                                                        setSelectedSeason={setSelectedSeason} 
                                                                        H_or_V={'visitor'} 
                                                                        setH_or_V={setH_or_V}/> : 'loading'}
                    </div>
                    <div className="column25predictions">
                    <p>Act.</p>
                    {<ActualResults game={game} H_or_V={'home'}/>}
                    <br></br>
                    {<ActualResults game={game} H_or_V={'visitor'}/>}
                    </div>
                    <div className="column25predictions">
                    <p>Odds</p>
                    {<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'home'}/>}
                    <br></br>
                    {<Odds selectedSeason={selectedSeason} game={game} homeTeamId={homeTeamId} visitorTeamId={visitorTeamId} H_or_V={'visitor'}/>}
                    </div>
                </div>
            </div>
            :
            <div className='upcoming-grid'>
                <div className='upcoming-game-date'>{game.commence_time.charAt(5) === '0' ?
                                                        <>
                                                        {game.commence_time.substring(6,10)}
                                                        <br></br>
                                                        {game.commence_time.substring(0,4)}
                                                        </>
                                                        :
                                                        <>
                                                        {game.commence_time.substring(5,10)}
                                                        <br></br>
                                                        {game.commence_time.substring(0,4)}
                                                        </>}                                                        
                </div>                
                <div></div>
                <div className='upcoming-headers'>EXPECTED SCORE</div>
                <div className='upcoming-headers'>MONEYLINE</div>
                <div className='inner-upcoming-flex'>
                    {matchup && HomeLogo ? 
                    <div className='logo-flex'>
                        <HomeLogo size={50} /> 
                        <div>
                            {' ' + matchup.substring(0,3)}
                        </div>
                    </div>
                
                     : 'loading'}
                </div>
                {homePreviousGameId && averageScore > 0? <GetRosterFromPreviousGame averageScore={averageScore} 
                                                                                     previousSeason={previousSeason} 
                                                                                     homeExpectedResults={homeExpectedResults} 
                                                                                     setHomeExpectedResults={setHomeExpectedResults} 
                                                                                     visitorExpectedResults={visitorExpectedResults} 
                                                                                     setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                                     matchup={matchup} 
                                                                                     game={game} 
                                                                                     previousGameId={homePreviousGameId} 
                                                                                     roster={homeRoster} 
                                                                                     setRoster={setHomeRoster} 
                                                                                     teamId={homeTeamId} 
                                                                                     setTeamId={setTeamId} 
                                                                                     gameDate={gameDate} 
                                                                                     setGameDate={setGameDate} 
                                                                                     selectedSeason={selectedSeason} 
                                                                                     setSelectedSeason={setSelectedSeason} 
                                                                                     H_or_V={'home'} 
                                                                                     setH_or_V={setH_or_V}/> : 'loading'}
                <div>
                    {game.home_odds}
                </div>
                <div className='inner-upcoming-flex'>
                    {matchup && HomeLogo ? 
                    <div className='logo-flex'>
                        <VisitorLogo size={50} /> 
                        <div>
                            {' ' + matchup.substring(8,11)}
                        </div>
                    </div>
                
                     : 'loading'}
                </div>
                {visitorPreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore}
                                                                                        previousSeason={previousSeason} 
                                                                                        homeExpectedResults={homeExpectedResults} 
                                                                                        setHomeExpectedResults={setHomeExpectedResults} 
                                                                                        visitorExpectedResults={visitorExpectedResults} 
                                                                                        setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                                        matchup={matchup} 
                                                                                        game={game} 
                                                                                        previousGameId={visitorPreviousGameId} 
                                                                                        roster={visitorRoster} 
                                                                                        setRoster={setVisitorRoster} 
                                                                                        teamId={visitorTeamId} 
                                                                                        setTeamId={setTeamId} 
                                                                                        gameDate={gameDate} 
                                                                                        setGameDate={setGameDate} 
                                                                                        selectedSeason={selectedSeason} 
                                                                                        setSelectedSeason={setSelectedSeason} 
                                                                                        H_or_V={'visitor'} 
                                                                                        setH_or_V={setH_or_V}/> : 'loading'}
                <div>
                    {game.away_odds}
                </div>

        </div>}
    </div>
    )
}

export default ExpectedResults;

/*


                    {matchup && VisitorLogo ? 
                    <div className='logo-flex'>
                        <VisitorLogo size={50} /> 
                        <div>
                            {' ' + matchup.substring(8,11)}
                        </div>
                    </div>
                     : 'loading'}
                </div>
                <div className='inner-upcoming-flex' style={{textAlign: 'center'}}>
                    Expected Score
                    <br></br>
                    
                    <br></br>
                    {visitorPreviousGameId && averageScore > 0 ? <GetRosterFromPreviousGame averageScore={averageScore}
                                                                                        previousSeason={previousSeason} 
                                                                                        homeExpectedResults={homeExpectedResults} 
                                                                                        setHomeExpectedResults={setHomeExpectedResults} 
                                                                                        visitorExpectedResults={visitorExpectedResults} 
                                                                                        setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                                        matchup={matchup} 
                                                                                        game={game} 
                                                                                        previousGameId={visitorPreviousGameId} 
                                                                                        roster={visitorRoster} 
                                                                                        setRoster={setVisitorRoster} 
                                                                                        teamId={visitorTeamId} 
                                                                                        setTeamId={setTeamId} 
                                                                                        gameDate={gameDate} 
                                                                                        setGameDate={setGameDate} 
                                                                                        selectedSeason={selectedSeason} 
                                                                                        setSelectedSeason={setSelectedSeason} 
                                                                                        H_or_V={'visitor'} 
                                                                                        setH_or_V={setH_or_V}/> : 'loading'}
                </div>
                <div className='inner-upcoming-flex'>
                    Odds
                    <br></br>
                    
                    <br></br>
                    {game.away_odds}
                </div> */