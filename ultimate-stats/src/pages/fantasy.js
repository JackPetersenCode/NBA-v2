import React, {useState, useEffect} from 'react';
import '../App.css';
import SeasonsDropdown from '../components/SeasonsDropdown';
import BoxScoresTraditionalTable from '../components/BoxScoresTraditionalTable';
import TableDropdown from '../components/TableDropDown';
import Price from '../components/Price';
import RosterTable from '../components/RosterTable';
import TeamName from '../components/TeamName';
import UserCapSpace from '../components/UserCapSpace';
import ErrorMessages from '../components/ErrorMessages';
import ComputerRoster from '../components/ComputerRoster';
import ComputerTeamName from '../components/ComputerTeamName';
import ComputerSalary from '../components/ComputerSalary';
import LockButton from '../components/LockButton';
import MatchupResults from '../components/MatchupResults';
import Dnd from '../components/Dnd';
import Table from '../components/Table';
import ResultsTableBody from '../components/ResultsTableBody';
import ResultsTableHead from '../components/ResultsTableHead';
import $35Ballers from '../components/$35Ballers';
import UserSalary from '../components/UserSalary';
import hoop from '../apis/hoop';
import { Link, useNavigate } from "react-router-dom";
import MediaQuery from 'react-responsive';


const Fantasy = () => {
    
    let navigate = useNavigate();

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);
    const [tableChoice, setTableChoice] = useState(<Table selectedSeason={selectedSeason}/>);
    const [tables, setTables] = useState([]);
    const [roster, setRoster] = useState([]);
    const [dragRoster, setDragRoster] = useState([]);
    const [cpuRoster, setCpuRoster] = useState([]);
    const [teamSalary, setTeamSalary] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [usedPlayers, setUsedPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const [oneDollarPlayers, setOneDollarPlayers] = useState([]);
    const [twoDollarPlayers, setTwoDollarPlayers] = useState([]);
    const [threeDollarPlayers, setThreeDollarPlayers] = useState([]);
    const [fourDollarPlayers, setFourDollarPlayers] = useState([]);
    const [fiveDollarPlayers, setFiveDollarPlayers] = useState([]);
    const [sixDollarPlayers, setSixDollarPlayers] = useState([]);
    const [sevenDollarPlayers, setSevenDollarPlayers] = useState([]);

    const [starters, setStarters] = useState([]);
    const [lockFlag, setLockFlag] = useState(false);
    const [gameResultsUser, setGameResultsUser] = useState([]);
    const [gameResultsCpu, setGameResultsCpu] = useState([]);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [teamName, setTeamName] = useState({ value: '' });
    const [cpuName, setCpuName] = useState('');
    const [totalRatingUser, setTotalRatingUser] = useState(0);
    const [totalRatingCpu, setTotalRatingCpu] = useState(0);
    const [baller, setBaller] = useState({})
    const [postBaller, setPostBaller] = useState(false);
    const [ballers, setBallers] = useState([]);    


    let columns = ['Finishing', 'Shooting', 'Reb/Def', 'Playmaking'];


    const deletePlayer = (player) => {
        let rows = [...roster];
        let newRows = rows.filter(eachPlayer =>
            eachPlayer !== player.rosterPlayer
        )
        setRoster(newRows);
        setTeamSalary((teamSalary) => teamSalary - parseInt(player.salary))
        setUsedPlayers(usedPlayers.filter(eachPlayer => eachPlayer !== player.rosterPlayer))
        setSelectedPlayer('');
        setErrorMessage('');
    }

    const makeStarter = (index) => {
        if (starters.length < 5) {
            setStarters([
                ...starters,
                roster[index]
            ])
        } else {
            setErrorMessage('Select 5 players for starting lineup')
        }
    }

    useEffect(() => {
        const postBaller = async() => {
            try {
                let response = await hoop.post(`/api/users/ballers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: highscore,
                })
                if (response.ok) {
                    
                    const jsonResponse = response.json();
                    setPostBaller(true);
                    return jsonResponse;
                }
            } catch (error) {
                console.log(error);
            }
            let results = await hoop.get('/api/users/ballers');
            setBallers(results.data);
        }
        if (baller && totalRatingUser > 0) {
            console.log(baller)
            console.log(totalRatingUser)
            postBaller();
        }
    }, [baller])

    useEffect(() => {
        const getBallers = async() => {
            let results = await hoop.get('/api/users/ballers');
            setBallers(results.data);
        }
        getBallers();
    }, [])
    
    const handleClick = () => {
        console.log(highscore)
        setBaller(highscore);
    }

    let highscore = { name: teamName.value, score: totalRatingUser, salary: teamSalary };


    return (
        
        <div className='fantasy-background'>
            <br></br>
            <div className='statistics-title'>
                Fantasy Draft Mini Game
            </div>
            <div className='yellow-line'>
            </div>

            {!lockFlag && !totalRatingUser ?
            <>
            { submitFlag ?
            <>
            <MediaQuery maxWidth={768}>
                <h4 className='price-drop-title'>- DRAFT YOUR TEAM FROM THE DROP-DOWN MENUS<br></br>
                                            - MUST DRAFT 10 PLAYERS WITHOUT EXCEEDING THE $35 CAP<br></br>
                                            - TOP 5 ROSTER SLOTS MAKE UP STARTING LINEUP, BOTTOM 5 ARE BENCH PLAYERS<br></br>
                                            - STARTERS' STATS WORTH TWICE AS MUCH AS BENCH PLAYERS<br></br>
                                            - DRAG AND DROP PLAYERS TO MOVE ROSTER POSITIONS, 'X' TO WAIVE PLAYER<br></br>
                                            - CLICK 'LOCK IN ROSTER' TO FACE OFF AGAINST THE COMPUTER
                </h4>
            </MediaQuery>
            
            <div className='fantasy-flex'>
                <div className='inner-fantasy-container'>
                    <MediaQuery minWidth={769}>
                    <h4 className='price-drop-title'>- DRAFT YOUR TEAM FROM THE DROP-DOWN MENUS<br></br>
                                                - MUST DRAFT 10 PLAYERS WITHOUT EXCEEDING THE $35 CAP<br></br>
                                                - TOP 5 ROSTER SLOTS MAKE UP STARTING LINEUP, BOTTOM 5 ARE BENCH PLAYERS<br></br>
                                                - STARTERS' STATS WORTH TWICE AS MUCH AS BENCH PLAYERS<br></br>
                                                - DRAG AND DROP PLAYERS TO MOVE ROSTER POSITIONS, 'X' TO WAIVE PLAYER<br></br>
                                                - CLICK 'LOCK IN ROSTER' TO FACE OFF AGAINST THE COMPUTER
                    </h4>
                    </MediaQuery>
                    <MediaQuery maxWidth={768}>
                    <div className='top-right'>
                        <ErrorMessages errorMessage={errorMessage} setErrorMessage={setErrorMessage} roster={roster} />
                        <UserSalary teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                        <UserCapSpace teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                        <LockButton lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                    </div>
                    </MediaQuery>
                    <div className='priceMenus'>
                        <Price selectedSeason={selectedSeason} 
                                roster={roster} setRoster={setRoster} 
                                teamSalary={teamSalary} 
                                setTeamSalary={setTeamSalary}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                usedPlayers={usedPlayers}
                                setUsedPlayers={setUsedPlayers}
                                selectedPlayer={selectedPlayer}
                                setSelectedPlayer={setSelectedPlayer}
                                oneDollarPlayers={oneDollarPlayers}
                                setOneDollarPlayers={setOneDollarPlayers}
                                twoDollarPlayers={twoDollarPlayers}
                                setTwoDollarPlayers={setTwoDollarPlayers}
                                threeDollarPlayers={threeDollarPlayers}
                                setThreeDollarPlayers={setThreeDollarPlayers}
                                fourDollarPlayers={fourDollarPlayers}
                                setFourDollarPlayers={setFourDollarPlayers}
                                fiveDollarPlayers={fiveDollarPlayers}
                                setFiveDollarPlayers={setFiveDollarPlayers}
                                sixDollarPlayers={sixDollarPlayers}
                                setSixDollarPlayers={setSixDollarPlayers}
                                sevenDollarPlayers={sevenDollarPlayers}
                                setSevenDollarPlayers={setSevenDollarPlayers}
                                 />
                    </div>
                </div>
                <div className='roster-container-padding'>
                    <div>
                        {submitFlag ?
                        <h2 className='team-name'>
                            {teamName.value}
                        </h2>
                        :
                        ''}
                    </div>
                    <div>
                        {roster.length > 0 ? <Dnd dragRoster={dragRoster} setDragRoster={setDragRoster} roster={roster} setRoster={setRoster} deletePlayer={deletePlayer} /> : ''}
                    </div>
                </div>
                <MediaQuery minWidth={769} >
                <div className='user-cap-container'>
                    <div className='top-right'>
                        <ErrorMessages errorMessage={errorMessage} setErrorMessage={setErrorMessage} roster={roster} />
                        <UserSalary teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                        <UserCapSpace teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                        <LockButton lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                    </div>
                    <br></br>
                    {ballers ?
                    <$35Ballers ballers={ballers} setBallers={setBallers} highscore={highscore} baller={baller} setBaller={setBaller} teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                    :
                    ''}
                </div>
                </MediaQuery>
            </div>
            </>
            :
            ''}
            
            <MediaQuery maxWidth={768}>
            {submitFlag ?
                <div className='user-cap-container'>
                    {ballers ?
                    <$35Ballers ballers={ballers} setBallers={setBallers} highscore={highscore} baller={baller} setBaller={setBaller} teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                    :
                    ''}
                </div>
            :
            ''}
            </MediaQuery>
            <br></br>
            {submitFlag ?
            <div className='ultimate-div'>
                <h1>
                    All Players
                </h1>
                <div>
                    {selectedSeason ? tableChoice : 'loading'}
                </div>
            </div>
            :
            ""}
            </>
            :
            <>
                <MediaQuery maxWidth={768}>
                <div className='fantasy-container'>

                    <div>
                        <div className='fireworks-container'>
                            <MatchupResults lockFlag={lockFlag} 
                                    setLockFlag={setLockFlag}
                                    dragRoster={dragRoster} 
                                    selectedSeason={selectedSeason} 
                                    roster={roster} 
                                    cpuRoster={cpuRoster} 
                                    setCpuRoster={setCpuRoster}
                                    gameResultsUser={gameResultsUser}
                                    setGameResultsUser={setGameResultsUser}
                                    gameResultsCpu={gameResultsCpu}
                                    setGameResultsCpu={setGameResultsCpu}
                                    totalRatingUser={totalRatingUser}
                                    setTotalRatingUser={setTotalRatingUser}
                                    totalRatingCpu={totalRatingCpu}
                                    setTotalRatingCpu={setTotalRatingCpu} />
                            <div className='resultsTable'>
                                <div className='results-div'>
                                    <div className='box-team-name'>
                                        {teamName.value}
                                    </div>
                                    { gameResultsUser.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsUser} /> : null }
                                </div>
                                <div className='results-div'>
                                    <div className='box-team-name'>
                                        {cpuName}
                                    </div>
                                    { gameResultsCpu.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsCpu} /> : null }
                                </div>
                            </div>
                        </div>
                        <div className='buttons-div'>
                            <button className="submitButton" onClick={handleClick}>Submit High Score</button>
                            <LockButton runItBack={true} lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                            <a href="/fantasy">
                            <button className="submitButton" >Reset Game</button>
                            </a>
                        </div>
                        <div>
                            {ballers ?
                            <$35Ballers ballers={ballers} setBallers={setBallers}  highscore={highscore} baller={baller} setBaller={setBaller} lockflag={lockFlag} teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                            :
                            ''}
                        </div>
                    </div>
                    <div className='matchup-flex'>
                        <div className='roster-container'>
                            <div>
                                {submitFlag ?
                                <h2 className='team-name'>
                                    {teamName.value}
                                </h2>
                                :
                                ''}
                            </div>
                            <div>
                                {roster.length > 0 ? <Dnd dragRoster={dragRoster} setDragRoster={setDragRoster} roster={roster} setRoster={setRoster} deletePlayer={deletePlayer} /> : ''}
                            </div>
                        </div>
                        <div className='vs'>
                            VS.
                        </div>
                        <div className='cpu-roster-div'>
                            <ComputerTeamName cpuRoster={cpuRoster} cpuName={cpuName} setCpuName={setCpuName} />
                                <ComputerRoster selectedSeason={selectedSeason}
                                                usedPlayers={usedPlayers}
                                                setUsedPlayers={setUsedPlayers}
                                                selectedPlayer={selectedPlayer}
                                                setSelectedPlayer={setSelectedPlayer}
                                                oneDollarPlayers={oneDollarPlayers}
                                                setOneDollarPlayers={setOneDollarPlayers}
                                                twoDollarPlayers={twoDollarPlayers}
                                                setTwoDollarPlayers={setTwoDollarPlayers}
                                                threeDollarPlayers={threeDollarPlayers}
                                                setThreeDollarPlayers={setThreeDollarPlayers}
                                                fourDollarPlayers={fourDollarPlayers}
                                                setFourDollarPlayers={setFourDollarPlayers}
                                                fiveDollarPlayers={fiveDollarPlayers}
                                                setFiveDollarPlayers={setFiveDollarPlayers}
                                                sixDollarPlayers={sixDollarPlayers}
                                                setSixDollarPlayers={setSixDollarPlayers}
                                                sevenDollarPlayers={sevenDollarPlayers}
                                                setSevenDollarPlayers={setSevenDollarPlayers}
                                                roster={roster}
                                                cpuRoster={cpuRoster}
                                                setCpuRoster={setCpuRoster}
                                                lockFlag={lockFlag}
                                                setLockFlag={setLockFlag} />
                        </div>
                    </div>
                </div>
                </MediaQuery>

                <MediaQuery minWidth={769}>
                <div className='fantasy-container'>
                    <div className='matchup-flex'>
                        <div className='roster-container'>
                            <div>
                                {submitFlag ?
                                <h2 className='team-name'>
                                    {teamName.value}
                                </h2>
                                :
                                ''}
                            </div>
                            <div>
                                {roster.length > 0 ? <Dnd dragRoster={dragRoster} setDragRoster={setDragRoster} roster={roster} setRoster={setRoster} deletePlayer={deletePlayer} /> : ''}
                            </div>
                        </div>
                        <div className='vs'>
                            VS.
                        </div>
                        <div className='cpu-roster-div'>
                            <ComputerTeamName cpuRoster={cpuRoster} cpuName={cpuName} setCpuName={setCpuName} />
                                <ComputerRoster selectedSeason={selectedSeason}
                                                usedPlayers={usedPlayers}
                                                setUsedPlayers={setUsedPlayers}
                                                selectedPlayer={selectedPlayer}
                                                setSelectedPlayer={setSelectedPlayer}
                                                oneDollarPlayers={oneDollarPlayers}
                                                setOneDollarPlayers={setOneDollarPlayers}
                                                twoDollarPlayers={twoDollarPlayers}
                                                setTwoDollarPlayers={setTwoDollarPlayers}
                                                threeDollarPlayers={threeDollarPlayers}
                                                setThreeDollarPlayers={setThreeDollarPlayers}
                                                fourDollarPlayers={fourDollarPlayers}
                                                setFourDollarPlayers={setFourDollarPlayers}
                                                fiveDollarPlayers={fiveDollarPlayers}
                                                setFiveDollarPlayers={setFiveDollarPlayers}
                                                sixDollarPlayers={sixDollarPlayers}
                                                setSixDollarPlayers={setSixDollarPlayers}
                                                sevenDollarPlayers={sevenDollarPlayers}
                                                setSevenDollarPlayers={setSevenDollarPlayers}
                                                roster={roster}
                                                cpuRoster={cpuRoster}
                                                setCpuRoster={setCpuRoster}
                                                lockFlag={lockFlag}
                                                setLockFlag={setLockFlag} />
                        </div>
                    </div>
                    <div>
                        <div className='results-style'>
                            <MatchupResults lockFlag={lockFlag} 
                                    setLockFlag={setLockFlag}
                                    dragRoster={dragRoster} 
                                    selectedSeason={selectedSeason} 
                                    roster={roster} 
                                    cpuRoster={cpuRoster} 
                                    setCpuRoster={setCpuRoster}
                                    gameResultsUser={gameResultsUser}
                                    setGameResultsUser={setGameResultsUser}
                                    gameResultsCpu={gameResultsCpu}
                                    setGameResultsCpu={setGameResultsCpu}
                                    totalRatingUser={totalRatingUser}
                                    setTotalRatingUser={setTotalRatingUser}
                                    totalRatingCpu={totalRatingCpu}
                                    setTotalRatingCpu={setTotalRatingCpu} />
                            <div className='resultsTable'>
                                <div className='results-div'>
                                    <div className='box-team-name'>
                                        {teamName.value}
                                    </div>
                                    { gameResultsUser.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsUser} /> : null }
                                </div>
                                <div className='results-div'>
                                    <div className='box-team-name'>
                                        {cpuName}
                                    </div>
                                    { gameResultsCpu.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsCpu} /> : null }
                                </div>
                            </div>
                        </div>
                        <div className='buttons-div'>
                            <button className="submitButton" onClick={handleClick}>Submit High Score</button>
                            <LockButton runItBack={true} lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                            <a href="/fantasy">
                                <button className="submitButton" >Reset Game</button>
                            </a>
                        </div>
                        <div>
                            {ballers ?
                            <$35Ballers ballers={ballers} setBallers={setBallers}  highscore={highscore} baller={baller} setBaller={setBaller} lockflag={lockFlag} teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                            :
                            ''}
                        </div>
                    </div>
                </div>
                </MediaQuery>

                <div className='ultimate-div'>
                    <h1>
                        All Players
                    </h1>
                    <div>
                        {selectedSeason ? tableChoice : 'loading'}
                    </div>
                </div>
            </>
            }
    
            {!submitFlag ?
            <div className='fantasy-home-flex'> 
                <div className='team-name-home'>
                    <TeamName submitFlag={submitFlag} setSubmitFlag={setSubmitFlag} teamName={teamName} setTeamName={setTeamName} />
                </div>
                <div style={{maxWidth: '300px'}}>

                    <$35Ballers  ballers={ballers} setBallers={setBallers}  highscore={highscore} baller={baller} setBaller={setBaller} lockflag={lockFlag} teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                </div>
            </div>
            :
            ""}
        </div>
    );
};



export default Fantasy;

/*
<br>

            
            </br>
            <div className="fantasyGrid">
                <div className="col25">
                    {roster.length > 0 ? <Dnd dragRoster={dragRoster} setDragRoster={setDragRoster} roster={roster} setRoster={setRoster} deletePlayer={deletePlayer} /> : ''}
                </div>
                <div className="col25">
                    <br>
                    </br>
                    <ErrorMessages errorMessage={errorMessage} setErrorMessage={setErrorMessage} roster={roster} />
                    <UserCapSpace teamSalary={teamSalary} setTeamSalary={setTeamSalary} deletePlayer={deletePlayer} />
                    <table className='resultsTable'>
                      { gameResultsUser.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsUser} /> : null }
                    </table>
                </div>
                <div className="col25">
                    <br>
                    </br>
                    <ComputerSalary cpuRoster={cpuRoster} />
                    <table className='resultsTable'>
                      { gameResultsCpu.length > 0 ? <ResultsTableBody columns={columns} tableData={gameResultsCpu} /> : null }
                    </table>
                </div>
                <div className="col25">
                    <ComputerTeamName cpuRoster={cpuRoster} cpuName={cpuName} setCpuName={setCpuName} />
                    <ComputerRoster selectedSeason={selectedSeason}
                                    usedPlayers={usedPlayers}
                                    setUsedPlayers={setUsedPlayers}
                                    selectedPlayer={selectedPlayer}
                                    setSelectedPlayer={setSelectedPlayer}
                                    oneDollarPlayers={oneDollarPlayers}
                                    setOneDollarPlayers={setOneDollarPlayers}
                                    twoDollarPlayers={twoDollarPlayers}
                                    setTwoDollarPlayers={setTwoDollarPlayers}
                                    threeDollarPlayers={threeDollarPlayers}
                                    setThreeDollarPlayers={setThreeDollarPlayers}
                                    fourDollarPlayers={fourDollarPlayers}
                                    setFourDollarPlayers={setFourDollarPlayers}
                                    fiveDollarPlayers={fiveDollarPlayers}
                                    setFiveDollarPlayers={setFiveDollarPlayers}
                                    sixDollarPlayers={sixDollarPlayers}
                                    setSixDollarPlayers={setSixDollarPlayers}
                                    sevenDollarPlayers={sevenDollarPlayers}
                                    setSevenDollarPlayers={setSevenDollarPlayers}
                                    roster={roster}
                                    cpuRoster={cpuRoster}
                                    setCpuRoster={setCpuRoster}
                                    lockFlag={lockFlag}
                                    setLockFlag={setLockFlag} />
                </div>
            </div>
            
            <br>
            </br>
            <MatchupResults lockFlag={lockFlag} 
                            setLockFlag={setLockFlag}
                            dragRoster={dragRoster} 
                            selectedSeason={selectedSeason} 
                            roster={roster} 
                            cpuRoster={cpuRoster} 
                            setCpuRoster={setCpuRoster}
                            gameResultsUser={gameResultsUser}
                            setGameResultsUser={setGameResultsUser}
                            gameResultsCpu={gameResultsCpu}
                            setGameResultsCpu={setGameResultsCpu}
                            totalRatingUser={totalRatingUser}
                            setTotalRatingUser={setTotalRatingUser}
                            totalRatingCpu={totalRatingCpu}
                            setTotalRatingCpu={setTotalRatingCpu} />
            <br>
            </br>
            <div className="centerText">
                <LockButton lockFlag={lockFlag} setLockFlag={setLockFlag} roster={roster} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                <br></br>
                <br></br>
                <SeasonsDropdown seasonsData={seasonsData} 
                                setSeasonsData={setSeasonsData} 
                                selectedSeason={selectedSeason} 
                                setSelectedSeason={setSelectedSeason} />
                <TableDropdown tables={tables} 
                                setTables={setTables} 
                                tableChoice={tableChoice} 
                                setTableChoice={setTableChoice} 
                                selectedSeason={selectedSeason} 
                                setSelectedSeason={setSelectedSeason} />
                <br></br>
            </div>
            <div className='statContainer'>
                <div className='grid80'>
                    {selectedSeason ? tableChoice : 'loading'}
                </div>
                <div className='grid20'>
                    <$35Ballers teamName={teamName} teamSalary={teamSalary} totalRatingUser={totalRatingUser} />
                </div>
            </div>
            */