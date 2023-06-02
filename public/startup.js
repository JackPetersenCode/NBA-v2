
const mvpSubmit = document.getElementById("submit-mvp");
const statSubmit = document.getElementById("submit-stat");
const deepStatSubmit = document.getElementById("submit-deep-stat");
const clearButton = document.getElementById("clearButton");

const loadUpLocal = document.getElementById("loadButton");
const loadUpBoxScoresLocalButton = document.getElementById("loadUpBoxScoresLocalButton")
const loadUpLocalPlayers = document.getElementById("loadPlayersButton");
const loadUpLeagueGamesBySeasonButton = document.getElementById("LOADGAMES")
const loadUpGamesLocal = document.getElementById("loadGamesButton");
const loadUpGameInfoLocal = document.getElementById("loadGameInfoButton");
const loadUpShotChartButton = document.getElementById("loadUpShotChartButton");
const loadUpNBAPlayersButton = document.getElementById("loadUpNBAPlayersButton");
const loadUpShotChartsBySeasonButton = document.getElementById("loadUpShotChartsBySeasonButton");
const loadUpGamesCloud = document.getElementById("loadUpGamesCloud");
const loadUpGameInfoCloudButton = document.getElementById("loadUpGameInfoCloud");
const loadUpBoxScoresTraditionalLocalButton = document.getElementById("loadUpBoxScoresTraditionalLocal");
const loadUpPlayerCareerStatsButton = document.getElementById("loadUpPlayerCareerStats");
const submitPlayerStats = document.getElementById("submit-player-stats");
const fullName = document.getElementById("fullName");
const loadUpBoxScoreFourFactorsButton = document.getElementById("loadUpBoxScoreFourFactors");
const loadUpBoxScoreFourFactorsTeamsButton = document.getElementById("loadUpBoxScoreFourFactorsTeams");
const loadUpBoxScoreMiscButton = document.getElementById("loadUpBoxScoreMisc");
const loadUpBoxScoreMiscTeamsButton = document.getElementById("loadUpBoxScoreMiscTeams");
const loadUpBoxScorePlayerTrackerButton = document.getElementById("loadUpBoxScorePlayerTracker");
const loadUpBoxScorePlayerTrackerTeamsButton = document.getElementById("loadUpBoxScorePlayerTrackerTeams");
const loadUpLeagueDashLineupsButton = document.getElementById("loadUpLeagueDashLineups");
const loadUpLeagueDashOppPtShotButton = document.getElementById("loadUpLeagueDashOppPtShot");
const loadUpLeagueDashPlayerClutchButton = document.getElementById("loadUpLeagueDashPlayerClutch");
const loadUpLeagueDashPlayerPtShotButton = document.getElementById("loadUpLeagueDashPlayerPtShot");
const loadUpLeagueDashPlayerShotLocationButton = document.getElementById("loadUpLeagueDashPlayerShotLocation");
const loadUpBoxScoreScoringButton = document.getElementById("loadUpBoxScoreScoring");
const loadUpBoxScoreScoringTeamsButton = document.getElementById("loadUpBoxScoreScoringTeams")
const loadUpBoxScoreSummaryButton = document.getElementById("loadUpBoxScoreSummary");
const loadUpNewOddsButton = document.getElementById("loadUpNewOdds");
const loadUpLeagueHustleStatsButton = document.getElementById("loadUpLeagueHustleStatsButton");


const getJsonResponseStartup = async (url) => {
    console.log(url);
    const response = await fetch(url, {withCredentials: true});
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}

deepStatToGet.onchange = async() => {
    let splitPlayer = teamPlayerChosen.value.split(' ');
    let last = splitPlayer[1];
    let first = splitPlayer[0]; 
    let playerIdArray = await getJsonResponseStartup(`/api/playersNBA/official/players/playerid/${last}/${first}`);
    let stat;
    if (deepStatToGet.value === 'MVP Points') {
        stat = await getMvpPoints(seasonToGet.value, playerIdArray[0].playerid);
    } else if (deepStatToGet === 'Hustle Factor') {
        stat = await getHustleFactor(seasonToGet.value, playerIdArray[0].playerid);
    } else {
        stat = await getCarmeloFactor(seasonToGet.value, playerIdArray[0].playerid);
    }
    appendPlayerAndStat(teamPlayerChosen.value, stat, deepStatToGet.value);

}

const onStartUp = async() => {
/*
    statSubmit.onclick = async() => {
        let stat = statToGet.value;
        console.log(stat)
        let playerFirstName = firstName.value;
        let playerLastName = lastName.value;
        let season = seasonToGet.value;
        console.log(season);
        let id = await getIdFromPlayersByNameLocal(playerLastName, playerFirstName);
        console.log(id);
        let statAverage = await getSeasonStatAvgLocal(stat, season, id[0].playerid);
        console.log(statAverage);
        console.log(id);
        let player = await getIndividualPlayerLocal(id[0].playerid);
        console.log(player);
        appendPlayerAndStat(player, stat, statAverage);
    }*/
    /*THIRD-PART STAT-SUBMIT BUTTON DEACTIVATED FOR NOW
    statSubmit.onclick = async() => {
        let stat = statToGet.value;
        console.log(stat)
        let playerFirstName = firstName.value;
        let playerLastName = lastName.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
        let statAverage = await getSeasonStatAvg(stat, season, id);
        let player = await getIndividualPlayer(id);
        appendPlayerAndStat(player.api.players[0], stat, statAverage);
    }
    */

    /*
    hustleFactorSubmit.onclick = async() => {
        let id = await getIdFromPlayersByName(lastName.value, firstName.value);
        console.log(id)
        let hustleFactor = await getHustleFactor(seasonToGet.value, id)
        let player = await getIndividualPlayer(id);
        console.log(hustleFactor)
        appendPlayerAndStat(player.api.players[0], 'Hustle Factor: ', hustleFactor)
    }*/
/*
    deepStatSubmit.onclick = async() => {
        let stat = deepStatToGet.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByName(lastName.value, firstName.value)
        let statPoints;
        if (stat === "Hustle Factor") {
            statPoints = await getHustleFactor(season, id);
        } else if (stat === "Carmelo Factor") {
            statPoints = await getCarmeloFactor(season, id);
        } else {
            statPoints = await getQualityShotPercentage(season, id);
        }
        let player = await getIndividualPlayer(id)
        appendPlayerAndStat(player.api.players[0], stat, statPoints);
    }
*/

    clearButton.onclick = async() => {
        playerInfoTable.innerHTML = '';
        rowIndex = 0;
    }

    loadUpLocal.onclick = async() => {
        let conference = 'East';
        let teamIds = await getTeamIdsFromConference(conference);
        console.log(teamIds);
        for (let j = 0; j < teamIds.length; j++) {
            let players = await getPlayersByTeamId(teamIds[j]);

            for (let i = 0; i < players.api.players.length; i++) {
                console.log(players.api.players[i])
                let player = await postPlayer(players.api.players[i]);
                console.log(player);
            }
        }
    }

    loadUpLocalPlayers.onclick = async() => {
        let players = await getJsonResponseStartup('/api/publicApiPlayers/playersJson');
        for (let i = 0; i < players.length; i++) {
            let playersdoc = await postWriteJsonPlayers(players[i]);
            console.log(playersdoc);
        }   
    }
        
        
    loadUpGamesLocal.onclick = async() => {
        let playerIdArray = await getArrayOfPlayerIdsInEastandWestConferences();
        console.log(playerIdArray);
        console.log(playerIdArray.length);
        let statsArray = await getStatsArray(playerIdArray);
        console.log(statsArray);
        for (let i = 0; i < statsArray.length; i ++) {
            console.log('HELLLLOOOOO');
            for (let j = 0; j < statsArray[i].api.statistics.length; j++) {
                let game = await postGame(statsArray[i].api.statistics[j]);
            }
        }
    }

    loadUpGamesCloud.onclick = async() => {
        let games = await getJsonResponseStartup('/api/publicGames/gamescloud');
        console.log(games.length)
        for (let i = 0; i < games.length; i++) {
            console.log(games[i]);
            await postGameCloud(games[i]);
        }
        console.log('FIIIIINNNNNNIIIIIIIISSSSSSSSHHHHHHHHEEEEEEDDDDDD');
    }

    loadUpGameInfoLocal.onclick = async() => {
        //let years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
        let years = ['2022-2023']
        for (let i = 0; i < years.length; i++) {
            let games = await getGameInfo(years[i]);
            for (let j = 0; j < games.api.games.length; j++) {
                let results = await postGameInfo(games.api.games[j]);
            }
        } 
    }
    submitPlayerStats.onclick = async() => {
        let results = await getJsonResponseStartup(`/api/playersNBA/${fullName.value}`);
        let statlines = await getJsonResponseStartup(`/api/regularSeasonStats/getregularseasonstatlines/${results[0].playerid}`);
        splitLineTable.innerHTML = '';
        seasonAveragesRegularSeasonsTable.innerHTML = '';
        await appendPlayerRegularSeasonStatLines(statlines);
    }

    loadUpShotChartButton.onclick = async() => {
        await loadUpShotCharts();
    }
    loadUpShotChartsBySeasonButton.onclick = async() => {
        await loadUpShotChartsBySeason();
    }
    loadUpNBAPlayersButton.onclick = async() => {
        await loadUpNBAPlayers();
    }
    loadUpLeagueGamesBySeasonButton.onclick = async() => {
        await loadUpLeagueGamesBySeason();
    }
    loadUpBoxScoresLocalButton.onclick = async() => {
        await loadUpBoxScoresLocalFunction();
    }
    loadUpLeagueHustleStatsButton.onclick = async() => {
        await loadUpLeagueHustleStatsPlayerFunction();
    }
    loadUpGameInfoCloudButton.onclick = async() => {
        await loadUpGameInfoCloud();
    }
    loadUpBoxScoresTraditionalLocalButton.onclick = async() => {
        await loadUpBoxScoresTraditionalLocalFunction();
    }
    loadUpPlayerCareerStatsButton.onclick = async() => {
        await loadUpPlayerCareerStatsFunction();
    }
    loadUpBoxScoreFourFactorsButton.onclick = async() => {
        await loadUpBoxScoreFourFactorsFunction();
    }
    loadUpBoxScoreFourFactorsTeamsButton.onclick = async() => {
        await loadUpBoxScoreFourFactorsTeamsFunction();
    }
    loadUpBoxScoreMiscButton.onclick = async() => {
        await loadUpBoxScoreMiscFunction();
    }
    loadUpBoxScoreMiscTeamsButton.onclick = async() => {
        await loadUpBoxScoreMiscTeamsFunction();
    }
    loadUpBoxScorePlayerTrackerButton.onclick = async() => {
        await loadUpBoxScorePlayerTrackerFunction();
    }
    loadUpBoxScorePlayerTrackerTeamsButton.onclick = async() => {
        await loadUpBoxScorePlayerTrackerTeamsFunction();
    }
    loadUpLeagueDashLineupsButton.onclick = async() => {
        await loadUpLeagueDashLineupsFunction();
    }
    loadUpLeagueDashOppPtShotButton.onclick = async() => {
        await loadUpLeagueDashOppPtShotFunction();
    }
    loadUpLeagueDashPlayerClutchButton.onclick = async() => {
        await loadUpLeagueDashPlayerClutchFunction();
    }
    loadUpLeagueDashPlayerPtShotButton.onclick = async() => {
        await loadUpLeagueDashPlayerPtShotFunction();
    }
    loadUpLeagueDashPlayerShotLocationButton.onclick = async() => {
        await loadUpLeagueDashPlayerShotLocationFunction();
    }
    loadUpBoxScoreScoringButton.onclick = async() => {
        await loadUpBoxScoreScoringFunction();
    }
    loadUpBoxScoreScoringTeamsButton.onclick = async() => {
        await loadUpBoxScoreScoringTeamsFunction();
    }
    loadUpBoxScoreSummaryButton.onclick = async() => {
        await loadUpBoxScoreSummaryFunction();
    }
    loadUpNewOddsButton.onclick = async() => {
        await loadUpNewOddsFunction();
    }
}



const loadUpLocalFunction = async() => {
    let conference = 'East';
    let teamIds = await getTeamIdsFromConference(conference);
    console.log(teamIds);
    for (let j = 0; j < teamIds.length; j++) {
        let players = await getPlayersByTeamId(teamIds[j]);
        for (let i = 0; i < players.api.players.length; i++) {
            console.log(players.api.players[i])
            //ACTIVATE CODE IF YOU NEED TO LOAD UP PLAYERS INTO LOCAL DATABASE
            //let player = await postPlayer(players.api.players[i]);
        }
    }
}

const loadUpGamesLocalFunction = async() => {
    let playerIdArray = await getArrayOfPlayerIdsInEastandWestConferences();
    console.log(playerIdArray);
    console.log(playerIdArray.length);
    let statsArray = await getStatsArray(playerIdArray);
    console.log(statsArray);
    for (let i = 0; i < statsArray.length; i ++) {
        console.log('HELLLLOOOOO');
        for (let j = 0; j < statsArray[i].api.statistics.length; j++) {
            //ACTIVATE CODE IF YOU NEED TO LOAD GAMES DATA INTO LOCAL DATABASE
            //let game = await postGame(statsArray[i].api.statistics[j]);
        }
    }
}

const loadUpGameInfoLocalFunction = async() => {
    //let years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    let years = ['2022-2023'];
    for (let i = 0; i < years.length; i++) {
        let games = await getGameInfo(years[i]);
        for (let j = 0; j < games.api.games.length; j++) {
            //ACTIVATE CODE IF YOU NEED TO LOAD GAMEINFO INTO YOUR LOCAL DATABASE
            //let results = await postGameInfo(games.api.games[j]);
        }
    } 
}

const loadUpShotCharts = async() => {
    //let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];
    let years = ['2022-2023'];
    for (let i = 0; i < years.length; i++) {
        let shotsArray = await getJsonResponseStartup('/api/shots');
        for (let k = 0; k < shotsArray.length; k++) {
            console.log(shotsArray)
            for (let j = 0; j < shotsArray[k].resultSets.length; j++) {
                //console.log(shotsArray[k].resultSets[j])
                for (let m = 0; m < shotsArray[k].resultSets[j].rowSet.length; m++) {
                    console.log(shotsArray[k].resultSets[j].rowSet.length);
                    
                    //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
                    //let results = await postShot(shotsArray[k].resultSets[j].rowSet[m]);
                }
            }
        }
    } 
}

const loadUpShotChartsBySeason = async() => {
    //let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    let tableLength = await getJsonResponseStartup(`/api/tablelength/2022-2023`);
    console.log(tableLength);
    let years = ['2022-2023'];
    let shotsArray = await getJsonResponseStartup(`/api/shots/${years[0]}`);
    console.log(shotsArray.resultSets[0].rowSet.length)        

    for (let m = tableLength[0].count - 1; m < shotsArray.resultSets[0].rowSet.length; m++) {
        console.log(m)        
        //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
        let results = await postShotBySeason(shotsArray.resultSets[0].rowSet[m], years[0]);
    }
    
    
    console.log('FINISHED!!!!!!!!!!!!!!!!!!!!!!1');
}

const loadUpAllTimeLeadersGrids = async() => {
        
}

const loadUpNBAPlayers = async() => {
    let players = await getJsonResponseStartup('/api/playersNBA');
    console.log(players); 
    for (i = 0; i < players.length; i++) {
        let player = {
            playerid: players[i].id.toString(),
            full_name: players[i].full_name,
            first_name: players[i].first_name,
            last_name: players[i].last_name,
            is_active: players[i].is_active,
        }
        console.log(player);
        let results = await postPlayersNBA(player);
    }  
    console.log('FINISHED!');
}

const loadUpLeagueGamesBySeason = async() => {
    //let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];
    let years = ['2022-2023'];
    let tableLength = await getJsonResponseStartup(`/api/tablelength/leagueGames2022-2023`);
    tableLength = (tableLength[0].count)
    console.log(tableLength)
    for (let i = 0; i < years.length; i++) {
        let gamesArray = await getJsonResponseStartup(`/api/leagueGames/${years[i]}`);
        for (let j = 0; j < gamesArray.resultSets.length; j++) {
            for (let m = 0; m < gamesArray.resultSets[j].rowSet.length; m++) {
                
                //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
                let results = await postLeagueGamesBySeason(gamesArray.resultSets[j].rowSet[m], years[i]);
            }
        }
    }
    console.log('FINISHED!!!!!!!!!!!!!!!!!!!!!!1');
}

const loadUpBoxScoresLocalFunction = async() => {
    let season = "2022-2023";
    let tablelength = await getJsonResponseStartup(`/api/tablelength/boxscores${season}`)
    tablelength = tablelength[0].count
 
    let data = await getJsonResponseStartup(`/api/box/read/${season}`);
    for (let i = tablelength - 1; i < data.length; i++) {
        console.log(i);
        await postBoxScoresBySeason(data[i], season);
    }
    //for (let i = 0; i < data.length; i++) {
    //    await postBoxScoresBySeason(data[i], season);
    //}
}

const loadUpNewOddsFunction = async() => {
    let season = "2022-2023";

    let data = await getJsonResponseStartup(`/api/gambling/newOdds/${season}`);
    for (let i = 0; i < data.length; i++) {
        console.log(i)
        await postNewOdds(data[i], season);
    } 
}
/*
const loadUpBoxScoresTraditionalLocalFunction = async() => {
    let season = "2022-2023";
    let tablelength = await getJsonResponseStartup(`/tablelength/boxscorestraditional2022-2023`)
    tablelength = tablelength[0].count
    let data = await getJsonResponseStartup(`/boxScoresTraditional/read/${season}`);
    for (let i = data.length-1; i > tablelength-1; i--) {
        console.log(data[i]);
        await postBoxScoresTraditionalBySeason(data[i], season);
    } 

}*/

const loadUpBoxScoresTraditionalLocalFunction = async() => {
    let season = "2022-2023";
    let tablelength = await getJsonResponseStartup(`/api/tablelength/boxscorestraditional${season}`)
    tablelength = tablelength[0].count
    console.log(tablelength)
    let data = await getJsonResponseStartup(`/api/boxScoresTraditional/read/${season}`);
    console.log(data.length)
    for (let i = tablelength - 1; i < data.length; i++) {
        await postBoxScoresTraditionalBySeason(data[i], season);
    }
    //let data = await getJsonResponseStartup(`/boxScoresTraditional/read/${season}`);

    //for (let i = 0; i < data.length; i++) {
    //    await postBoxScoresTraditionalBySeason(data[i], season);
    //} 
}

const loadUpLeagueHustleStatsPlayerFunction = async() => {
    //let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];
    let years = ['2022-2023'];
    for (let i = 0; i < years.length; i++) {
        let hustleArray = await getJsonResponseStartup(`/api/hustleStats/leaguehustlestats/${years[i]}`);
        for (let j = 0; j < hustleArray.resultSets.length; j++) {
            for (let m = 0; m < hustleArray.resultSets[j].rowSet.length; m++) {
                console.log(hustleArray.resultSets[j].rowSet[m]);
                
                //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
                let results = await postLeagueHustleStatsBySeason(hustleArray.resultSets[j].rowSet[m], years[i]);
            }
        }
    }
    console.log('FINISHED!!!!!!!!!!!!!!!!!!!!!!1');
}

const loadUpGameInfoCloud = async() => {
    let gameinfo = await getJsonResponseStartup(`/api/publicGames/gameinfocloud`);
    for (let i = 0; i < gameinfo.length; i++) {
        let info = await postGameInfoCloud(gameinfo[i]);
        console.log(info);
    }
}

const loadUpPlayerCareerStatsFunction = async() => {
    //WRITE SEASON REGULAR PLAYER STATS
    let results = await getJsonResponseStartup('/api/regularSeasonStats');
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postSeasonRegularPlayerStatsTotals(results[i]);
        console.log(postedResults);
    }
}

const loadUpBoxScoreFourFactorsFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/fourFactors/read/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postBoxScoreFourFactors(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScoreFourFactorsTeamsFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/fourFactors/teams/read/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postBoxScoreFourFactorsTeams(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScoreMiscFunction = async() => {
    let season = "2022-2023";
    let tablelength = await getJsonResponseStartup(`/api/tablelength/boxscoremisc${season}`)
    tablelength = tablelength[0].count
    let results = await getJsonResponseStartup(`/api/boxScoreMisc/read/${season}`);
    console.log(results);
    console.log(tablelength)
    console.log(results.length)
    for (let i = tablelength - 1; i < results.length; i++) {
        let postedResults = await postBoxScoreMisc(results[i], season);
    }
}

const loadUpBoxScoreMiscTeamsFunction = async() => {
    let season = "2022-2023s";
    let results = await getJsonResponseStartup(`/api/boxScoreMisc/teams/read/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postBoxScoreMiscTeams(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScorePlayerTrackerFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/playerTracker/read/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postBoxScorePlayerTracker(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScorePlayerTrackerTeamsFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/playerTracker/teams/read/${season}`);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        let postedResults = await postBoxScorePlayerTrackerTeams(results[i], season);
        console.log(postedResults);
    }
}

const loadUpLeagueDashLineupsFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/leagueDashLineups/read/${season}`);
    console.log(results);
    console.log(results.resultSets[0].rowSet.length)
    console.log(results.resultSets[0].rowSet)

    for (let i = 0; i < results.resultSets[0].rowSet.length; i++) {
        console.log(results.resultSets[0].rowSet[i])
        let postedResults = await postLeagueDashLineups(results.resultSets[0].rowSet[i], season);
        console.log(postedResults);
    }
}

const loadUpLeagueDashOppPtShotFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/leagueDashOppPtShot/read/${season}`);
    console.log(results);
    console.log(results.resultSets[0].rowSet.length)
    console.log(results.resultSets[0].rowSet)

    for (let i = 0; i < results.resultSets[0].rowSet.length; i++) {
        console.log(results.resultSets[0].rowSet[i])
        let postedResults = await postLeagueDashOppPtShot(results.resultSets[0].rowSet[i], season);
        console.log(postedResults);
    }
}

const loadUpLeagueDashPlayerClutchFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/leagueDashPlayerClutch/read/${season}`);
    console.log(results);
    console.log(results.resultSets[0].rowSet.length)
    console.log(results.resultSets[0].rowSet)

    for (let i = 0; i < results.resultSets[0].rowSet.length; i++) {
        console.log(results.resultSets[0].rowSet[i])
        let postedResults = await postLeagueDashPlayerClutch(results.resultSets[0].rowSet[i], season);
        console.log(postedResults);
    }
}

const loadUpLeagueDashPlayerPtShotFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/leagueDashPlayerPtShot/read/${season}`);
    console.log(results);
    console.log(results.resultSets[0].rowSet.length)
    console.log(results.resultSets[0].rowSet)

    for (let i = 0; i < results.resultSets[0].rowSet.length; i++) {
        console.log(results.resultSets[0].rowSet[i])
        let postedResults = await postLeagueDashPlayerPtShot(results.resultSets[0].rowSet[i], season);
        console.log(postedResults);
    }
}

const loadUpLeagueDashPlayerShotLocationFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/leagueDashPlayerPtShot/read/leaguedashplayershotlocations/${season}`);
    console.log(results);
    console.log(results.resultSets.rowSet.length)
    console.log(results.resultSets.rowSet)

    for (let i = 0; i < results.resultSets.rowSet.length; i++) {
        console.log(results.resultSets.rowSet[i])
        let postedResults = await postLeagueDashPlayerShotLocations(results.resultSets.rowSet[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScoreScoringFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/boxScoreScoring/read/${season}`);
    console.log(results);

    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
        let postedResults = await postBoxScoreScoring(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScoreScoringTeamsFunction = async() => {
    let season = "2022-2023";
    let results = await getJsonResponseStartup(`/api/boxScoreScoring/teams/read/${season}`);
    console.log(results);

    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
        let postedResults = await postBoxScoreScoringTeams(results[i], season);
        console.log(postedResults);
    }
}

const loadUpBoxScoreSummaryFunction = async() => {
    let season = "2022-2023";
    //let season = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];
    let tablelength = await getJsonResponseStartup(`/api/tablelength/boxscoresummary2022-2023`)
    tablelength = tablelength[0].count

    let results = await getJsonResponseStartup(`/api/boxScoreSummary/read/${season}`);
    for (let i = tablelength - 1; i < results.length; i++) {
        let postedResults = await postBoxScoreSummary(results[i], season);
    }
}
onStartUp();
