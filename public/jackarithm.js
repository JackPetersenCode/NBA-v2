const homeRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const visitorRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const boxTraditionalSeasonAverageTableHome = document.getElementById("boxTraditionalSeasonAverageTableHome");
const boxTraditionalSeasonAverageTable_82Home = document.getElementById("boxTraditionalSeasonAverageTable_82Home");
const boxTraditionalSeasonAverageTableVisitor = document.getElementById("boxTraditionalSeasonAverageTableVisitor");
const boxTraditionalSeasonAverageTable_82Visitor = document.getElementById("boxTraditionalSeasonAverageTable_82Visitor");

const homeTeamSeasonGameResultsTable = document.getElementById("gameResultsHomeTeamPerSeasonTable");
const visitorTeamSeasonGameResultsTable = document.getElementById("gameResultsVisitorTeamPerSeasonTable");
const teamsP240ExpectedTable = document.getElementById("teamsp240expectedtable");
const getBoxTraditionalButtonHome = document.getElementById("getBoxTraditionalButtonHome");
const getBoxTraditionalButtonVisitor = document.getElementById("getBoxTraditionalButtonVisitor");
const getP240ExpectedButton = document.getElementById("getP240ExpectedButton");
const p240StatSelected = document.getElementById("p240StatDropDown");
const boxTraditionalSeasonAverageTable = document.getElementById("boxTraditionalSeasonAverageTable");
const boxTraditionalSeasonAverageTable_82 = document.getElementById("boxTraditionalSeasonAverageTable_82");
const getHomeTeamGameResultsButton = document.getElementById("getHomeTeamGameResults");
const getVisitorTeamGameResultsButton = document.getElementById("getVisitorTeamGameResults");
const p240ExpectedTableHome = document.getElementById("p240ExpectedTableHome");
const p240ExpectedTableVisitor = document.getElementById("p240ExpectedTableVisitor");
const seasonDropChoice = document.getElementById("seasonGameResults");

const homeTeam = document.getElementById("homeTeamJackarithm");
const visitorTeam = document.getElementById("visitorTeamJackarithm");
const compareP240ExpectedResultsToGameResultsButton = document.getElementById("compareP240ExpectedResultsToGameResultsButton");
const compareResultsTable = document.getElementById("compareResultsTable");
const writeOddsToDatabaseButton = document.getElementById("writeOddsToDatabaseButton");
const compareP240ResultsBySeasonButton = document.getElementById("compareP240ResultsBySeasonButton");

const compareStatExpectedResultsToGameResultsButton = document.getElementById("compareExpectedResultsToGameResultsButton");
const compareStatResultsBySeasonButton = document.getElementById("compareResultsBySeasonButton");
const compareP240ResultsBySeasonTotalsButton = document.getElementById("compareP240ResultsBySeasonTotalsButton");



const getJsonResponseJackarithm = async (url) => {
    const response = await fetch(url);
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}
/*
const getRoster = async(season, team) => {
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${team}`);
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    for (let i = 0; i < roster.length; i++) {
        let appendedPlayer = await appendPlayerRosterTable(roster[i].player_id, roster[i].player_name);
        let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id);
        console.log(playerStats);
        console.log(playerStats[0])
        console.log(playerStats[1])
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        totalMinutes_82 += playerStats[1].min;
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name);
    }
    console.log(totalMinutes);
    console.log(totalMinutes_82);
}
*/

const getRosterFromPreviousGame = async(teamId, gameDate) => {
    console.log(teamId)
    console.log(gameDate)
    //THIS IS HOW YOU GET THE MOST RECENT GAME_ID/ROSTER FROM BOXSCORESTRADITIONAL WHEN THE SEASON STARTS
/*
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`);
    let season = '2022-2023';
    let teamId = '1610612744'

    let recentGameId = await getJsonResponseJackarithm(`/previousgame/gameid/${season}/${teamId}`);
    console.log(recentGameId);
    recentGameId = recentGameId[0].game_id;
    let roster = await getJsonResponseJackarithm(`/previousgame/gameid/${season}/${teamId}/${recentGameId}`);
    console.log(roster);

    return roster;
*/  
    let gameDateArray = [];
    let splitGameDate = gameDate.split('-');
    let day = splitGameDate[2];
    let thirtyOneDayMonths = ['01', '03', '05', '07', '08', '10', '12'];
    let thirtyDayMonths = ['09', '04', '06', '11'];
    let february = '02';
    let zeroMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
    let month;
    let newMonth;
    for (let i = 1; i < 6; i++) {
       
        if (zeroMonths.includes(day.toString())) {
            day = day.substring(1);
        }
        let previousDay = parseInt(day) - i;

        if (previousDay < 1) {
            if (zeroMonths.includes(splitGameDate[1])) {
                month = splitGameDate[1].substring(1);
                let intMonth = parseInt(month);
                let previous = intMonth - 1;
                if (previous === 0) {
                    previous = 12;
                }
                if (previous < 10) {
                    newMonth = `0${previous}`;
                }
            }
        } else {
            newMonth = splitGameDate[1];
        }

        if (previousDay === 0) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 31;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 30;
            } else {
                previousDay = 28;
            }
        }
        else if (previousDay === -1) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 30;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 29;
            } else {
                previousDay = 27;
            }
        }
        else if (previousDay === -2) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 29;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 28;
            } else {
                previousDay = 26;
            }
        }
        else if (previousDay === -3) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 28;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 27;
            } else {
                previousDay = 25;
            }
        }
        else if (previousDay === -4) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 27;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 26;
            } else {
                previousDay = 24;
            }
        }
    
        let lastGameDate;
        if (previousDay < 10) {
            lastGameDate = splitGameDate[0] + '-' + newMonth + '-0' + previousDay.toString();
        } else {
            lastGameDate = splitGameDate[0] + '-' + newMonth + '-' + previousDay.toString();
        }
        gameDateArray.push(lastGameDate);
    }
    /*AGAIN, this entire part of the function only applies to development; I only need the game date when I need to splice the entire
    season's worth of boxscores, so during production (current season) I can just grab the last box score gameId from the boxscorestraditional
    table, as there will only be the current amount of games available.*/
    let roster;
    for (let j = 0; j < gameDateArray.length; j++) {
        let recentGameId = await getJsonResponseJackarithm(`/api/leagueGames/testing/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${gameDateArray[j]}`);
        if (recentGameId) {
            recentGameId = recentGameId[0].game_id;
            roster = await getJsonResponseJackarithm(`/api/boxPlayers/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${recentGameId}`);
            return roster;
        }
    }
    /* If you don't get a 'recentgameid' from the loop above, use overall roster from current season.*/
    roster = await getJsonResponseJackarithm(`/api/boxPlayers/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`)
    return roster;
}

const getRosterNoParams = async(H_or_V) => {
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/api/leagueGames/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/api/boxPlayers/getroster/${season}/${teamId[0].team_id}`);
    for (let i = 0; i < roster.length; i++) {
        let appendedPlayer = await appendPlayerRosterTable(roster[i].player_id, roster[i].player_name, H_or_V);
    }
}

getBoxTraditionalButtonHome.onclick = async() => {
    let HorV = 'home';

    let team = document.getElementById(`${HorV}TeamJackarithm`);
    let teamId = await getJsonResponse(`/api/leagueGames/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/api/boxPlayers/getroster/${season}/${teamId[0].team_id}`);

    let table = "boxscorestraditional2021-2022"

    let stats = await getJsonResponseJackarithm(`/api/statsheaders/${table}`)

    await appendBoxTraditionalHeaders(HorV, stats);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, HorV);
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, HorV);
    }
}

getBoxTraditionalButtonVisitor.onclick = async() => {
    let HorV = 'visitor';

    let team = document.getElementById(`${HorV}TeamJackarithm`);
    let teamId = await getJsonResponse(`/api/leagueGames/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/api/boxPlayers/getroster/${season}/${teamId[0].team_id}`);

    let table = "boxscorestraditional2021-2022"

    let stats = await getJsonResponseJackarithm(`/api/statsheaders/${table}`)

    await appendBoxTraditionalHeaders(HorV, stats);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, HorV);
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, HorV);
    }
}


//for one player, return every stat average per season
/*const getPlayerSeasonOffensiveStatAveragesTraditional = async(season, playerid, H_or_V) => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`);
    let playerStats = await getStatsFromBoxTraditional(season, playerid);
    
    let averagesObjectAny = {};
    let averagesObject_82Any = {};
    let averagesObjectAny_HorV = {};
    let averagesObject_82Any_HorV = {};
 
    let gameCount = 0;
    let gameCount_HorV = 0;
    let gameCount_total_HorV = 0;
    let stats_82 = [];
    let statsPerGame = [];
    let statsHeaders = [];
    let stats_82_HorV = [];
    let statsPerGame_HorV = [];
    let statsHeaders_HorV = [];

    for (let j = 0; j <stats.length; j++) {

        statsHeaders.push(stats[j].column_name)
        stats_82.push(0);
        statsPerGame.push(0);
        stats_82_HorV.push(0);
        statsPerGame_HorV.push(0);
        statsHeaders_HorV.push(0);

    }    
    
    let team_id = playerStats[0].team_id;
    let horv_gameids;

    for (let i = 0; i < playerStats.length; i++) {
        if (H_or_V === 'home') {
            horv_gameids = await getJsonResponseJackarithm(`/home/gameids/${season}/${team_id}`);
        } else {
            horv_gameids = await getJsonResponseJackarithm(`/visitor/gameids/${season}/${team_id}`)
        }

        let result = horv_gameids.map(a => a.game_id);
        if (result.includes(playerStats[i].game_id)) {

            gameCount_total_HorV++;
            if (parseFloat(playerStats[i].min) > 0) {
                gameCount_HorV++;
            }

            if (!playerStats[i].min) {
                playerStats[i].min = 0;
            }

            for (let j = 0; j < stats.length; j++) {
                if (stats[j].column_name === 'points') {
                    stats[j].column_name = 'pts';
                }

                if (!parseFloat(playerStats[i][stats[j].column_name])) {
                    playerStats[i][stats[j].column_name] = 0;
                }
                stats_82_HorV[j] += parseFloat(playerStats[i][stats[j].column_name]);

                if (parseFloat(playerStats[i].min) > 0) {
                    statsPerGame_HorV[j] += parseFloat(playerStats[i][stats[j].column_name]);
                }
            }
        }
        if (parseFloat(playerStats[i].min) > 0) {
            gameCount++;
        }
    
        if (!playerStats[i].min) {
            playerStats[i].min = 0;
        }
    
        for (let j = 0; j < stats.length; j++) {
            if (stats[j].column_name === 'points') {
                stats[j].column_name = 'pts';
            }
        
            if (!parseFloat(playerStats[i][stats[j].column_name])) {
                playerStats[i][stats[j].column_name] = 0;
            }
            stats_82[j] += parseFloat(playerStats[i][stats[j].column_name]);
        
            if (parseFloat(playerStats[i].min) > 0) {
                statsPerGame[j] += parseFloat(playerStats[i][stats[j].column_name]);
            }
        }
        //total of minutes per 82 games of every player on roster
    }

    let gamesInSeasonCount = await getJsonResponseJackarithm(`/lengthofseason/${season}`);

    for (let k = 0; k < stats_82.length; k++) {
        let header = statsHeaders[k];
        let statAverage_82 = stats_82[k] / gamesInSeasonCount;
        let statAverage = statsPerGame[k] / gameCount;
        let statAverage_82_HorV = stats_82_HorV[k] / gameCount_total_HorV;
        let statAverage_HorV = statsPerGame_HorV[k] / gameCount_HorV;

        averagesObjectAny[header] = statAverage;
        averagesObject_82Any[header] = statAverage_82;
        averagesObjectAny_HorV[header] = statAverage_HorV;
        averagesObject_82Any_HorV[header] = statAverage_82_HorV;
    }
    return [averagesObjectAny, averagesObject_82Any, averagesObjectAny_HorV, averagesObject_82Any_HorV];
}
*/
const getStatsFromBoxTraditional = async(season, playerid) => {
    let stats = await getJsonResponseJackarithm(`/api/boxScoresTraditional/jackarithm/${playerid}/${season}`);
    return stats;
}

rosterHomeRowIndex = 0;
rosterVisitorRowIndex = 0;
const appendPlayerRosterTable = async(playerid, player, H_or_V) => {
    let row;
    if (H_or_V === 'home') {
        row = seasonHomeTeamRosterTable.insertRow(rosterHomeRowIndex);
        rosterHomeRowIndex += 1;
    } else {
        row = seasonVisitorTeamRosterTable.insertRow(rosterVisitorRowIndex);
        rosterVisitorRowIndex += 1;
    }
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player;
    cell2.innerHTML = playerid;
    return 'appended';
}


const appendBoxTraditionalHeaders = async(H_or_V, stats) => {
    let headerRow
    let headerRow_82 
    if (H_or_V === 'home') {
        headerRow = boxTraditionalSeasonAverageTableHome.insertRow();
        headerRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow();
    } else if (H_or_V === 'visitor') {
        headerRow = boxTraditionalSeasonAverageTableVisitor.insertRow();
        headerRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow();
    }
    let headerRowSeason = boxTraditionalSeasonAverageTable.insertRow();
    let headerRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow();
    let cellNull = headerRow.insertCell()
    let cellNull_82 = headerRow_82.insertCell();
    let cellNullSeason = headerRowSeason.insertCell()
    let cellNullSeason_82 = headerRow_82Season.insertCell();
    cellNull.innerHTML = 'NBA'
    cellNull_82 = 'NBA'
    cellNullSeason = 'NBA'
    cellNullSeason_82 = 'NBA'

    for (let i = 0; i < stats.length; i++) {
       
        let cellHeader = headerRow.insertCell()
        let cellHeader_82 = headerRow_82.insertCell();
        cellHeader.innerHTML = stats[i].column_name
        cellHeader_82.innerHTML = stats[i].column_name
        let cellHeaderSeason = headerRowSeason.insertCell();
        cellHeaderSeason.innerHTML = stats[i].column_name
        let cellHeaderSeason_82 = headerRow_82Season.insertCell()
        cellHeaderSeason_82.innerHTML = stats[i].column_name
    }
}

const appendPlayerBoxTraditionalSeasonAverageTable = async(objArray, player_name, H_or_V) => {
    let statRow 
    let statRow_82
    
    if (H_or_V === 'home') {
        statRow = boxTraditionalSeasonAverageTableHome.insertRow();
        statRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow();
    } else if (H_or_V === 'visitor') {
        statRow = boxTraditionalSeasonAverageTableVisitor.insertRow();
        statRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow();
    }

    //let nameRowSeason = boxTraditionalSeasonAverageTable.insertRow(0);
    
    //let statRowSeason = boxTraditionalSeasonAverageTable.insertRow();
   
    //let nameRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow(0);
    //let statRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow();

    let cellStatPlayerName = statRow.insertCell()
    let cellStatPlayerName_82 = statRow_82.insertCell()

    //let cellStatPlayerNameSeason = statRowSeason.insertCell()
    //let cellStatSeasonPlayerName_82 = statRow_82Season.insertCell()

    cellStatPlayerName.innerHTML = player_name
    cellStatPlayerName_82.innerHTML = player_name
    //cellStatPlayerNameSeason.innerHTML = player_name
    //cellStatSeasonPlayerName_82.innerHTML = player_name

    for (let i = 0; i < Object.keys(objArray[0]).length; i++) {
        let cellStat = statRow.insertCell()

        let cellStat_82 = statRow_82.insertCell()

        cellStat.innerHTML = Object.values(objArray[0])[i]
        
        cellStat_82.innerHTML = Object.values(objArray[1])[i]

        /*let cellStatSeason = statRowSeason.insertCell()
        let cellStatSeason_82 = statRow_82Season.insertCell()
        cellStatSeason.innerHTML = Object.values(objArray[2])[i]
        
        cellStatSeason_82.innerHTML = Object.values(objArray[3])[i]
        */
    }
    return 'appended';
}

let teamArray = [];
const teamsDropDown = async() => {

    let teams = await getJsonResponseJackarithm('/api/teamnames');
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    homeTeam.innerHTML = str;
    visitorTeam.innerHTML = str;

    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      homeTeam.innerHTML = str;
      visitorTeam.innerHTML = str;

    } catch(error) {
      console.log(error);
    }
}

getHomeTeamGameResultsButton.onclick = async() => {
    await getSeasonGameResultsByTeamHome();
}

getVisitorTeamGameResultsButton.onclick = async() => {
    await getSeasonGameResultsByTeamVisitor();
}

const getSeasonGameResultsByTeamHome = async() => {
    
    let season = seasonGameResults.value;
    //get league games

    let results = await getJsonResponseJackarithm(`/api/leagueGames/gameResults/home/${homeTeam.value}/${season}`)

    let headers = homeTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResultsHome(results[i]);
    }
}

const appendSeasonGameResultsHome = async(game) => {
    
    let row = homeTeamSeasonGameResultsTable.insertRow();
    for (let i = 0; i < Object.keys(game).length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = Object.values(game)[i];
    }
    return (game);

}

const getSeasonGameResultsByTeamVisitor = async() => {
    
    let season = seasonGameResults.value;
    //get league games

    let results = await getJsonResponseJackarithm(`/api/leagueGames/gameResults/visitor/${visitorTeam.value}/${season}`)

    let headers = visitorTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResultsVisitor(results[i]);
    }
}

const appendSeasonGameResultsVisitor = async(game) => {
    
    let row = visitorTeamSeasonGameResultsTable.insertRow();
    for (let i = 0; i < Object.keys(game).length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = Object.values(game)[i];
    }
    return (game);

}

getP240ExpectedButton.onclick = async() => {
    teamsP240ExpectedTable.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected(stat);
}

getP240ExpectedHomeButton.onclick = async() => {
    p240ExpectedTableHome.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected_HorV(stat, 'home');
}

getP240ExpectedVisitorButton.onclick = async() => {
    p240ExpectedTableVisitor.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected_HorV(stat, 'visitor');
}

const appendExpectedStat = async(team, pp240expected) => {
    let row = teamsP240ExpectedTable.insertRow();
    let cell = row.insertCell(0)
    cell.innerHTML = team;
    let cell2 = row.insertCell(1)
    cell2.innerHTML = pp240expected;
   
}


const getStatP240Expected = async(stat) => {
    let teams = await getJsonResponseJackarithm('/api/teamnames');
    let season = '2018-2019';
    let previousSeason = '2017-2018';
    for (let x = 0; x < teams.length; x++) {
        let teamId = await getJsonResponseJackarithm(`/api/leagueGames/teamid/${teams[x].team_name}`)
        let totalMinutes = 0;
        let totalMinutes_82 = 0;
        let totalStat = 0;
        let totalStat_82 = 0;
        let roster = await getJsonResponseJackarithm(`/api/boxScoresTraditional/getroster/${season}/${teamId[0].team_id}`);
        for (let i = 0; i < roster.length; i++) {
            let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(previousSeason, roster[i].player_id);
            totalMinutes += playerStats[0].min;
            //total of minutes per 82 games of every player on roster
            totalMinutes_82 += playerStats[1].min;
            totalStat += playerStats[0][stat];
            totalStat_82 += playerStats[1][stat];
        }
        let ratio_82 = totalStat_82 / totalMinutes_82;

        let statPer240Expected = ratio_82 * 240;
      
        let results = await appendExpectedStat(teams[x].team_name, statPer240Expected);
    }
}

const getStatP240Expected_HorV = async(stat, H_or_V) => {
    let team;
    if (H_or_V === 'home') {
        team = homeTeam.value;
    } else {
        team = visitorTeam.value;
    }

    let season = '2017-2018';
    let previousSeason = '2016-2017';
    let teamId = await getJsonResponseJackarithm(`/api/leagueGames/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat = 0;
    let totalStat_82 = 0;
    let roster = await getJsonResponseJackarithm(`/api/boxScoresTraditional/getroster/${season}/${teamId[0].team_id}`);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(previousSeason, roster[i].player_id, H_or_V);
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        totalMinutes_82 += playerStats[1].min;
        totalStat += playerStats[0][stat];
        totalStat_82 += playerStats[1][stat];
    }
    let ratio_82 = totalStat_82 / totalMinutes_82;
    let statPer240Expected = ratio_82 * 240;
    
    if (H_or_V === 'home') {
        await appendExpectedStatHome(team, statPer240Expected);
    } else {
        await appendExpectedStatVisitor(team, statPer240Expected);    
    }
}

const appendExpectedStatHome = async(team, pp240expected) => {
    let row = p240ExpectedTableHome.insertRow();
    let cell = row.insertCell()
    cell.innerHTML = team;
    let cell2 = row.insertCell()
    cell2.innerHTML = pp240expected;
  
}

const appendExpectedStatVisitor = async(team, pp240expected) => {
    let row = p240ExpectedTableVisitor.insertRow();
    let cell = row.insertCell(0)
    cell.innerHTML = team;
    let cell2 = row.insertCell(1)
    cell2.innerHTML = pp240expected;

}

//for each p240 stat,
    //for all matchups between home and visitor teams
        //compare expected result to actual result
        //FOUR CELLS PER ROW:
        //append actual
        //append expected
        //append GREEN for a successful prediction
        //append RED for an unsuccessful prediction

const getStatExpectedNoAppend = async(stat, H_or_V, gameDate, visitorteam) => {
    let team;

    if (visitorteam) {
        if (H_or_V === 'home') {
            team = homeTeam.value;
        } else {
            team = visitorteam;
        }
    } else {
        if (H_or_V === 'home') {
            team = homeTeam.value;
        } else {
            team = visitorTeam.value;
        }
    }

    let season = '2017-2018';
    let teamId = await getJsonResponseJackarithm(`/api/leagueGames/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat = 0.0;
    let totalStat_82 = 0;
    //let roster = await getJsonResponseJackarithm(`/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`);
    let roster = await getRosterFromPreviousGame(teamId, gameDate);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V);
     
        //totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        //totalMinutes_82 += playerStats[1].min;
        if (playerStats[0][stat]) {
            totalStat += playerStats[0][stat];
            totalStat_82 += playerStats[1][stat];
        }
    }
    let statPerGameExpected = totalStat;
    let statObject = {};
    statObject[stat] = statPerGameExpected;
    return [statObject, season]
}

const getStatP240ExpectedNoAppend = async(stat, H_or_V, gameDate, hometeam, visitorteam) => {
    let team;

    /*This function is called every time you need to predict an expected p240 stat prediction for a given team.
    It is called once for the home team and once for the visitor team. (in compareP240ExpectedResultsToGameResults())
    If actualResults is longer than 1, (which means there was more than one game of the given matchup at home), this function
    will be called twice more, once for the home team, once for visitor team to get expected stats for that game.
    
    If there was not a homeTeam selected in the drop down menu, that means you are getting all the season predicitions
    for every single team / game in the given season. If H_or_V parameter is 'home', you are getting the expected stat for
    the hometeam (passed into the function), and if the H_or_V parameter is 'visitor' you are getting the expected stat for the
    visitor team that is pass into the function. */
    if (homeTeam.value == "none") {
        if (H_or_V === 'home') {
            team = hometeam;
        } else {
            team = visitorteam;
        }
    /*If homeTeam has been selected from the drop down, that means we are either getting all game predictions for the given
    home team / season, or we visitorTeam has also been selected from the drop down and we are getting the prediction for the specific
    matchup selected between the two selected teams in the given season. */
    } else {
        //if visitor team is passed in and exists, you know its the whole season you're after.
        if (visitorteam) {
            if (H_or_V === 'home') {
                team = homeTeam.value;
            } else {
                team = visitorteam;
            }
        } else {
        //else, if visitor team is not passed in, that means you are getting the specific matchup between two selected teams, and the teams
        //from the drop down menus will be used.
            if (H_or_V === 'home') {
                team = homeTeam.value;
            } else {
                team = visitorTeam.value;
            }
        }
    }
    /* This selection of the season is the season used to get boxscorestraditional from, as well as the roster.*/
    let season = seasonDropChoice.value;
    let teamId = await getJsonResponseJackarithm(`/api/leagueGames/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat1 = 0;
    let totalStat_82_1 = 0;
    let totalStat2 = 0;
    let totalStat_82_2 = 0;

    /* This call to the database retreives the active roster from the previous game, given the team id and the current game date/
    During production during the current season, this will return a roster from the latest game's box score.*/
    let roster = await getRosterFromPreviousGame(teamId, gameDate);

    /* This call to the database retreives the previous game id given the season (current season), team id, and the current gameDate
    DURING THE CURRENT SEASON/PRODUCTION, YOU WILL NOT NEED THIS NEXT CHUNK OF CODE, ALREADY HAVE RECENT GAMEID, ROSTER.*/
    //===================================================================================================================
    let recentGameId = await getJsonResponseJackarithm(`/api/leagueGames/testing/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${gameDate}`);
    recentGameId = recentGameId[0].game_id.substring(2)
    let gameid = parseInt(recentGameId);
    let boxNum = await getJsonResponseJackarithm(`/api/boxScoresTraditional/boxnum/${gameid}/${season}/${teamId[0].team_id}/${H_or_V}`);
    if (!boxNum) {
        boxNum = [{ count: 0 }];
    }
    //====================================================================================================================


    /*HERE WE GO!!!! FOR EVERY SINGLE PLAYER ON THE CURRENT ROSTER, CALL 'getPlayerHorVOffensiveStatAveragesTraditional' function */
    let backupStat = 'plus_minus'
    for (let i = 0; i < roster.length; i++) {
        /**This call to the database will return 4 box score averages objects, each containing the per game or per 82 game averages for 
         * every traditional box score stat for the given player/season. The first averages object contains the per game box score averages
         * for the previous season's stats, the second averages object contains the per 82 game averages for the previous season's stats.
         * The third averages object contains the per game box score averages for the current season's stats, and the fourth averages object
         * contains the per 82 game box score averages for the current season's stats, (by player/season). 
         * */
        console.log(season)
        console.log(roster[i].player_id)
        console.log(H_or_V)
        console.log(teamId)
        console.log(boxNum[0].count)
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V, teamId, boxNum[0].count);
        if (!playerStats) {
            continue;
        }
        //total of minutes per game of every player on roster during previous season
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster during previous season
        totalMinutes_82 += playerStats[1].min;

        //add up season stat averages per game for every player on current roster using last year's stat averages.
        totalStat2 += playerStats[0][backupStat];
        //add up season stat averages per 82 games for every player on current roster using last year's stat averages.
        totalStat_82_2 += playerStats[1][backupStat];

        /**If player stat averages from current season does not exist (recent call up, player's first game off of injury), insert last year's stat
         * insert last year's stat averages into current season's non-existing stat averages. 
         * */
        if (!playerStats[2][stat]) {
            playerStats[2][stat] = playerStats[0][backupStat];
            playerStats[3][stat] = playerStats[1][backupStat];
            //playerStats[2][stat] = '0.2500';
            //playerStats[3][stat] = '0.2500';
            console.log('BACKUP STAT======================BACKUP STAT')
        }
        /* add up season stat averages per game for every player on current roster using current season's stat averages, if the stat averages didn't
        exist when retreived from database, they are swapped out for last year's stats in the step above. */
        totalStat1 += playerStats[2][stat];
        /* add up season stat averages per 82 games for every player on current roster using current season's stat averages, if the stat averages didn't
        exist when retreived from database, they are swapped out for last year's stats in the step above. */
        totalStat_82_1 += playerStats[3][stat];
    }

    /* Divide total of stat averages per 82 games for entire roster (totalStat_82_1) by the total minutes of all players on roster for all 82 games
     * (totalMinutes_82) */
    let ratio_82_1 = totalStat_82_1 / totalMinutes_82;
    /**
     * p240 formula:
     * totalStat_82_1 / totalMinutes_82 = X / 240;
     * X = (totalStat_82_1 / totalMinutes_82) * 240;
     */
    let statPer240Expected1 = ratio_82_1 * 240;
    let statObject1 = {};
    statObject1[stat] = statPer240Expected1;

    let ratio_82_2 = totalStat_82_2 / totalMinutes_82;
    let statPer240Expected2 = ratio_82_2 * 240;
    let statObject2 = {};
    statObject2[backupStat] = statPer240Expected2;
    return [statObject1, statObject2, season]
}

compareP240ResultsBySeasonTotalsButton.onclick = async() => {
    let stat = 'plus_minus';
    let teamsH = await getJsonResponseJackarithm('/api/teamnames');
    
    for (let i = 0; i < teamsH.length; i++) {
        let hometeam = teamsH[i];
        hometeam = hometeam.team_name;
        let teamsV = await getJsonResponseJackarithm('/api/teamnames');
        for (let j = 0; j < teamsV.length; j++) {
            if (teamsV[j].team_name === hometeam) {
                let index = teamsV.indexOf(teamsV[j]);
                teamsV.splice(index, 1);
            }
        }
        let stuff;
        for (let k = 0; k < teamsV.length; k++) {
            console.log(stat)
            console.log(hometeam)
            console.log(teamsV[k].team_name);
            stuff = await compareP240ExpectedResultsToGameResults(stat, hometeam, teamsV[k].team_name);
            console.log(stuff);
            if (stuff == null) {
                continue;
            }
            let results = await oddStuff(stuff, stat, hometeam, teamsV[k].team_name);
        }
    }
}

compareStatResultsBySeasonButton.onclick = async() => {
    let stat = 'plus_minus';
    let hometeam = homeTeam.value;
    let teams = await getJsonResponseJackarithm('/api/teamnames');
    for (let j = 0; j < teams.length; j++) {
        if (teams[j].team_name === hometeam) {
            let index = teams.indexOf(teams[j]);
            teams.splice(index, 1);
        }
    }

    let stuff;
    for (let i = 0; i < teams.length; i++) {
        stuff = await compareStatExpectedResultsToGameResults(stat, hometeam, teams[i].team_name);
        let results = await oddStuff(stuff, stat, teams[i].team_name);
    }
}

compareP240ResultsBySeasonButton.onclick = async() => {
    let stat = 'plus_minus';
    let hometeam = homeTeam.value;
    let teams = await getJsonResponseJackarithm('/api/teamnames');
    for (let j = 0; j < teams.length; j++) {
        if (teams[j].team_name === hometeam) {
            let index = teams.indexOf(teams[j]);
            teams.splice(index, 1);
        }
    }

    let stuff;
    for (let i = 0; i < teams.length; i++) {
        stuff = await compareP240ExpectedResultsToGameResults(stat, hometeam, teams[i].team_name);
        let results = await oddStuff(stuff, stat, hometeam, teams[i].team_name);
    }
}

compareP240ExpectedResultsToGameResultsButton.onclick = async() => {
    let stat = 'plus_minus'
    let stuff = await compareP240ExpectedResultsToGameResults(stat);
    // get expected points for each team
    // get moneyline for each team
    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let results = await oddStuff(stuff, stat);
}

compareStatExpectedResultsToGameResultsButton.onclick = async() => {
    let stat = 'plus_minus'
    let stuff = await compareStatExpectedResultsToGameResults(stat);

    // get expected points for each team
    // get moneyline for each team
    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let results = await oddStuff(stuff, stat);
}


let total = 0;
const oddStuff = async(stuff, stat, hometeam, visitorteam) => {
    //[actualResults, p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])


    let exPtsHome0 = stuff[1][stat];
    let exPtsVisitor0 = stuff[2][stat];
    let exPtsHome1;
    let exPtsVisitor1;
    if (stuff[3]) {
        exPtsHome1 = stuff[3][stat];
        exPtsVisitor1 = stuff[4][stat];
    }

    let season = stuff[9];
    let home_name;
    let home;
    let homesplit
    
    if (homeTeam.value !== "none") {
        home = homeTeam.value;
        homesplit = home.split(' ');
    } else {
        home = hometeam;
        homesplit = home.split(' ');
    }
    if (home === 'Los Angeles Lakers') {
        home_name = 'LALakers'
    } 
    else if (home === 'LA Clippers') {
        home_name = 'LAClippers';
    }
    else if (home === 'Portland Trail Blazers') {
        home_name = 'Portland';
    } 
    else if (homesplit.length === 3) {
        home_name = homesplit[0] + homesplit[1];
    } else {
        home_name = homesplit[0];
    }
    let visitor;
    let visitorSplit;
    let visitor_name;

    if (visitorteam) {
        visitor = visitorteam;
        visitorSplit = visitor.split(' ');
    } else {
        visitor = visitorTeam.value;
        visitorSplit = visitor.split(' ');
    }

    if (visitor === 'Los Angeles Lakers') {
        visitor_name = 'LALakers'
    }
    else if (visitor === 'LA Clippers') {
        visitor_name = 'LAClippers';
    }
    else if (visitor === 'Portland Trail Blazers') {
        visitor_name = 'Portland';
    } 
    else if (visitorSplit.length === 3) {
        visitor_name = visitorSplit[0] + visitorSplit[1];
    } else {
        visitor_name = visitorSplit[0];
    }
    let date = stuff[0][0].game_date;
    let splitDate = date.split('-');
    let gamedate = splitDate[1] + splitDate[2];
    if (gamedate.substring(0, 1) === '0') {
        gamedate = gamedate.substring(1)
    }

    let date2;
    let gamedate2;
    if (stuff[0][1]) {
        date2 = stuff[0][1].game_date;
        let splitDate2 = date2.split('-');
        gamedate2 = splitDate2[1] + splitDate2[2];
        if (gamedate2.substring(0, 1) === '0') {
            gamedate2 = gamedate2.substring(1)
        }
    }

    let moneylineHome = await getJsonResponseJackarithm(`/api/gambling/moneyline/home/${seasonDropChoice.value}/${home_name}/${gamedate}`);
    let moneylineVisitor = await getJsonResponseJackarithm(`/api/gambling/moneyline/visitor/${seasonDropChoice.value}/${visitor_name}/${gamedate}`);
    if (moneylineHome.length < 1) {
        moneylineHome = [{ml: '0'}];
        moneylineVisitor = [{ml: '0'}];
    } 
    
    moneylineHome = parseInt(moneylineHome[0].ml)
    if (moneylineVisitor.length < 1) {
        moneylineHome = [{ml: '0'}];
        moneylineVisitor = [{ml: '0'}];
    }

    moneylineVisitor = parseInt(moneylineVisitor[0].ml)

    let moneylineHome2;
    let moneylineVisitor2;
    
    if (parseInt(gamedate2) >= 0) {
        moneylineHome2 = await getJsonResponseJackarithm(`/api/gambling/moneyline/home/${seasonDropChoice.value}/${home_name}/${gamedate2}`);
        moneylineVisitor2 = await getJsonResponseJackarithm(`/api/gambling/moneyline/visitor/${seasonDropChoice.value}/${visitor_name}/${gamedate2}`);
        if (moneylineHome2.length < 1) {
            moneylineHome2 = [{ml: '0'}];
            moneylineVisitor2 = [{ml: '0'}];
        }
        moneylineHome2 = parseInt(moneylineHome2[0].ml);
        if (moneylineVisitor2.length < 1) {
            moneylineHome2 = [{ml: '0'}];
            moneylineVisitor2 = [{ml: '0'}];
        }
        moneylineVisitor2 = parseInt(moneylineVisitor2[0].ml);
    }



    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let bet = 100;
    if (stuff[5] > 0) {
        if (exPtsHome0 > exPtsVisitor0) {
            let profit;
            if (moneylineHome < 0) {
                profit = Math.abs(bet / moneylineHome) * 100;
                total += profit;
            } else if (moneylineHome > 0) {
                profit = moneylineHome;
                total += profit;
            }
        } else if (exPtsHome0 < exPtsVisitor0) {
            let losses = 100;
            total -= losses;
        }
    } else if (stuff[5] < 0) {
        if (exPtsHome0 < exPtsVisitor0) {
            let profit;
            if (moneylineVisitor < 0) {
                profit = Math.abs(bet / moneylineVisitor) * 100;
                total += profit;
            } else if (moneylineVisitor > 0) {
                profit = moneylineVisitor;
                total += profit;
            }
        } else if (exPtsHome0 > exPtsVisitor0) {
            let losses = 100;
            total -= losses;
        }
    }

    if (stuff[6]) {
        let bet2 = 100;
        if (stuff[6] > 0) {
            if (exPtsHome1 > exPtsVisitor1) {
                let profit;
                if (moneylineHome2 < 0) {
                    profit = Math.abs(bet2 / moneylineHome2) * 100
                    total += profit;
                } else if (moneylineHome2 > 0) {
                    profit = moneylineHome2;
                    total += profit;
            
                }
            } else if (exPtsHome1 < exPtsVisitor1) {
                let losses = 100;
                total -= losses;
            }
        } else if (stuff[6] < 0) {

            if (exPtsHome1 < exPtsVisitor1) {
                let profit;
                if (moneylineVisitor2 < 0) {
                    profit = Math.abs(bet2 / moneylineVisitor2) * 100;
                    total += profit;
                 
                } else if (moneylineVisitor2 > 0) {
                    profit = moneylineVisitor2;
                    total += profit;
 
                }
            } else if (exPtsHome1 > exPtsVisitor1) {
                let losses = 100;
                total -= losses;
            }
        }
    }
    console.log(total);
}

let greenCountRegStat = 0;
const compareStatExpectedResultsToGameResults = async(stat, hometeam, visitorteam) => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/api/statsheaders/${table}`)

    let abbreviationHome;
    let abbreviationVisitor;

    if (hometeam) {
        abbreviationHome = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${hometeam}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${visitorteam}`)
    } else {
        abbreviationHome = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${homeTeam.value}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${visitorTeam.value}`)
    }

    let matchup1 = `${abbreviationHome[0].team_abbreviation} vs. ${abbreviationVisitor[0].team_abbreviation}`
    //get all games by game id, home team and visitor team
    let actualResults = await getJsonResponseJackarithm(`/api/leagueGames/actual/gameresult/${matchup1}/${seasonGameResults.value}`);
  
    let row1 = compareResultsTable.insertRow();
    let row2;
    if (actualResults.length > 1) { 
        row2 = compareResultsTable.insertRow();
    }
    await appendActualResults(actualResults, row1, row2);
    
    let gameDate0 = actualResults[0].game_date;

    let homeResults0 = await getStatExpectedNoAppend(stat, 'home', gameDate0, visitorteam);
    let expStatHome0 = homeResults0[0];
    let visitorResults0 = await getStatExpectedNoAppend(stat, 'visitor', gameDate0, visitorteam);
    let expStatVisitor0 = visitorResults0[0];
    
    let homeResults1;
    let expStatHome1;
    let visitorResults1;
    let expStatVisitor1;

    let gameDate1;
    if (actualResults.length > 1) {
        gameDate1 = actualResults[1].game_date;
        homeResults1 = await getStatExpectedNoAppend(stat, 'home', gameDate1, visitorteam);
        expStatHome1 = homeResults1[0];
        visitorResults1 = await getStatExpectedNoAppend(stat, 'visitor', gameDate1, visitorteam);
        expStatVisitor1 = visitorResults1[0];
    }
    let season = homeResults0[1];
    let color0;
    let color1;
    let plus_minus_expected0 = Object.values(expStatHome0)[0] - Object.values(expStatVisitor0)[0];
    let plus_minus_expected1;

    let plus_minus_actual0 = actualResults[0].plus_minus;
    let plus_minus_actual1;
    if (actualResults.length > 1) {
        plus_minus_actual1 = actualResults[1].plus_minus;
        plus_minus_expected1 = Object.values(expStatHome1)[0] - Object.values(expStatVisitor1)[0];
    }

    let pmActual0 = parseFloat(plus_minus_actual0)
    let pmActual1;
    if (actualResults.length > 1) {
        pmActual1 = parseFloat(plus_minus_actual1)
    }

    if (plus_minus_expected0 > 0.0) {
        color0 = 'red';
        if (pmActual0 > 0.0) {
            color0 = 'green';
            greenCountRegStat++;

        }
    }
    else if (plus_minus_expected0 < 0.0) {
        color0 = 'red';
        if (pmActual0 < 0.0) {
            color0 = 'green';
            greenCountRegStat++;

        }
    }

    if (pmActual1) {
        if (plus_minus_expected1 > 0.0) {
            color1 = 'red';
            if (pmActual1 > 0.0) {
                color1 = 'green';
                greenCountRegStat++;
    
            }
        }
        else if (plus_minus_expected1 < 0.0) {
            color1 = 'red';
            if (pmActual1 < 0.0) {
                color1 = 'green';
                greenCountRegStat++;
            }
        }
    }

    let percentage = greenCountRegStat / 41;
    console.log(percentage);

    for(let k = 0; k < actualResults.length; k++) {
        await appendExpectedToComparisonTable(expStatHome0, expStatVisitor0, expStatHome1, expStatVisitor1, plus_minus_expected0, plus_minus_expected1, color0, color1, row1, row2, k)
    }
    return ([actualResults, expStatHome0, expStatVisitor0, expStatHome1, expStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])
}

//GREEN COUNT => total number of correct game predictions
let greenCount = 0;
const compareP240ExpectedResultsToGameResults = async(stat, hometeam, visitorteam) => {

    let abbreviationHome;
    let abbreviationVisitor;

    /*if a hometeam is not passed to compareP240ExpectedResultsToGameResults, that means I want to 
    use the hometeam and visitor team selections from the drop down box and get the comparison for only
    one that specific matchup for that specific (season drop down) season. */

    /*If hometeam is passed in, this means visitorteam must be passed in as well. If you call this function
    through the clicking of the 'compareP240ResultsBySeasonButton', this function will be passed the homeTeam.value
    value of hometeam (selected from the home team drop down), and will be called 29 addition times, one for every possible
    visitor team. 
    
    If you call this function by through clicking of the 'compareP240ResultsBySeasonTotalsButton', it will trigger a 
    nested loop, in which it will call this function with every combination of hometeam and visitor team. It will start with
    the first home team in the drop down list (Charlotte Hornets) and call this function 29 times to get every single matchup
    with the 29 possible visitor teams. After retreiving every Hornets home matchup, (29) function calls, it will move on to
    the next home team and loop through all 29 possible visitor teams... and so on until all 30 home teams have each cycled through
    their 29 possible matchups */
    if (hometeam) {
        abbreviationHome = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${hometeam}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${visitorteam}`)

    /*hometeam parameter not passed in, must use values from the drop down boxes, if you are here that means
    you are getting the comparison of only one specific matchup in one specific season*/
    } else {
        hometeam = homeTeam.value;
        visitorteam = visitorTeam.value;
        abbreviationHome = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${homeTeam.value}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/api/leagueGames/teamabbreviation/${visitorTeam.value}`)
    }

    //matchup1 will look like => 'CHA vs. PHI', or 'PHI vs. WAS'...
    let matchup1 = `${abbreviationHome[0].team_abbreviation} vs. ${abbreviationVisitor[0].team_abbreviation}`
    //get all games by game id, home team and visitor team

    /*This call to the database will return an array of max length 2. The array will contain objects, each
    containing a team box score for each instance of the specified matchup in the specified season. Results will
    only contain box scores for the home team, but contain a 'plus_minus' attribute which is used to determine whether
    the home team won or lost. If the home team never plays the given visitor team at home that season, (only happens in 2019-2020),
    the array will be empty. If the home team only plays the given visitor once at home, it will be of length 1. 
    If the home team plays the given visitor team at home twice (normal season), the array will be of length 2.
    TABLE CALLED => leagueGames${season} */
    let actualResults = await getJsonResponseJackarithm(`/api/leagueGames/actual/gameresult/${matchup1}/${seasonGameResults.value}`);
    /*EXAMPLE 'actualResults' =>
    (2) [{…}, {…}]
        0: 
            ast: "31"
            blk: "6"
            dreb: "29"
            fg3_pct: "0.348"
            fg3a: "46"
            fg3m: "16"
            fg_pct: "0.449"
            fga: "107"
            fgm: "48"
            ft_pct: "0.706"
            fta: "17"
            ftm: "12"
            game_date: "2021-12-06"
            game_id: "0022100353"
            id: 718
            matchup: "CHA vs. PHI"
            min: "265"
            oreb: "13"
            pf: "18"
            plus_minus: "-3"
            pts: "124"
            reb: "42"
            season_id: "22021"
            stl: "6"
            team_abbreviation: "CHA"
            team_id: "1610612766"
            team_name: "Charlotte Hornets"
            tov: "8"
            video_available: "1"
            wl: "L"
            [[Prototype]]: Object
        1: {id: 738, season_id: '22021', team_id: '1610612766', team_abbreviation: 'CHA', team_name: 'Charlotte Hornets', …}
        length: 2
        [[Prototype]]: Array(0)
*/
    if (actualResults.length === 0) {
        return;
    }
    //THIS IS JUST TO APPEND THE RESULTS TO THE FRONT END.
    //-------------------------------------------------
    let row1 = compareResultsTable.insertRow();
    let row2;
    if (actualResults.length > 1) { 
        row2 = compareResultsTable.insertRow();
    }
    await appendActualResults(actualResults, row1, row2);
    //---------------------------------------------------
    
    /*gameDate is acquired and passed on to getStatP240ExpectedNoAppend (ex: '2021-12-06') to eventually be used to cut off the
    boxscorestraditional box scores for the given player at the game before the game that is to be predicted. (This is done to simulate
    only having the data available up to the current day, as I will not be able to use future data to predict the upcoming season. This will
    actually be an unecessary step in production during this season, as my boxscorestraditional2022-2023 table will only contain data up to 
    the current day, so it will not need to be spliced.)*/
    let gameDate0 = actualResults[0].game_date;
    console.log(stat)
    console.log(gameDate0)
    console.log(hometeam)
    console.log(visitorteam)
    let homeResults0 = await getStatP240ExpectedNoAppend(stat, 'home', gameDate0, hometeam, visitorteam);
    console.log(homeResults0)
    /*
    (3) [{…}, {…}, '2021-2022']
        0: {plus_minus: -0.8439383791024779}
        1: {plus_minus: -0.763563295378432}
        2: "2021-2022"
        length: 3
        [[Prototype]]: Array(0)
    */
    let p240ExpStatHome0 = homeResults0[0];
    let visitorResults0 = await getStatP240ExpectedNoAppend(stat, 'visitor', gameDate0, hometeam, visitorteam);
    let p240ExpStatVisitor0 = visitorResults0[0];
    
    let homeResults1;
    let p240ExpStatHome1;
    let visitorResults1;
    let p240ExpStatVisitor1;

    let gameDate1;
    if (actualResults.length > 1) {
        gameDate1 = actualResults[1].game_date;
        homeResults1 = await getStatP240ExpectedNoAppend(stat, 'home', gameDate1, hometeam, visitorteam);
        p240ExpStatHome1 = homeResults1[0];
        visitorResults1 = await getStatP240ExpectedNoAppend(stat, 'visitor', gameDate1, hometeam, visitorteam);
        p240ExpStatVisitor1 = visitorResults1[0];
    }
    let season = homeResults0[2];
    let color0;
    let color1;
    let plus_minus_expected0 = Object.values(p240ExpStatHome0)[0] - Object.values(p240ExpStatVisitor0)[0];
    let plus_minus_expected1;

    let plus_minus_actual0 = actualResults[0].plus_minus;
    let plus_minus_actual1;
    if (actualResults.length > 1) {
        plus_minus_actual1 = actualResults[1].plus_minus;
        plus_minus_expected1 = Object.values(p240ExpStatHome1)[0] - Object.values(p240ExpStatVisitor1)[0];
    }

    let pmActual0 = parseFloat(plus_minus_actual0)
    let pmActual1;
    if (actualResults.length > 1) {
        pmActual1 = parseFloat(plus_minus_actual1)
    }

    if (plus_minus_expected0 > 0.0) {
        color0 = 'red';
        if (pmActual0 > 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }
    else if (plus_minus_expected0 < 0.0) {
        color0 = 'red';
        if (pmActual0 < 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }

    if (pmActual1) {
        if (plus_minus_expected1 > 0.0) {
            color1 = 'red';
            if (pmActual1 > 0.0) {
                color1 = 'green';
                greenCount++;
    
            }
        }
        else if (plus_minus_expected1 < 0.0) {
            color1 = 'red';
            if (pmActual1 < 0.0) {
                color1 = 'green';
                greenCount++;
            }
        }
    }
    let H_or_V = 'home';
    let teamId = await getJsonResponseJackarithm(`/api/leagueGames/teamid/${hometeam}`)

    let gamesInSeasonCount = await getJsonResponseJackarithm(`/api/boxScoreSummary/lengthofseason/${seasonDropChoice.value}/${teamId[0].team_id}/${H_or_V}`);
    gamesInSeasonCount = gamesInSeasonCount[0].count;
    let percentage = greenCount / gamesInSeasonCount;

    console.log(percentage);

    for(let k = 0; k < actualResults.length; k++) {
        await appendExpectedToComparisonTable(p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, plus_minus_expected0, plus_minus_expected1, color0, color1, row1, row2, k)
    }
    return ([actualResults, p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])
}

const appendActualResults = async(results, row1, row2) => {
    if (results.length > 1) {
        let cellActual1 = row1.insertCell();
        let cellActual2 = row2.insertCell();
        cellActual1.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
        cellActual2.innerHTML = `${results[1].matchup} ${results[1].pts} ${results[1].plus_minus}`
    } else {
        let cellActual = row1.insertCell();
        cellActual.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
    }
}

const appendExpectedToComparisonTable = async(p240Home0, p240Visitor0, p240Home1, p240Visitor1, plus_minus0, plus_minus1, color0, color1, row1, row2, k) => {
    let cellExpected2;
    if (k === 1) {
        cellExpected2 = row2.insertCell();
        cellExpected2.innerHTML = `${Object.values(p240Home1)[0]} ${Object.values(p240Visitor1)[0]} ${plus_minus1} ${color1}`

    } else {
        let cellExpected = row1.insertCell();
        cellExpected.innerHTML = `${Object.values(p240Home0)[0]} ${Object.values(p240Visitor0)[0]} ${plus_minus0} ${color0}`
    }
}

let statsArray = [];
const p240StatDropDownFunction = async() => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/api/statsheaders/${table}`)

    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("p240StatDropDown").innerHTML = str;
    try {
        for (var stat of stats) {
            str += "<option>" + stat.column_name + "</option>";
            statsArray.push(stat);
        }
        document.getElementById("p240StatDropDown").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}


const getStatsFromBoxTraditionalHorV = async(season, playerid, H_or_V, table) => {
    let stats;
    if (table === 'mvpPoints') { 
        stats = await getJsonResponseJackarithm(`/api/mvpPoints/${playerid}/${season}/${H_or_V}`);
    } else {
        if (H_or_V === 'home') {
            //HEEERRRREEEE
            stats = await getJsonResponseJackarithm(`/api/boxScoresTraditional/jackarithm/home/${playerid}/${season}`);
        } else {
            stats = await getJsonResponseJackarithm(`/api/boxScoresTraditional/jackarithm/visitor/${playerid}/${season}`);
            console.log(stats);
        }
    }
    return stats;
}

const getPreviousSeason = async(season) => {
    let split = season.split('-')
    let previous = parseInt(split[1]) - 1;
    let previous2 = parseInt(split[0]) - 1;
    let thisSeason = previous2 + '-' + previous;
    return thisSeason;
}

//for one player, return every stat average per season
const getPlayerHorVOffensiveStatAveragesTraditional = async(season, playerid, H_or_V, teamid, boxNum) => {
    /**
     * These are the two tables you will be retrieving data from, table one represents the current
     * season and the primary table from which we will retrieve data from. Table2 represents the table from
     * which we will retrieve the 'backup' data, or more specifically 'backupStat' from. For most of the iterations 
     * of prediction models I have tried, I like to use the same table for table1 and table2; table1 = current season
     * table2 = last season. Alternatively, you could use the current season for both tables, but use a different stat
     * grouping for each table (different stat category table from the same season, for example, boxscorefourfactors as primary and boxscorestraditional
     * as secondary). ALWAYS MAKE SURE TO USE THE SCIENTIFIC METHOD WHICH EACH ATTEMPT, KEEPING A CONTROL VARIABLE / SEASON.
     */

    let backupSeason = await getPreviousSeason(season);
    let table1 = `boxscorestraditional${season}`
    let table2 = `boxscorestraditional${backupSeason}`

    /**
     * stats1 and stats2 just represent the headers for each stat provided in whatever box score table you are querying.
     * With this information, we are able to loop through each stat in the given box score, and provide a stat average for every
     * single stat within the given table.
     */
    let stats1 = await getJsonResponseJackarithm(`/api/statsheaders/${table1}`)
    let stats2 = await getJsonResponseJackarithm(`/api/statsheaders/${table2}`)

    /** season2 is just the backup season, if you are using a different stat table of the same season, just set this variable to the
     * given season (seasonDropDown.value);
     * */
    let season2 = backupSeason;

    //playerStats1 will be an array of either home game or visitor game traditional box scores given the season, and playerid
    let playerStats1 = await getStatsFromBoxTraditionalHorV(season, playerid, H_or_V, table1);
    console.log(playerStats1)
    /** since I am using the same stat category table for table1 and table2, but from different seasons, I have to call getStatsFromBoxTraditionalHorV()
     * with season2 to acquire playerStats2 from the previous season to backup playerStats1.
     * */
    //BACKUP STATS
    let playerStats2 = await getStatsFromBoxTraditionalHorV(season2, playerid, H_or_V, table2);
    console.log(playerStats2)
    /**
     * 
     */

    //playerStats2;
    if (!playerStats2) {
        //games played = get gameid's in seasonDropChoice year where player.mins > 0
        //stat total = for each game in games played, add up stats
        /*let split = season.split('-')
        let next = parseInt(split[1]) + 1
        let thisSeason = split[1] + '-' + next;*/
        let thisSeason = await getPreviousSeason(season2);
        playerStats2 = await getStatsFromBoxTraditionalHorV(thisSeason, playerid, H_or_V, table2);
        
        if (!playerStats2) {
            playerStats2 = playerStats1;
        }
    }

    if (!playerStats1) {
        playerStats1 = playerStats2;
        console.log('PLAYER STATS SWAPPED BECAUSE PLAYERSTATS1 DOES NOT EXIST')
    }

    if (!playerStats1 && !playerStats2) {
        console.log('NEITHER PLAYERSTATS1 OR PLAYERSTATS2 EXIST')
        return null;
    }

    playerStats1.splice(boxNum);
    console.log(playerStats1);

    /*
    if (!playerStats1[0]) {
        playerStats1 = [{mvppoints: '0.2500'}]
    }
    */

    let averagesObjectAny1 = {};
    let averagesObject_82Any1 = {};
    let averagesObjectAny2 = {};
    let averagesObject_82Any2 = {};

    let stats_82_1 = [];
    let statsPerGame1 = [];
    let statsHeaders1 = [];

    let stats_82_2 = [];
    let statsPerGame2 = [];
    let statsHeaders2 = [];

    for (let j = 0; j < stats1.length; j++) {

        statsHeaders1.push(stats1[j].column_name)
        stats_82_1.push(0);
        statsPerGame1.push(0);

    }    

    for (let n = 0; n < stats2.length; n++) {

        statsHeaders2.push(stats2[n].column_name)
        stats_82_2.push(0);
        statsPerGame2.push(0);

    } 
    
    let gameCount2 = 0;
    for (let i = 0; i < playerStats2.length; i++) {
        if (parseFloat(playerStats2[i].min) > 0) {
            gameCount2++;
        }
        if (!playerStats2[i].min) {
            playerStats2[i].min = 0;
        }
        for (let j = 0; j < stats2.length; j++) {
            if (stats2[j].column_name === 'points') {
                stats2[j].column_name = 'pts';
            }
            if (!parseFloat(playerStats2[i][stats2[j].column_name])) {
                playerStats2[i][stats2[j].column_name] = 0;
            }
            
            stats_82_2[j] += parseFloat(playerStats2[i][stats2[j].column_name]);
            
            if (parseFloat(playerStats2[i].min) > 0) {
                statsPerGame2[j] += parseFloat(playerStats2[i][stats2[j].column_name]);
            }
        }
    }
    let gameCount1 = 0;
    for (let i = 0; i < playerStats1.length; i++) {
        if (parseFloat(playerStats1[i].min) > 0) {
            gameCount1++;
        }
        if (!playerStats1[i].min) {
            playerStats1[i].min = 0;
        }
        for (let j = 0; j < stats1.length; j++) {
            if (stats1[j].column_name === 'points') {
                stats1[j].column_name = 'pts';
            }
            if (!parseFloat(playerStats1[i][stats1[j].column_name])) {
                playerStats1[i][stats1[j].column_name] = 0;
            }
            
            stats_82_1[j] += parseFloat(playerStats1[i][stats1[j].column_name]);
            
            if (parseFloat(playerStats1[i].min) > 0) {
                statsPerGame1[j] += parseFloat(playerStats1[i][stats1[j].column_name]);
            }
        }
    }

    teamid = teamid[0].team_id;
    
    //*******DURING THE SEASON/PRODUCTION, YOU'LL JUST HAVE TO CHANGE 'GAMESINSEASONCOUNT' TO 82, OR 41, DOUBLE CHECK.
    let gamesInSeasonCount = await getJsonResponseJackarithm(`/api/boxScoreSummary/lengthofseason/${seasonDropChoice.value}/${teamid}/${H_or_V}`);

    gamesInSeasonCount = gamesInSeasonCount[0].count;

    let header2;
    let statAverage2
    let statAverage_82_2
0
    let header1;
    let statAverage1;
    let statAverage_82_1;
    
    if (playerStats1 !== playerStats2) {
        /*header1 = statsHeaders1[4];
        statAverage_82_1 = parseFloat(playerStats1[0].plus_minus);
        statAverage1 = parseFloat(playerStats1[0].plus_minus);
        console.log(statAverage1)
        console.log(statAverage_82_1)
        averagesObjectAny1[header1] = statAverage1;
        averagesObject_82Any1[header1] = statAverage_82_1;*/
        for (let y = 0; y < stats_82_1.length; y++) {
            header1 = statsHeaders1[y];
            statAverage_82_1 = stats_82_1[y] / gamesInSeasonCount;
            statAverage1 = statsPerGame1[y] / gameCount1;

            averagesObjectAny1[header1] = statAverage1;
            averagesObject_82Any1[header1] = statAverage_82_1;
        }
        for (let k = 0; k < stats_82_2.length; k++) {
            header2 = statsHeaders2[k];
            statAverage_82_2 = stats_82_2[k] / gamesInSeasonCount;
            statAverage2 = statsPerGame2[k] / gameCount2;

            averagesObjectAny2[header2] = statAverage2;
            averagesObject_82Any2[header2] = statAverage_82_2;
        }
    } else {
        for (let k = 0; k < stats_82_2.length; k++) {
            header2 = statsHeaders2[k];
            statAverage_82_2 = stats_82_2[k] / gamesInSeasonCount;
            statAverage2 = statsPerGame2[k] / gameCount2;

            averagesObjectAny2[header2] = statAverage2;
            averagesObject_82Any2[header2] = statAverage_82_2;
        }
    }

    return [averagesObjectAny2, averagesObject_82Any2, averagesObjectAny1, averagesObject_82Any1];
}

const getSports = async() => {
    let odds = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${process.env.ODDSAPIKEY}&regions=us`, {
        method: 'GET',
    })
    if (odds.ok) {
        let jsonOdds = odds.json();
        console.log(jsonOdds)
        return jsonOdds;
    }
}

const postOdds = async(odds, season) => {

    const url = `/api/gambling/odds/${season}`;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(odds),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('error!');
        console.log(error);
    }
}

const writeOddsToDatabase = async(season) => {
    let odds = await getJsonResponseJackarithm(`/api/gambling/odds/${season}`);
    
    let tableLength = await getJsonResponseJackarithm(`/api/tablelength/odds2022-2023`)
    console.log(tableLength)
    //date rot vh team 1 2 3 4 final open close ml 2h
    for(let j = 0; j < season.length; j++) {
        for (let i = tableLength[0].count; i < odds.length; i++) {
            let oddsValues = Object.values(odds[i])[0];
            let splitValues = oddsValues.split(" ");
            let x = splitValues[0].split('\t');
            let results = await postOdds(x, season[j]);
        }
    }
}

writeOddsToDatabaseButton.onclick = async() => {
    let season = ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022"];
    await writeOddsToDatabase(season);
}

homeTeam.onchange = async() => {
    await getRosterNoParams('home');
}

visitorTeam.onchange = async() => {
    await getRosterNoParams('visitor');
}

const getAverageMvpPointsBySeason = async(season) => {
   
    let total = 0;
    let points = await getJsonResponseJackarithm(`/api/mvpPoints/getAllMvpPoints/${season}`);
    console.log(points)
    for (let i = 0; i < points.length; i++) {
        let pts = parseFloat(points[i].mvppoints)
        if (!pts) {
            continue;
        }
        console.log(pts);
        total += pts;
    }
    let average = total / points.length;
    console.log(average);
}
//teamsDropDown();
//p240StatDropDownFunction();
//getAverageMvpPointsBySeason('2016-2017');
//getSports()