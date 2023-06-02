const playerId = document.getElementById("playerId");
const playerIdSubmit = document.getElementById("playerId-submit");
const playerInfoTable = document.getElementById("player-info");


const getIndividualPlayer = async(id) => {
    let jsonResponse;
    const response = await fetch('https://api-nba-v1.p.rapidapi.com/players/playerId/' + id, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
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
const getGamesBySeason = async(year) => {
    try {    
        let gamesResponse = await fetch('https://api-nba-v1.p.rapidapi.com/games/seasonYear/' + year, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
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
    const games = await getGamesBySeason(year);
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
                'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
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


