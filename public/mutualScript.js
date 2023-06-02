const playerId = document.getElementById("playerId");
const playerIdSubmit = document.getElementById("playerId-submit");
const playerInfoTable = document.getElementById("player-info");


const getJsonResponse = async (url) => {
    console.log(url);
    const response = await fetch(url);
    try {
        if (response.ok){
            const jsonResponse = await response.json();

            return jsonResponse;
        }
    }
    catch (err) {
        console.log(err);
    }
}
/*
catch (err) {
    console.log('eheeheheheheh')
    if (err instanceof Errors.BadRequest)
      return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
    if (err instanceof Errors.Forbidden)
      return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
    if (err instanceof Errors.NotFound)
      return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
    if (err instanceof Errors.UnprocessableEntity)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
}
*/
//GET PLAYER IDS FROM LOCAL DATABASE
const getArrayOfPlayerIdsInEastandWestConferences = async() => {
    const players = await getJsonResponse('/api/publicApiPlayers/playerIds');
    console.log(players);
    return players;
}


const getIndividualPlayer = async(id) => {
    let jsonResponse;
    const response = await fetch('https://api-nba-v1.p.rapidapi.com/players/playerId/' + id, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': PUBLICAPIKEY
        }
    });
    if (response.ok) {
        jsonResponse = response.json();
        return jsonResponse;
    }
}

let rowIndex = 1;
const appendIndividualPlayer = async(player) => {
    let year = 2021;
    let ppg = await getPPG(year, player.playerId);
    let defReb = await getDefRebAverage(year, player.playerId);
    let offReb = await getOffRebAverage(year, player.playerId);
    let assists = await getAssistsAverage(year, player.playerId);
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}`;
    cell3.innerHTML = `${ppg}`;
    cell4.innerHTML = `${defReb}`;
    cell5.innerHTML = `${offReb}`;
    cell6.innerHTML = `${assists}`;
    rowIndex += 1;
}
//NEED TO 



/* This script basically makes sure I am only counting statistics from the regular NBA season. */
//games/seasonYear/
//2021 where league = 'standard'
//compile a list of game Id's where the season is 2021 and the league is 'standard'
//then use the game id's and loop through statistics/players/playerId

//get list of games in 2021 where the league is 'standard'
const getGamesBySeasonPublic = async(year) => {
    try {    
        let gamesResponse = await fetch('https://api-nba-v1.p.rapidapi.com/games/seasonYear/' + year, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': PUBLICAPIKEY
            }
        })
        if (gamesResponse.ok) {
            let jsonResponse = gamesResponse.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
}

//make sure all games are in the standard league
const getStandardGames = async(year) => {
    let standardGamesArray = [];
    const games = await getGamesBySeasonPublic(year);
    for(let i = 0; i < games.api.games.length; i++) {
        if (games.api.games[i].league === 'standard') {
            standardGamesArray.push(games.api.games[i]);
        }
    }
    return standardGamesArray
}

const getSeasonGameIdList = async(year) => {
    let gamesArray = await getStandardGames(year);
    let gameIdList = [];
    gamesArray.forEach(game => {
        gameIdList.push(game.gameId);
    })
    return gameIdList;
}

//get individual players' statistics

const getIndividualPlayersStats = async(playerId) => {
    try {
        let player = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': PUBLICAPIKEY
            }
        })
        if (player.ok) {
            let jsonPlayer = player.json();
            return jsonPlayer;
        }
    } catch (error) {
        console.log(error);
    }
}

/* This is the actual function that returns the array of all of the games' statistics
from just the regular season. */
const getPlayerStandardGameDetails = async(year, playerId) => {
    let playerStandardGameDetails = [];
    let gameIdList = await getSeasonGameIdList(year);
    let player = await getIndividualPlayersStats(playerId);
    
    for (let i = 0; i < gameIdList.length; i++) {
        for (let j = 0; j < player.api.statistics.length; j++) {
            if (gameIdList[i] === player.api.statistics[j].gameId) {
                playerStandardGameDetails.push(player.api.statistics[j]);
            }
        }
    }
    
    return playerStandardGameDetails;
}

const getTotalPointsInSeason = function(gameDetailsArray) {
    let totalPoints = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalPoints += parseInt(gameDetailsArray[i].points);
        }
    }
    return totalPoints;
}

const getGamesPlayedInSeason = function(gameDetailsArray) {
    let gamesPlayed = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            gamesPlayed += 1;
        }
    }
    return gamesPlayed;
}

const getPPG = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalPoints = await getTotalPointsInSeason(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let ppg = totalPoints / gamesPlayed;
    return "ppg: " + Number.parseFloat(ppg).toFixed(2);
}

const getTotalDefensiveRebounds = async(gameDetailsArray) => {
    let totalDefensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalDefensiveRebounds += parseInt(gameDetailsArray[i].defReb);
        }
    }
    return totalDefensiveRebounds;
}

const getDefRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalDefReb = await getTotalDefensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let defRebAvg = totalDefReb / gamesPlayed;
    return "defensive rebounds: " + Number.parseFloat(defRebAvg).toFixed(2);
}

const getTotalOffensiveRebounds = async(gameDetailsArray) => {
    let totalOffensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalOffensiveRebounds += parseInt(gameDetailsArray[i].offReb);
        }
    }
    return totalOffensiveRebounds;
}

const getOffRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalOffReb = await getTotalOffensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let offRebAvg = totalOffReb / gamesPlayed;
    return "offensive rebounds: " + Number.parseFloat(offRebAvg).toFixed(2);
}

const getTotalAssists = async(gameDetailsArray) => {
    let totalAssists = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalAssists += parseInt(gameDetailsArray[i].assists)
        }
    }
    return totalAssists;
}

const getAssistsAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalAssists = await getTotalAssists(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let assistsAvg = totalAssists / gamesPlayed;
    return "assists: " + Number.parseFloat(assistsAvg).toFixed(2);
}

/*playerIdSubmit.onclick = async() => {
    let id = playerId.value;
    let response = await getIndividualPlayer(id);
    appendIndividualPlayer(response.api.players[0]);
}*/
//NEXT STEPS:
/*DISPLAY A LIST (STATIC) OF ALL THE AVAILABLE STATS YOU CAN GET.**************************************
-HAVE AN INPUT TEXT FIELD FOR WHAT 'STAT' YOU WANT. (FROM THE STATIC LIST OF STATS);********************
-HAVE AN INPUT FIELD FOR FIRST NAME;
-HAVE AN INPUT FIELD FOR LAST NAME;
-HAVE AN INPUT FIELD FOR PLAYER ID;
-WHEN A USER SELECTS A DESIRED PLAYER AND STAT, DISPLAY THE PLAYER'S PICTURE AND STATISTIC ON THE PAGE;
-COME UP WITH YOUR OWN FORMULA FOR WEIGHTING THE MOST SIGNIFICANT STAT;
-MAKE A 'GNARLIEST DUDE' STAT, 'SLOWEST GUY IN THE NFL', 'BIGGEST COMPLAINER', etc.
*/

//GET EVERY PLAYERID
//CALL MVPPOINTS WITH EVERY ID
//CREATE OBJECT
//POST OBJECT

const postMvpPoints = async(obj) => {
    console.log('wweeeeeeeeeeeeeeeeeeeewwwwwwwwwww');
    const url = '/api/mvpPoints';
    console.log(obj);
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    } 
}

const loadUpMvpPoints = async(season, H_or_V) => {
    let idNameList = await getJsonResponse(`/api/boxScoresTraditional/playernameidlist/${season}`);
    for (let i = 0; i < idNameList.length; i++) {
        let points = await getMvpPoints(season, idNameList[i].player_id, H_or_V);
        let obj = {playerid: idNameList[i].player_id, player_name: idNameList[i].player_name, mvppoints: points, season: season, H_or_V: H_or_V}
        console.log(obj)
        let results = await postMvpPoints(obj)
        console.log(results)
    }
}

/* MVP points logic */
/*NOW YOU HAVE THE PLAYER ID.
CALL GETSTANDARDPLAYERDETAILS*/
const getMvpPoints = async(year, playerId, H_or_V) => {
    let ppg = await getSeasonStatAvgLocal('pts', year, playerId, H_or_V);
    let totReb = await getSeasonStatAvgLocal('reb', year, playerId, H_or_V);
    let assists = await getSeasonStatAvgLocal('ast', year, playerId, H_or_V);
    let steals = await getSeasonStatAvgLocal('stl', year, playerId, H_or_V);
    let turnovers = await getSeasonStatAvgLocal('turnovers', year, playerId, H_or_V);
    let plusMinus = await getSeasonStatAvgLocal('plus_minus', year, playerId, H_or_V);
    let efg_pct = await getSeasonStatAvgFourFactorsLocal('efg_pct', year, playerId, H_or_V)
    let fgp = await getSeasonStatAvgLocal('fg_pct', year, playerId);
    let mvpPoints = (.15 * parseFloat(ppg)) + (.07 * parseFloat(totReb)) + (.06 * parseFloat(assists)) + (.125 * parseFloat(steals)) - (.125 * parseFloat(turnovers)) + (.3 * parseFloat(plusMinus)) + (.02 * parseFloat(fgp));
    if (!mvpPoints) {
        return 'STATISTICS UNAVAILABLE'
    }
    console.log(mvpPoints)
    return mvpPoints.toFixed(2);
}

/* Hustle Factor logic */
const getHustleFactor = async(year, playerId) => {
    let hustleFactor;
    console.log(playerId)
    console.log(year)
    let offRebPg = await getSeasonStatAvgLocal('oreb', year, playerId)
    let stl = await getSeasonStatAvgLocal('stl', year, playerId)
    let blk = await getSeasonStatAvgLocal('blk', year, playerId)
    let plusMinus = await getSeasonStatAvgLocal('plus_minus', year, playerId);
    //let games = await getPlayerStandardGameDetails(playerId);
    //let gamesPlayed = games.length;
    let player = await getJsonResponse(`/api/playersNBA/playerNBA/${playerId}`)
    console.log(player);
    console.log(offRebPg);
    console.log(stl);
    console.log(blk);
    console.log(plusMinus);
    hustleFactor = (.25 * parseFloat(offRebPg)) + (.35 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))

    if (!hustleFactor) {
        return 'STATISTICS UNAVAILABLE'
    }
    console.log(hustleFactor)
    return hustleFactor.toFixed(2);
}

/* Carmelo logic. The higher your carmelo factor, the more effecient and gritty
of a player you are, adds fgp and hustlefactor */

const getCarmeloFactor = async(year, playerId) => {
    let carmeloFactor;
    console.log(playerId);
    console.log(year);
    let fgp = await getSeasonStatAvgLocal('fg_pct', year, playerId);
    let hustleFactor = await getHustleFactor(year, playerId);
    console.log(hustleFactor);
    carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor);
    if (!carmeloFactor) {
        return 'STATISTICS UNAVAILABLE'
    }
    return carmeloFactor.toFixed(2);
}

/*const getCarmeloFactor = async(year, playerId) => {
    let carmeloFactor;
    let fgp = await getSeasonStatAvg('fgp', year, playerId);
    let hustleFactor = await getHustleFactor(year, playerId);
    carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor);
    return carmeloFactor.toFixed(2);
}
*/


const getSeasonStatAvgFourFactorsLocal = async(stat, year, playerId, H_or_V) => {
    let url;
    console.log(year);
    if (H_or_V === 'home') {
        url = '/api/fourFactors/home/' + playerId + '/' + year; 
    } else {
        url = '/api/fourFactors/visitor/' + playerId + '/' + year; 
    }
    let gameDetailsArray = await getJsonResponse(url);
    console.log(gameDetailsArray);
    let statTotal = await getSeasonTotalOfStat(stat.toLowerCase(), gameDetailsArray);
    console.log(statTotal);
    //let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let gamesPlayed = gameDetailsArray.length;
    let statAverage = statTotal / gamesPlayed;
    if (stat === 'efg_pct') {
        console.log(statTotal);
        console.log(gamesPlayed);
        console.log(statAverage);
    }
    console.log(statAverage);
    return Number.parseFloat(statAverage).toFixed(2);
}

const getSeasonStatAvgLocal = async(stat, year, playerId, H_or_V) => {
    let url;
    console.log(year);
    console.log(playerId);
    if (year === 'none') {
        year = '2021-2022'
    }
    if (H_or_V === 'home') {
        url = '/api/boxScoresTraditional/home/' + playerId[0].playerid + '/' + year; 
    } else if (H_or_V === 'visitor') {
        url = '/api/boxScoresTraditional/visitor/' + playerId[0].playerid + '/' + year; 
    } else {
        url = '/api/boxScoresTraditional/' + playerId[0].playerid + '/' + year;
    }
    console.log(stat);
    let gameDetailsArray = await getJsonResponse(url);
    console.log(gameDetailsArray)
    if (gameDetailsArray.length === 0) {
        return 'Player was inactive the entire season'
    }
    let statTotal = await getSeasonTotalOfStat(stat.toLowerCase(), gameDetailsArray);
    //let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let gamesPlayed = gameDetailsArray.length;
    let statAverage = statTotal / gamesPlayed;

    console.log(statAverage);
    return Number.parseFloat(statAverage).toFixed(2);
}


/* Returns the season total of any stat) */
const getSeasonTotalOfStat = async(stat, gameDetailsArray) => {
    let statTotal = 0;
    //console.log(gameDetailsArray);
    if (stat === 'ppg') {
        //stat = 'points';
        stat = 'pts';
    }
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            statTotal += parseFloat(gameDetailsArray[i][stat]);
        }
    }
    return statTotal;
}

const getIndividualPlayerLocal = async(playerid) => {
    console.log(playerid);
    const player = await getJsonResponse(`/api/publicApiPlayers/` + playerid);
    console.log(player);
    return player;
}
///////////////////////////////////////////////////////////////////////////////
const getPlayersByLastNameLocal = async(playerLastName) => {
    let players = await getJsonResponse('/api/players/lastName/' + playerLastName);
    return players;
}
/*
const getIdFromPlayersByNameLocal = async(playerLastName, playerFirstName) => {
    let playerid = await getJsonResponse(`/local/players/playerid/` + playerLastName + '/' + playerFirstName);
    console.log(playerid);
    return playerid;
}
*/
///////////////////////////////////////////////////////////////////////////////////
//loadUpMvpPoints('2021-2022', 'visitor')