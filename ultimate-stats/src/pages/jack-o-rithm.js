import React, { useEffect, useState } from "react";
import TeamsDropdown from "../components/TeamsDropdown";
import SeasonsDropdown from "../components/SeasonsDropdown";
import Upcoming from "../components/Upcoming";
import '../App.css'
import HistoricalResults from "../components/HistoricalResults";
import WinPct from "../components/WinPct";

const Jackarithm = () => {
    
    const [teamsData, setTeamsData] = useState([]);
    const [seasonsData, setSeasonsData] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [H_or_V, setH_or_V] = useState('');
/*
    useEffect(() => {
        const postMatchups = async() => {
            <PostMatchups selectedSeason={selectedSeason}
                          setSelectedSeason={setSelectedSeason}
                          homeExpectedResults={homeExpectedResults}
                          setHomeExpectedResults={setHomeExpectedResults}
                          visitorExpectedResults={setVisitorExpectedResults}
                          setVisitorExpectedResults={setVisitorExpectedResults}/>
        }
        postMatchups()
    }, [])*/
    //<Schedule selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} scheduleData={scheduleData} setScheduleData={setScheduleData}/>

    return (
        <div>
            <br></br>
            <div className='statistics-title'>
                NBA Odds & Predictions
            </div>
            <div className='yellow-line'>
            </div>
            <div className="main-predictions-flex">
                <div className="historical-div">
                    <div className="predictions-drop-flex">
                        <div className="predictions-season-flex">
                            <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} predictions={true} />
                        </div>
                        <div className="predictions-season-flex">
                            <TeamsDropdown teamsData={teamsData} setTeamsData={setTeamsData} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} H_or_V={H_or_V} />
                        </div>

                    </div>
                    <div>
                        <WinPct selectedSeason={selectedSeason} selectedTeam={selectedTeam} />
                        <div className='shot-colors'>
                            <div className='light-green-block'>
                            </div>

                            <div>
                                 - Correct Prediction
                            </div>
                        </div>
                        <div className='shot-colors'>
                            <div className='red-block'>
                            </div>

                            <div>
                                 - Incorrect Prediction
                            </div>
                        </div>
                        <h2>
                            Historical Games
                        </h2>
                        <HistoricalResults selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
                    </div>
                </div>
                <div className="upcoming-div">
                    <h4 className='expected-info'>EXPECTED SCORE:<br></br>
                                                - HOME AND VISITOR ROSTERS ARE PULLED FROM EACH TEAM'S PREVIOUS GAME'S BOX SCORE<br></br>
                                                - EACH PLAYER'S 82-GAME PLUS-MINUS AND MINUTES AVERAGES ARE TOTALLED <br></br>
                                                  (82-GAME AVERAGES ARE CALCULATED USING EVERY GAME'S BOX SCORE UP UNTIL THE GAME DATE IN QUESTION, EVEN IF PLAYER DID NOT PLAY)<br></br>
                                                - THE TOTAL OF EACH TEAM'S PLUS-MINUS AVERAGES ARE THEN DIVIDED BY THEIR RESPECTIVE TOTALS OF MINUTES AVERAGES <br></br>
                                                - BOTH QUOTIENTS ARE THEN MULTIPLIED BY 240 (5 PLAYERS ON THE FLOOR, 48 MINUTES EACH) TO ESTIMATE A TEAM'S TOTAL PLUS-MINUS AVERAGE PER GAME<br></br>
                                                - TOTAL CALCULATED PLUS-MINUS AVERAGE IS THEN ADDED TO THE CURRENT AVERAGE SCORE OF ANY GIVEN GAME IN THE SEASON IN QUESTION UP UNTIL THE GAME DATE IN QUESTION TO GET TOTAL ESTIMATED TEAM SCORES

                    </h4>
                    <br></br>
                    <h2>
                        Upcoming Games
                    </h2>
                    <Upcoming //homeExpectedResults={homeExpectedResults}
                              //setHomeExpectedResults={setHomeExpectedResults}
                              //visitorExpectedResults={visitorExpectedResults}
                              //setVisitorExpectedResults={setVisitorExpectedResults}
                              />
                </div>
            </div>
        </div>         
    )
}

export default Jackarithm;