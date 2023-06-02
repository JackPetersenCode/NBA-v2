import React, {useState, useEffect} from 'react';
import '../App.css';
import Table from '../components/Table';
import SeasonsDropdown from '../components/SeasonsDropdown';
import TableDropdown from '../components/TableDropDown';
import hoop from '../apis/hoop';
import LeadersStatTable from '../components/LeadersStatTable';
import SearchBar from '../components/SearchBar';
import CareerStats from '../components/CareerStats';

const Home = () => {

    const traditionalLabels = [
        {label: "POINTS PER GAME", accessor: "pts"},
        {label: "REBOUNDS PER GAME", accessor: "reb"},
        {label: "ASSISTS PER GAME", accessor: "ast"},
        {label: "STEALS PER GAME", accessor: "stl"},
        {label: "BLOCKS PER GAME", accessor: "blk"},
        {label: "FIELD GOAL PERCENTAGE", accessor: "fg_pct"},
        {label: "THREE POINTERS MADE", accessor: "fg3m"},
        {label: "THREE POINT PERCENTAGE", accessor: "fg3_pct"},
        {label: "PLUS-MINUS", accessor: "plus_minus"}
    ]

    const miscStatLabels = [
        {label: "POINTS OFF TURNOVERS", accessor: "pts_off_tov"},
        {label: "2ND CHANCE POINTS", accessor: "pts_2nd_chance"},
        {label: "FAST BREAK POINTS", accessor: "pts_fb"},
        {label: "PAINT POINTS", accessor: "pts_paint"},
        {label: "OPPONENT POINTS OFF TURNOVERS", accessor: "opp_pts_off_tov"},
        {label: "OPPONENT 2ND CHANCE POINTS", accessor: "opp_pts_2nd_chance"},
        {label: "OPPONENT FAST BREAK POINTS", accessor: "opp_pts_fb"},
        {label: "OPPONENT PAINT POINTS", accessor: "opp_pts_paint"},
        {label: "PERSONAL FOULS", accessor: "pf"}
    ]

    const hustleStatLabels = [
        {label: "CONTESTED SHOTS", accessor: "contested_shots"},
        {label: "DEFLECTIONS", accessor: "deflections"},
        {label: "CHARGES DRAWN", accessor: "charges_drawn"},
        {label: "SCREEN ASSISTS", accessor: "screen_assists"},
        {label: "SCREEN AST POINTS", accessor: "screen_ast_pts"},
        {label: "LOOSE BALLS RECOVERED", accessor: "loose_balls_recovered"},
        {label: "BOX OUT PLAYER REBOUNDS", accessor: "box_out_player_rebs"},
        {label: "BOX OUTS", accessor: "box_outs"},
        {label: "% BOX OUTS REBOUND", accessor: "pct_box_outs_reb"}
    ]

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);
    const [tableChoice, setTableChoice] = useState(<Table selectedSeason={selectedSeason}/>);
    const [tableName, setTableName] = useState('Traditional');
    const [tables, setTables] = useState([]);
    const [stats, setStats] = useState([]);
    const [miscStats, setMiscStats] = useState([]);
    const [hustleStats, setHustleStats] = useState([]);
    const [statLabels, setStatLabels] = useState(traditionalLabels);
    const [allPlayers, setAllPlayers] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');

    useEffect(() => {

        const getTraditionalLeaders = async() => {
            let pts = await hoop.get(`/api/statranked/ptsLeaders/${selectedSeason}`);
            console.log(pts.data)
            let reb = await hoop.get(`/api/statranked/rebLeaders/${selectedSeason}`);
            console.log(reb.data)
            let ast = await hoop.get(`/api/statranked/astLeaders/${selectedSeason}`);
            console.log(ast.data)
            let stl = await hoop.get(`/api/statranked/stlLeaders/${selectedSeason}`);
            console.log(stl.data)
            let blk = await hoop.get(`/api/statranked/blkLeaders/${selectedSeason}`);
            console.log(blk.data)
            let fg_pct = await hoop.get(`/api/statranked/fgPctLeaders/${selectedSeason}`);
            console.log(fg_pct.data)
            let fg3m = await hoop.get(`/api/statranked/fg3mLeaders/${selectedSeason}`);
            console.log(fg3m.data)
            let fg3_pct = await hoop.get(`/api/statranked/fg3PctLeaders/${selectedSeason}`);
            console.log(fg3_pct.data)
            let plus_minus = await hoop.get(`/api/statranked/plusMinusLeaders/${selectedSeason}`);
            console.log(plus_minus.data)
            setStats([pts.data, reb.data, ast.data, stl.data, blk.data, fg_pct.data, fg3m.data, fg3_pct.data, plus_minus.data])
            setStatLabels(traditionalLabels);
        }
        const getMiscLeaders = async() => {
            let tempStats = [];
            let category = 'boxscoremisc';
            for (let i = 0; i < miscStatLabels.length; i++) {
                console.log(`${miscStatLabels[i].accessor}/${selectedSeason}/${category}`)
                let results = await hoop.get(`/api/statranked/sumStat/${miscStatLabels[i].accessor}/${selectedSeason}/${category}`);
                console.log(results.data)
                tempStats = [...tempStats, results.data];
            }
/*
            let pts_off_tov = await hoop.get(`/api/statranked/ptsOffTovLeaders/${selectedSeason}`);
            console.log(pts_off_tov.data)
            let pts_2nd_chance = await hoop.get(`/api/statranked/pts2ndChance/${selectedSeason}`)
            console.log(pts_2nd_chance.data)
            let pts_fb = await hoop.get(`/api/statranked/ptsFbLeaders/${selectedSeason}`);
            console.log(pts_fb.data)
            let pts_paint = await hoop.get(`/api/statranked/ptsPaintLeaders/${selectedSeason}`);
            console.log(pts_paint.data)
            let opp_pts_off_tov = await hoop.get(`/api/statranked/oppPtsOffTov/Leaders/${selectedSeason}`);
            console.log(opp_pts_off_tov.data)
            let opp_pts_2nd_chance = await hoop.get(`/api/statranked/oppPts2ndChanceLeaders/${selectedSeason}`);
            console.log(opp_pts_2nd_chance.data)
            let opp_pts_fb = await hoop.get(`/api/statranked/oppPtsFbLeaders/${selectedSeason}`);
            console.log(opp_pts_fb.data)
            let opp_pts_paint = await hoop.get(`/api/statranked/oppPtsPaintLeaders/${selectedSeason}`);
            console.log(opp_pts_paint.data)
            let blk = await hoop.get(`/api/statranked/blkLeaders/${selectedSeason}`);
            console.log(blk.data)
            let blka = await hoop.get(`/api/statranked/blkaLeaders/${selectedSeason}`);
            console.log(blka.data)
            let pf = await hoop.get(`/api/statranked/pfLeaders/${selectedSeason}`);
            console.log(pf.data)
            let pfd = await hoop.get(`/api/statranked/pfdLeaders/${selectedSeason}`);
            console.log(pfd.data)*/
            //setStats([pts_off_tov.data, pts_2nd_chance.data, pts_fb.data, pts_paint.data, opp_pts_off_tov.data, opp_pts_2nd_chance.data, opp_pts_fb.data, opp_pts_paint.data, blk.data, blka.data, pf.data, pfd.data])
            setStats(tempStats);
            setStatLabels(miscStatLabels);
        }

        const getHustleLeaders = async() => {

            let tempStats = [];
            let category = 'leagueHustleStatsPlayer';
            for (let i = 0; i < hustleStatLabels.length; i++) {
                console.log(`${hustleStatLabels[i].accessor}/${selectedSeason}/${category}`)
                let results = await hoop.get(`/api/statranked/sumStat/${hustleStatLabels[i].accessor}/${selectedSeason}/${category}`);
                console.log(results.data)
                tempStats = [...tempStats, results.data];
            }
            /*
            let contested_shots = await hoop.get(`/api/statranked/contestedShotsLeaders/${selectedSeason}`);
            console.log(contested_shots.data)
            let deflections = await hoop.get(`/api/statranked/deflectionsLeaders/${selectedSeason}`);
            console.log(deflections.data)
            let charges_drawn = await hoop.get(`/api/statranked/chargesDrawnLeaders/${selectedSeason}`);
            console.log(charges_drawn.data)
            let screen_assists = await hoop.get(`/api/statranked/screenAssistsLeaders/${selectedSeason}`);
            console.log(screen_assists.data)
            let screen_ast_pts = await hoop.get(`/api/statranked/screenAstPtsLeaders/${selectedSeason}`);
            console.log(screen_ast_pts.data)
            let loose_balls_recovered = await hoop.get(`/api/statranked/looseBallsRecoveredLeaders/${selectedSeason}`);
            console.log(loose_balls_recovered.data)
            let box_out_player_rebs = await hoop.get(`/api/statranked/boxOutPlayerRebsLeaders/${selectedSeason}`);
            console.log(box_out_player_rebs.data)
            let box_outs = await hoop.get(`/api/statranked/boxOutsLeaders/${selectedSeason}`);
            console.log(box_outs.data)
            let pct_box_outs_reb = await hoop.get(`/api/statranked/pctBoxOutsRebLeaders/${selectedSeason}`);
            console.log(pct_box_outs_reb.data)
            */
            //setStats([contested_shots.data, deflections.data, charges_drawn.data, screen_assists.data, screen_ast_pts.data, loose_balls_recovered.data, box_out_player_rebs.data, box_outs.data, pct_box_outs_reb.data])
            setStats(tempStats);
            setStatLabels(hustleStatLabels);
        }
        if (tableName === 'Traditional') {
            getTraditionalLeaders();
        } else if (tableName === 'Miscellaneous') {
            getMiscLeaders();
        } else {
            getHustleLeaders();
        }
    }, [selectedSeason, tableName])


    useEffect(() => {
        const getAllPlayers = async() => {
            let results = await hoop.get(`/api/playersNBA/allPlayers`);
            setAllPlayers(results.data);
        }
        getAllPlayers();
    }, [])

    return (
        <>
        <br></br>
        <div>
            <div className='statistics-title'>
                NBA Advanced Statistics
            </div>
            <div className='yellow-line'>
            </div>
            <div className="search-container">
                <SearchBar allPlayers={allPlayers} inputText={inputText} setInputText={setInputText} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
            </div>
            <div className='dropDownFlex'>
              <div className='home-season-div'>
              <SeasonsDropdown seasonsData={seasonsData} 
                                  setSeasonsData={setSeasonsData} 
                                  selectedSeason={selectedSeason} 
                                  setSelectedSeason={setSelectedSeason} />
              </div>
              <div className='home-table-div'>
              <TableDropdown tableName={tableName}
                                  setTableName={setTableName}     
                                  tables={tables} 
                                  setTables={setTables} 
                                  tableChoice={tableChoice} 
                                  setTableChoice={setTableChoice} 
                                  selectedSeason={selectedSeason} 
                                  setSelectedSeason={setSelectedSeason} />
              </div>
            </div>
            <div className="table-container">
                <div>
                {
                  selectedPlayer ? <CareerStats player_id={selectedPlayer.playerid} selectedPlayer={selectedPlayer.full_name} />
                  :
                  ''
                }
                </div>
                <h2 className="shots-player">
                    {selectedSeason + ' League Leaders'}
                </h2>
                <div className="leaders-grid">
                  {stats.length > 0 ? stats.map((stat, index) => (
                    <div key={index} className="leaders-stat">
                      <LeadersStatTable stat={stat} index={index} statLabels={statLabels} selectedSeason={selectedSeason} />
                    </div>
                  )) : 'loading'}
                </div>
                <br></br>
                <h1>
                    All Players
                </h1>
                <div className="ultimate-div">
                    {selectedSeason ? tableChoice : 'loading'}
                </div>
          </div>
        </div>
    </>
    )
}

export default Home;