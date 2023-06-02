const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getGamesBySeason = async(request, response, next) => {
    let season = request.params;
    try {
        let games = await require(`../juicystats/leaguegamesTEST${season['season']}.json`);
        response.status(200).send(games);  
    } catch (error) {
        return next(error);
    }  
}

const getGamesBySeasonLocal = async(request, response, next) => {
    let season = request.params;
    db.query(`SELECT * FROM "leagueGames${season["season"]}"`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getGamesBySeasonJackarithm = async(request, response, next) => {
    let season = request.params;
    season = season["season"];
    db.query(`SELECT "leagueGames${season}".*,
                "boxscoresummary${season}".home_team_id, 
                "boxscoresummary${season}".visitor_team_id
                FROM "leagueGames${season}"
                INNER JOIN "boxscoresummary${season}"
                ON "boxscoresummary${season}".game_id = "leagueGames${season}".game_id
                WHERE matchup LIKE '%vs.%'`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
 
const getAveragePointTotal = async(request, response, next) => {
    let { gameId, season } = request.params;
    db.query(`SELECT AVG(CAST(pts AS FLOAT))
                FROM "leagueGames${season}"
                WHERE game_id < $1`, [gameId], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getAveragePointTotalWholeSeason = async(request, response, next) => {
    let { season } = request.params;
    db.query(`SELECT AVG(CAST(pts AS FLOAT))
                FROM "leagueGames${season}"`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getGameIdGameDateMatchupBySeasonDropDownLocal = async(request, response, next) => {
    let { player, season } = request.params;
    //console.log(player);
    //console.log(season);
    
    db.query(`SELECT DISTINCT "leagueGames${season}".game_id, "leagueGames${season}".game_date, matchup FROM "leagueGames${season}"
              INNER JOIN "${season}"
              ON "leagueGames${season}".game_id="${season}".game_id
              WHERE "${season}".player_name = $1
              ORDER BY "leagueGames${season}".game_date`, [`${player}`], (error, results) => {
        if (error) {
            return next(error);
        }

        response.status(200).json(results.rows)
    })
}

const getGamesLocal = async(request, response, next) => {
    for (let i = 0; i < 7; i++) { 
        db.query('SELECT * FROM "leagueGames2015-2016"', [season['season']], (error, results) => {
            if (error) {
                return next(error);
            }
            if (results.rows.length === 0 || results.rows[0].count === '0') {
                return next(new Error( 'Stats Do Not Exist' ));
            }
            response.status(200).json(results.rows)
        })
    }
}

const createGamesBySeason = (request, response, next) => {
    let season = request.params;
    //console.log(season);
    const body = request.body;
    db.query(`INSERT INTO "leagueGames${season['season']}" (season_id, team_id, team_abbreviation, team_name, game_id, game_date, matchup, wl, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts, plus_minus, video_available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`, 
    [body[0], body[1].toString(), body[2], body[3], body[4], body[5], body[6], body[7], body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
  
const getTeamIdFromName = async(request, response, next) => {
    let teamname = request.params;
    if (teamname.teamname === 'Los Angeles Clippers') {
        teamname.teamname = 'LA Clippers';
    }
    db.query('SELECT DISTINCT team_id FROM "leagueGames2021-2022" WHERE team_name = $1', [teamname.teamname], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

  //I NEED: HOME TEAM: visitor team, 
const getGameResultsByHomeTeamSeason = (request, response, next) => {
    const {team, season} = request.params;
  
    db.query(`SELECT game_date, matchup, wl, pts, plus_minus FROM "leagueGames${season}" WHERE team_name = $1`, [team], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
  //I NEED: HOME TEAM: visitor team, 
const getGameResultsByVisitorTeamSeason = (request, response, next) => {
    const {team, season} = request.params;
  
    db.query(`SELECT game_date, matchup, wl, pts, plus_minus FROM "leagueGames${season}" WHERE team_name = $1`, [team], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getActualGameResultsByMatchupBySeason = (request, response, next) => {
    const {matchup1, season} = request.params;

    db.query(`SELECT * FROM "leagueGames${season}"
              WHERE matchup = $1`, [matchup1], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

  
const getAbbreviationFromTeamName = (request, response, next) => {
    let {team_name} = request.params;
    if (team_name === 'Los Angeles Clippers') {
        team_name = 'LA Clippers'
    }
    db.query(`SELECT team_abbreviation FROM "leagueGames2021-2022"
              WHERE team_name = $1 limit 1`, [team_name], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}


const getPreviousGameIdBySeasonByTeamByGameDate = (request, response, next) => {
    const {season, teamId, gamedate} = request.params;

    db.query(`SELECT DISTINCT game_id FROM "leagueGames${season}"
              WHERE team_id = $1
              AND game_date = $2`, [teamId, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getFrontSchedule = (request, response, next) => {
    const { season } = request.params;
    db.query(`SELECT game_id, matchup, wl, game_date, pts, plus_minus FROM "leagueGames${season}"
                ORDER BY id DESC`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getPreviousGameIdBySeasonByTeamByGameDate,
    getAbbreviationFromTeamName,
    getActualGameResultsByMatchupBySeason,
    getGameResultsByVisitorTeamSeason,
    getTeamIdFromName,
    getGameResultsByHomeTeamSeason,
    createGamesBySeason,
    getGamesLocal,
    getGameIdGameDateMatchupBySeasonDropDownLocal,
    getGamesBySeasonLocal,
    getGamesBySeason,
    getFrontSchedule,
    getGamesBySeasonJackarithm,
    getAveragePointTotal,
    getAveragePointTotalWholeSeason,
}