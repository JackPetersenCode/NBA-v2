const loadUpExpectedBySeasonButton = document.getElementById("loadExpectedBySeasonButton");


const getJsonResponseJackorithm = async (url) => {
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

const getPreviousYear = async(season) => {
    let split = season.split('-')
    let previous = parseInt(split[1]) - 1;
    let previous2 = parseInt(split[0]) - 1;
    let thisSeason = previous2 + '-' + previous;
    return thisSeason;
}

const getAverageScore = async(season, previousGameId, previousSeason) => {
    console.log(season)

    let averageScore;
    if (previousGameId !== '1' && previousGameId.slice(-2) !== '01') {
        averageScore = await getJsonResponseJackorithm(`/api/leagueGames/averageScore/${previousGameId}/${season}`);
    } else {
        averageScore = await getJsonResponseJackorithm(`/api/leagueGames/averageScore/${previousSeason}`);
    }
    return averageScore;
}


const getRoster = async(season, teamId, previousGameId) => {
    if (previousGameId === '1' || previousGameId.slice(-2) === '01') {
           
        let roster = await getJsonResponseJackorithm(`/api/boxPlayers/getroster/${season}/${teamId}`)
        return roster;
    } else {
        let roster = await getJsonResponseJackorithm(`/api/boxPlayers/previousgame/gameid/${season}/${teamId}/${previousGameId}`);
        return roster;
    }
}
        

const postExpectedMatchup = async(obj, season) => {
    const url = `/api/gambling/jackorithm/${season}`;
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

const fixTheName = async(name) => {
    let newName = name;
    if (name === 'Los Angeles Lakers') {
        newName = 'LALakers'
    } 
    else if ( name === 'LA Clippers') {
        newName = 'LAClippers';
    }
    else if (name === 'Portland Trail Blazers') {
        newName = 'Portland';
    } else {
        let namesplit = name.split(' ');
        if (namesplit.length === 3) {
            newName = namesplit[0] + namesplit[1];
        } else {
            newName = namesplit[0];
        }
    }
    return newName;
}

const fixTheGameDate = async(date) => {
    let splitDate = date.split('-');
    let fixedDate;
    if (splitDate[1].substring(0, 1) === '0') {
        fixedDate = (splitDate[1] + splitDate[2]).substring(1)
    } else {
        fixedDate = (splitDate[1] + splitDate[2]);
    }
    return fixedDate;
}

const getOdds = async(season, oddsTeam, fullTeam, oddsDate, fullDate, H_or_V) => {

    let moneyline = await getJsonResponseJackorithm(`/api/gambling/moneyline/home/${season}/${oddsTeam}/${oddsDate}`)
    if (moneyline.length < 1) {
        if (season === '2022-2023') {
            moneyline = await getJsonResponseJackorithm(`/api/gambling/newOdds/${season}/${fullTeam}/${fullDate}/${H_or_V}`)
            if (moneyline.length > 0) {
                if (H_or_V === 'home') {
                    moneyline = moneyline[0].home_odds;
                } else {
                    moneyline = moneyline[0].away_odds;
                }
            } else {
                moneyline = 'unavailable';
            }
        } else {
            moneyline = 'unavailable';
        }
    } else {
        moneyline = moneyline[0].ml;
    }
    return moneyline;
}

const getGreenRed = async(home_expected, visitor_expected, home_actual, visitor_actual) => {

    /*if (home_expected === visitor_expected) {
        return 'green';
    }*/
    if (home_expected > visitor_expected) {
        if (home_actual > visitor_actual) {
            return 'green';
        } else {
            return 'red';
        }
    } else {
        if (home_actual < visitor_actual) {
            return 'green';
        } else {
            return 'red';
        }
    }
}

const getPostObject = async(game, season, previousSeason) => {
    let expected = await getExpected(game, season, previousSeason);
    let home_team = await getJsonResponseJackorithm(`/api/boxScoreSummary/teamname/${game.home_team_id}`)
    let visitor_team = await getJsonResponseJackorithm(`/api/boxScoreSummary/teamname/${game.visitor_team_id}`)
    
    let newHome = await fixTheName(home_team[0].team_name)
    let newVisitor = await fixTheName(visitor_team[0].team_name)

    let game_date = await fixTheGameDate(game.game_date)

    let home_odds = await getOdds(season, newHome, home_team[0].team_name, game_date, game.game_date, 'home')

    let visitor_odds = await getOdds(season, newVisitor, visitor_team[0].team_name, game_date, game.game_date, 'away')



    let green_red = await getGreenRed(parseFloat(expected[1]), parseFloat(expected[3]), parseFloat(game.pts), (parseFloat(game.pts) - parseFloat(game['plus_minus'])))

    let obj = {
        game_date: game.game_date,
        matchup: game.matchup,
        home_team: home_team[0].team_name,
        home_team_id: game.home_team_id,
        home_expected: parseFloat(expected[1]).toFixed(0),
        visitor_team: visitor_team[0].team_name,
        visitor_team_id: game.visitor_team_id,
        visitor_expected: parseFloat(expected[3]).toFixed(0),
        home_actual: game.pts,
        visitor_actual: parseInt(game.pts) - parseInt(game['plus_minus']),
        home_odds: home_odds,
        visitor_odds: visitor_odds,
        green_red: green_red
    }
    postExpectedMatchup(obj, season)
}

const getExpected = async(game, season, previousSeason) => {
    let stat = "+/-";
    let homeTeamId = game.home_team_id;
    console.log(homeTeamId)
    console.log(game)
    console.log(season)
    console.log(previousSeason)

    let homePrevious = await getJsonResponseJackorithm(`/api/boxScoresTraditional/previousgameid/${game.game_id}/${season}/${homeTeamId}`)
    console.log(homePrevious)
    if (homePrevious.length < 1) {
        homePrevious = '1';
    } else {
        homePrevious = homePrevious[0].game_id;
    }

    let homeRoster = await getRoster(season, homeTeamId, homePrevious);
    console.log(homeRoster)
    let visitorTeamId = game.visitor_team_id;
    let visitorPrevious = await getJsonResponseJackorithm(`/api/boxScoresTraditional/previousgameid/${game.game_id}/${season}/${visitorTeamId}`)
    
    if (visitorPrevious.length < 1) {
        visitorPrevious = '1';
    } else {
        visitorPrevious = visitorPrevious[0].game_id
    }

    let visitorRoster = await getRoster(season, visitorTeamId, visitorPrevious);
    console.log(visitorRoster)
    let homeExpected = await getExpectedFromRoster(season, 'home', homeRoster, homePrevious, stat, previousSeason);
    console.log(homeExpected)

    let visitorExpected = await getExpectedFromRoster(season, 'visitor', visitorRoster, visitorPrevious, stat, previousSeason);
    console.log(visitorExpected)
    return [ homeTeamId, homeExpected, visitorTeamId, visitorExpected];
}

const getExpectedFromRoster = async(season, H_or_V, roster, previousGameId, stat, previousSeason) => {
    let totalMins = 0.0;
    let totalStat = 0.0;
    let averageScore = await getAverageScore(season, previousGameId, previousSeason)
    for (let i = 0; i < roster.length; i++) {
        
        let averages;
        if (previousGameId !== '1') {
            averages = await getJsonResponseJackorithm(`/api/boxScoresTraditional/averages/82games/${previousGameId}/${roster[i].player_id}/${season}/${H_or_V}`)
            console.log(averages)
            if (averages.length > 0) {
                totalMins += parseFloat(averages[0].min);
                totalStat += parseFloat(averages[0][stat]);

            } else {
                averages = await getJsonResponseJackorithm(`/api/boxScoresTraditional/averages/82games/${roster[i].player_id}/${previousSeason}/${H_or_V}`)
                console.log(averages)
                if (averages.length > 0) {
                    totalMins += parseFloat(averages[0].min);
                    totalStat += parseFloat(averages[0][stat]);
                } else {
                    averages = [{
                        "+/-": 0,
                        ast: 0,
                        blk: 0,
                        dreb: 0,
                        fg3_pct: 0,
                        fg3a: 0,
                        fg3m: 0,
                        fg_pct: 0,
                        fga: 0,
                        fgm: 0,
                        ft_pct: 0,
                        fta: 0,
                        ftm: 0,
                        min: 0,
                        oreb: 0,
                        pf: 0,
                        playerId: 0,
                        player_name: 'NO STATS FOR PLAYER',
                        pts: 0,
                        reb: 0,
                        stl: 0,
                        team_abbreviation: 'NO STATS FOR PLAYER',
                        team_id: 0,
                        to: 0
                    }]
                }
            }
        } else {
            averages = await getJsonResponseJackorithm(`/api/boxScoresTraditional/averages/82games/${roster[i].player_id}/${previousSeason}/${H_or_V}`);
            if (averages.length > 0) {
        
                totalMins += parseFloat(averages[0].min);
                totalStat += parseFloat(averages[0][stat]);
              
            } else {
                averages = [{
                    "+/-": 0,
                    ast: 0,
                    blk: 0,
                    dreb: 0,
                    fg3_pct: 0,
                    fg3a: 0,
                    fg3m: 0,
                    fg_pct: 0,
                    fga: 0,
                    fgm: 0,
                    ft_pct: 0,
                    fta: 0,
                    ftm: 0,
                    min: 0,
                    oreb: 0,
                    pf: 0,
                    playerId: 0,
                    player_name: 'NO STATS FOR PLAYER',
                    pts: 0,
                    reb: 0,
                    stl: 0,
                    team_abbreviation: 'NO STATS FOR PLAYER',
                    team_id: 0,
                    to: 0
                }]
            }
        }
    }
    console.log(totalMins)
    console.log(totalStat)

    return (averageScore[0].avg + (totalStat / totalMins * 240)).toFixed(0);
}

const getGames = async(season) => {
    let previousSeason = await getPreviousYear(season);
    let games = await getJsonResponseJackorithm(`/api/leagueGames/withboxscoresummary/${season}`)
    console.log(games.length)
    for (let i = 0; i < games.length; i++) {
        console.log(i)
        await getPostObject(games[i], season, previousSeason)
    }
}

loadUpExpectedBySeasonButton.onclick = async() => {
    await loadExpectedBySeason('2021-2022');
}

const loadExpectedBySeason = async(season) => {
    await getGames(season);
}
