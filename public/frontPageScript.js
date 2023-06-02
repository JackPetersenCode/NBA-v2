const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
const hustleFactorSubmit = document.getElementById("submit-hustle-factor");
const deepStatToGet = document.getElementById("deepStatToGet");
const teamChosen = document.getElementById("teams");
const teamPlayerChosen = document.getElementById("teamplayers");
const seasonAveragesRegularSeasonsTable = document.getElementById("seasonAveragesRegularSeasonsTable");
const splits = document.getElementById("player-splits");
const splitLineTable = document.getElementById("splitTable");
const statRankingTable = document.getElementById("statRanks");
const rankedSeason = document.getElementById("rankedSeason");
const scheduleTable = document.getElementById("scheduleTable");
const scheduleSeason = document.getElementById("scheduleSeason");
const careerHeader = document.getElementById("careerHeader");
const splitHeader = document.getElementById("splitHeader");

const getJsonResponseFront = async (url) => {
    console.log(url);
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
/* YOU WOULD DO IT JUST LIKE A POST REQUEST, 
DOOO NOOOOTTT USE THE getJsonResponseFront FUNCTION
MAKE A SEPARATE FUNCTION CALLED 'const getPlayer....'

and then ...

const getPlayer = async() => {
    console.log('wwwwwwwwwwwww');
    const url = '/players/:id';
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
            *****where: ****clause????????????????????????????????????????????????????????????????????????
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('someone fucked up');
        console.log(error);
    } 
}

*/
const postPlayer = async(obj) => {
    console.log('wwwwwwwwwwwww');
    const url = '/api/publicApiPlayers';
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

const postWriteJsonPlayers = async(obj) => {
    console.log('wwwwwwwwwwwww');
    console.log(obj);
    console.log(obj.length);
    const url = '/api/publicApiPlayers/playerscloud';
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

const postPlayersNBA = async(obj) => {
    console.log('skittttttttlllllllllllleeeeeeeeeeeesssssssssssssssssssssssssssssssssssssssssssssssss');
    console.log(obj);
    
    const url = '/api/playersNBA';
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
}

const postGame = async(obj) => {
    console.log('tttttttttt');
    const url = '/api/publicGames';
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

const postGameCloud = async(obj) => {
    console.log('tttttttttt');
    const url = '/api/publicGames/gamescloud';
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

const postGameInfoCloud = async(obj) => {
    console.log('wwwwwwwwwww');
    const url = '/api/publicGames/gameinfocloud';
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

const postGameInfo = async(obj, year) => {
    console.log('wwwwwwwwwww');
    const url = '/api/publicGames/seasonyear/' + year;
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

const postShot = async(obj) => {
    console.log('wwwwwwooooooooooooooooooooooooooooooooooooooooooowwwww');
    const url = '/api/shots';
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

const postShotBySeason = async(obj, season) => {
    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
    const url = `/api/shots/${season}`;
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

const postBoxScoresBySeason = async(obj, season) => {
    console.log(season);
    const url = `/api/box/${season}`;
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

const postNewOdds = async(odds, season) => {

    const url = `/api/gambling/newOdds/${season}`;
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

const postBoxScoresTraditionalBySeason = async(obj, season) => {
    console.log(season);
    const url = `/api/boxScoresTraditional/${season}`;
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

const postLeagueGamesBySeason = async(obj, season) => {
    console.log(season);
    const url = `/api/leagueGames/${season}`;
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

const postLeagueHustleStatsBySeason = async(obj, season) => {
    console.log(season);
    const url = `/api/hustleStats/${season}`;
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


const deleteDatabase = async() => {
    const url = '/api/database/delete';
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
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

const postSeasonRegularPlayerStatsTotals = async(obj) => {
    console.log(obj);
    const url = `/api/regularSeasonStats`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreFourFactors = async(obj, season) => {
    console.log(obj);
    const url = `/api/fourFactors/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreFourFactorsTeams = async(obj, season) => {
    console.log(obj);
    const url = `/api/fourFactors/teams/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreMisc = async(obj, season) => {
    console.log(obj);
    const url = `/api/boxScoreMisc/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreMiscTeams = async(obj, season) => {
    console.log(obj);
    const url = `/api/boxScoreMisc/teams/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScorePlayerTracker = async(obj, season) => {
    console.log(obj);
    const url = `/api/playerTracker/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScorePlayerTrackerTeams = async(obj, season) => {
    console.log(obj);
    const url = `/api/playerTracker/teams/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postLeagueDashLineups = async(obj, season) => {
    console.log(obj);
    const url = `/api/leagueDashLineups/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postLeagueDashOppPtShot = async(obj, season) => {
    console.log(obj);
    const url = `/api/leagueDashOppPtShot/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postLeagueDashPlayerClutch = async(obj, season) => {
    console.log(obj);
    const url = `/api/leagueDashPlayerClutch/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postLeagueDashPlayerPtShot = async(obj, season) => {
    console.log(obj);
    const url = `/api/leagueDashPlayerPtShot/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postLeagueDashPlayerShotLocations = async(obj, season) => {
    console.log(obj);
    const url = `/api/leagueDashPlayerPtShot/leaguedashplayershotlocations/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreScoring = async(obj, season) => {
    console.log(obj);
    const url = `/api/boxScoreScoring/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreScoringTeams = async(obj, season) => {
    console.log(obj);
    const url = `/api/boxScoreScoring/teams/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}

const postBoxScoreSummary = async(obj, season) => {
    console.log(obj);
    const url = `/api/boxScoreSummary/${season}`;
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
        console.log('error!');
        console.log(error);
    } 
}
/* uses the players name to retrieve the player Id from the NBA api, to access the statistics
endpoints in the NBA api I had to first supply the id. */
const getIdFromPlayersByName = async(playerLastName, playerFirstName) => {
    let players = await getPlayersByName(playerLastName);
    for (i = 0; i < players.api.players.length; i++) {
        if (players.api.players[i].firstName.toLowerCase() == playerFirstName.toLowerCase()) {
            let IdToReturn = parseInt(players.api.players[i].playerId); 
            return IdToReturn;
        }
    }
    return('garbage');
}



/* Appends any players' stat to the html table. Can take both regular stats and deep stats. */
rowIndex = 1;
const appendPlayerAndStat = async(player, stat, statAverage) => {

    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player;
    if (isNaN(statAverage)) {
        cell2.innerHTML = 'Statistics Unavailable'
    } else {
        cell2.innerHTML = stat + ":" + ` ${statAverage}`;
    }
    rowIndex += 1;
}

const getTeamsInConference = async(conference) => {
    let teams = await fetch('https://api-nba-v1.p.rapidapi.com/teams/confName/' + conference, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (teams.ok) {
        let jsonTeamsInConference = teams.json();
        return jsonTeamsInConference;
    }
}

const getTeamIdsFromConference = async(conference) => {
    let idArray = [];
    let teams = await getTeamsInConference(conference);
    for (let i = 0; i < teams.api.teams.length; i++) {
        idArray.push(teams.api.teams[i].teamId);
    }
    return idArray;
}

const getPlayersByTeamId = async(teamId) => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/teamId/' + teamId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;    
    }
}

const getStatsFromPlayerId = async(playerId) => {
    let stats = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (stats.ok) {
        let jsonStats = stats.json();
        return jsonStats;    
    }
}

const getTodaysStatsFromPlayerId = async(playerId) => {
    let today = DateTime.now()
    let stats = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (stats.ok) {
        let jsonStats = stats.json();
        return jsonStats;    
    }
}

const getPlayersInStandardLeague = async() => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/league/standard/', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;
    }
}
  


/* Retrieves entire desired player object and returns to user. */
const getPlayersByName = async(playerLastName) => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/lastName/' + playerLastName, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.PUBLICAPIKEY
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;
    }
}

const getGameInfo = async(year) => {
    let games = await fetch('https://api-nba-v1.p.rapidapi.com/games/seasonYear/' + year, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.PUBLICAPIKEY
        }
    })
    if (games.ok) {
        let jsonGames = games.json();
        return jsonGames;
    }
}



/* Get the season average for any player, for any stat, for any one of the years of data
provided by the NBA api */
const getSeasonStatAvg = async(stat, year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let statTotal = await getSeasonTotalOfStat(stat, gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let statAverage = statTotal / gamesPlayed;
    return Number.parseFloat(statAverage).toFixed(2);
}
/*
FOR EVERY STANDARD LEAGUE GAME FOR EVERY PLAYER
GET SEASON TOTAL OF STAT USING STANDARD LEAGUE GAME ARRAY FROM PREVIOUS STEP
GET GAMES PLAYED BY CHECKING 8IF 'MINS' ARE NOT NULL FOR PLAYER IN EACH GAME LINE
STAT AVERAGE = STEP 2 / STEP 3

GAME LINE ARRAY ===== FOR EVERY GAME IN GAMES DATABASE WHERE PLAYERID = THE PLAYERID, AND LEAGUE = STANDARD
FOR EACH GAME IN ARRAY, ADD UP TOTAL OF STAT SELECTED
FOR EACH GAME IN ARRAY, IF 'MIN' !== NULL, COUNT++, RETURN GAME COUNT
STAT AVERAGE = STAT TOTAL / GAMESPLAYED ARRAY.

*/






/* Retrieves player object 
const getPlayer = async() => {
    let playerFirstName = firstName.value;
    let playerLastName = lastName.value;
    let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
    let player = await getIndividualPlayer(id);
    return player;
}
*/
const getStatsArray = async(playerIdArray) => {
    let statsArray = [];
    for (let i = 0; i < playerIdArray.length; i++) {
        let stats = await getStatsFromPlayerId(playerIdArray[i]);
        statsArray.push(stats);
    }
    return statsArray;
}

let teamArray = [];
const teamsDropDown = async() => {

    let teams = await getJsonResponseFront('/api/teamnames');
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("teams").innerHTML = str;
    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      document.getElementById("teams").innerHTML = str;
    } catch(error) {
      console.log(error);
    }
}
/* Start up function, provides functionality for submit buttons. */
let teamPlayersArray = [];

teamChosen.onchange = async() => {
    await teamPlayersDropDown();
}

const teamPlayersDropDown = async() => {

    let teamId = await getJsonResponseFront(`/api/leagueGames/teamid/${teamChosen.value}`)
    console.log(teamId);
    let teamPlayers = await getJsonResponseFront(`/api/boxPlayers/teamplayers/${teamId[0].team_id}`);
    console.log(teamPlayers);
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("teamplayers").innerHTML = str;
    try {
        for (var player of teamPlayers) {
            console.log(player);
            str += "<option>" + player.player_name + "</option>";
            teamPlayersArray.push(player.player_name);
        }
        document.getElementById("teamplayers").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}

const clearTableContents = async() => {
    seasonAveragesRegularSeasonsTable.innerHTML = '';
    //splitLineTable.innerHTML = '';
    return true;
}

const clearSplitTable = async() => {
    splitLineTable.innerHTML = '';
    return true;
}

teamPlayerChosen.onchange = async() => {
    await getPlayerSeasons();
    careerHeader.innerHTML = '';
    splitHeader.innerHTML = '';
    let career = await displayPlayerCareerStats();
    let splits = await displayPlayerSplitStats();
}

splits.onchange = async() => {
    splitLineTable.innerHTML = '';
    splitHeader.innerHTML = '';
    await displayPlayerSplitStats();
}

seasonToGet.onchange = async() => {
    splitLineTable.innerHTML = '';
    splitHeader.innerHTML = '';
    await displayPlayerSplitStats();
}

let playerSeasonArray = [];
const getPlayerSeasons = async() => {
    let player = teamPlayerChosen.value;

    let playerid = await getJsonResponseFront(`/api/playersNBA/${player}`)
    
    if (!playerid) {
        await appendStatsUnavailable(seasonAveragesRegularSeasonsTable, 'Stats Unavailable');
        return;
    }
    let results = await getJsonResponseFront(`/api/regularSeasonStats/shotseasons/${playerid[0].playerid}`);
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("season").innerHTML = str;
    let seasonsArr = ['2015-2016', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];
    realSeasonArray = [];
    for (var result of results) {
        let splitSeason = result.season_id.split('-');
        realSeason = splitSeason[0] + '-20' + splitSeason[1];
        if (seasonsArr.includes(realSeason)) {
            realSeasonArray.push(realSeason);
        }
    }
    try {
        for (var season of realSeasonArray) {
            str += "<option>" + season + "</option>";
            playerSeasonArray.push(season);
        }
        document.getElementById("season").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
}

const splitNameFunction = async(fullName) => {
    if (!fullName) {
        let player = teamPlayerChosen.value;
        let playerFirstLast = player.split(' ');
        let first;
        let last;
        if (playerFirstLast.length > 2) {
            first = playerFirstLast[0];
            last = playerFirstLast[1] + ' ' + playerFirstLast[2];
        } else {
            first = playerFirstLast[0];
            last = playerFirstLast[1];
        }
        return ([first, last]);
    }

}

const displayPlayerCareerStats = async() => {
    let playerid = await getJsonResponseFront(`/api/playersNBA/${teamPlayerChosen.value}`);
    if (!playerid) {
        await appendStatsUnavailable(seasonAveragesRegularSeasonsTable, 'Stats Unavailable');
        return;
    }
    let statLines = await getJsonResponseFront(`/api/regularSeasonStats/getregularseasonstatlines/${playerid[0].playerid}`);
    let appended = await appendPlayerRegularSeasonStatLines(statLines);
    seasonAveragesRegularSeasonsTable.style.border = "1px solid rgb(117, 255, 4)";

}

const displayPlayerSplitStats = async() => {
    let playerid = await getJsonResponseFront(`/api/playersNBA/${teamPlayerChosen.value}`)
    let headers = await getJsonResponseFront(`/api/statsheaders/boxscorestraditional2015-2016`);
    let stat;
    let average;
    let averageObj = {};
    let averagesArray = [];
    if (!playerid) {
        await appendStatsUnavailable(splitLineTable, 'Stats Unavailable');
        return;
    }
    for (let i = 0; i < headers.length; i++) {
        stat = headers[i].column_name;
        console.log(seasonToGet.value)
        average = await getSeasonStatAvgLocal(stat, seasonToGet.value, playerid, splits.value)
        averageObj[stat] = average;
    }
    averagesArray.push(averageObj);
    console.log(averagesArray);
    await appendPlayerRegularSeasonStatLines(averagesArray, true);
    splitLineTable.style.border = "1px solid rgb(117, 255, 4)";
}

const appendStatsUnavailable = async(table, message) => {
    table.innerHTML = '';
    table.innerHTML = message;
}

const appendPlayerRegularSeasonStatLines = async(statlines, isSplitLine) => {
    console.log(statlines);

    let table = seasonAveragesRegularSeasonsTable;
    let headers = Object.keys(statlines[0]);

    console.log(headers);
    let cleared;
    if (isSplitLine) {
        cleared = await clearSplitTable();
        table = splitLineTable;
        row0 = splitLineTable.insertRow();
        row1 = splitLineTable.insertRow();
        let season = seasonToGet.value;
        let split = splits.value;
        if (season === 'none') {
            season = '2021-2022';
        }
        if (split === 'none') {
            split = 'Full Season';
        }
        
        splitHeader.innerHTML = `${teamPlayerChosen.value} ${season} ${splits.value} SPLITS`
        for (let x = 10; x < headers.length; x++) {
            let cell0 = row0.insertCell();
            if (headers[x].includes("_")) {
                let split = headers[x].split("_");
                headers[x] = split[0] + ' ' + split[1];
            }
            if (headers[x] === 'team_abbreviation') {
                headers[x] = 'TEAM';
            }
            cell0.innerHTML = headers[x].toUpperCase();
            let cell1 = row1.insertCell();
            
            cell1.innerHTML = Object.values(statlines[0])[x];
        }

    } else {
        cleared = await clearTableContents();
        row0 = seasonAveragesRegularSeasonsTable.insertRow(0);
        careerHeader.innerHTML = `${teamPlayerChosen.value} CAREER STATS`

        let arr = [3, 4]
        for (let i = 2; i < 28; i++) {
            if (arr.includes(i)) {
                continue;
            }
            let cell = row0.insertCell();
            cell.innerHTML = headers[i];
        }
        let rowIndex = 1;
        for (let j = 0; j < statlines.length; j++) {
            let row = table.insertRow(rowIndex);
            for (let k = 2; k < 28; k++) {
                if (arr.includes(k)) {
                    continue;
                }
                let cell = row.insertCell();
    
                let values = Object.values(statlines[j]);
                let totals = [9, 10, 11, 13, 14, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27]
                if (totals.includes(k)) {
                    let average = values[k] / values[7];
                    cell.innerHTML = average.toFixed(2);
                } else {
                    cell.innerHTML = values[k];
                }
            }
        }
    }

    /*
    if (isNaN(statAverage)) {
        cell2.innerHTML = 'Statistics Unavailable'
    } else {
        cell2.innerHTML = `${statAverage}`;
    }*/
}

const getSchedule = async() => {
    let season = scheduleSeason.value;
    let copies = [];
    let results = await getJsonResponseFront(`/api/leagueGames/frontSchedule/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        if (copies.includes(results[i].game_id)) {
            continue
        }
        copies.push(results[i].game_id);
        let appended = await appendScheduleTable(results[i], season);
    }
}

scheduleSeason.onchange = async() => {
    scheduleTable.innerHTML = '';
    await getSchedule();
}

rankedSeason.onchange = async() => {
    statRankingTable.innerHTML = '';
    await getAnyStatEveryPlayerRanked(statToGet.value);
}

statToGet.onchange = async() => {
    statRankingTable.innerHTML = '';
    await getAnyStatEveryPlayerRanked(statToGet.value);
}
//GET ANY STAT FROM ANY TABLE AND RANK PLAYERS BY STAT
const getAnyStatEveryPlayerRanked = async(stat) => {

    let season = rankedSeason.value
    if (!season) {
        season = '2015-2016';
    }
    let results = await getJsonResponseFront(`/api/statranked/${stat}/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let appended = await appendStatRankingTable(results[i], stat, season);
    }
}

const appendStatRankingTable = async(stats, stat, season) => {
    let row = statRankingTable.insertRow();
    let cell = row.insertCell();
    let cell1 = row.insertCell();
    cell.innerHTML = stats.player_name;
    cell1.innerHTML = stats.avg.toFixed(2);
}

const appendScheduleTable = async(stats, season) => {
    let row = scheduleTable.insertRow();
    let cell = row.insertCell();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let pts2 = stats.pts - stats.plus_minus;
    cell.innerHTML = stats.game_date
    cell1.innerHTML = stats.matchup;
    cell2.innerHTML = stats.pts + '-' + pts2; 
}

const boxTraditionalHomePage = async() => {
    let stats = ['']
}


const updateDatabase = async() => {
    await loadUpLocalFunction();
    await loadUpGamesLocalFunction();
    await loadUpGameInfoLocalFunction();
    console.log('ENTIRE DATABASE REFRESHED');
}

// checks if one day has passed.
let localStorage = {"yourapp_date": null}; 
const hasOneDayPassed = () => {
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == date ) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}


// some function which should run once a day
const runOncePerDay = async() => {
  if( !hasOneDayPassed() ) return false;

  // your code below
  await updateDatabase();
}

teamsDropDown();
getAnyStatEveryPlayerRanked('pts');
getSchedule();


//UNCOMMENT THIS CODE AND THE DATABASE WILL DELETE ITSELF AND REPLENISH EVERY TIME YOU START THE SERVER
//runOncePerDay(); // run the code

