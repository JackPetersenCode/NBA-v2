const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const errors = require('../middleware/errors.js');


const getBoxScorePlayer = async(request, response, next) => {
    let {playerid, season} = request.params;
  
    db.query(`SELECT * FROM "boxscorestraditional${season}"
              WHERE player_id = $1`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        //console.log(results.rows)
      
        response.status(200).json(results.rows)
    })
}

const getBoxScoreTraditionalAverages = async(request, response, next) => {
    let { playerid, season } = request.params;
   
    db.query(`SELECT player_id, player_name AS NAME, team_id, team_abbreviation AS TEAM,
                AVG(CAST(min AS FLOAT)) AS MIN, 
                AVG(CAST(fgm AS FLOAT)) AS FGM,
                AVG(CAST(fga AS FLOAT)) AS FGA,
                sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) AS FG_PCT,
                AVG(CAST(fg3m AS FLOAT)) AS FG3M,
                AVG(CAST(fg3a AS FLOAT)) AS FG3A,
                sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) AS FG3_PCT,
                AVG(CAST(ftm AS FLOAT)) AS FTM,
                AVG(CAST(fta AS FLOAT)) AS FTA,
                sum(cast(ftm as float)) / NULLIF(sum(cast(fta as float)), 0) AS FT_PCT,
                AVG(CAST(oreb AS FLOAT)) AS OREB,
                AVG(CAST(dreb AS FLOAT)) AS DREB, 
                AVG(CAST(reb AS FLOAT)) AS REB, 
                AVG(CAST(ast AS FLOAT)) AS AST, 
                AVG(CAST(stl AS FLOAT)) AS STL, 
                AVG(CAST(blk AS FLOAT)) AS BLK, 
                AVG(CAST(turnovers AS FLOAT)) AS TO, 
                AVG(CAST(pf AS FLOAT)) AS PF, 
                AVG(CAST(pts AS FLOAT)) AS PTS, 
                AVG(CAST(plus_minus AS FLOAT)) AS "+/-"
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id = $1
                GROUP BY player_id, player_name, team_id, team_abbreviation`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}

const getBoxScoreTraditional82GameAverages = async(request, response, next) => {
    let { gameId, playerid, season, H_or_V } = request.params;

    db.query(`SELECT player_id, player_name AS NAME, team_id, team_abbreviation AS TEAM,
                AVG(COALESCE(CAST(min AS NUMERIC), 0.0)) AS MIN, 
                AVG(COALESCE(CAST(fgm AS NUMERIC), 0.0)) AS FGM,
                AVG(COALESCE(CAST(fga AS NUMERIC), 0.0)) AS FGA,
                sum(cast(fgm as NUMERIC)) / NULLIF(sum(cast(fga as NUMERIC)), 0) AS FG_PCT,
                AVG(COALESCE(CAST(fg3m AS NUMERIC), 0.0)) AS FG3M,
                AVG(COALESCE(CAST(fg3a AS NUMERIC), 0.0)) AS FG3A,
                sum(cast(fg3m as NUMERIC)) / NULLIF(sum(cast(fg3a as NUMERIC)), 0) AS FG3_PCT,
                AVG(COALESCE(CAST(ftm AS NUMERIC), 0.0)) AS FTM,
                AVG(COALESCE(CAST(fta AS NUMERIC), 0.0)) AS FTA,
                sum(cast(ftm as NUMERIC)) / NULLIF(sum(cast(fta as NUMERIC)), 0) AS FT_PCT,
                AVG(COALESCE(CAST(oreb AS NUMERIC), 0.0)) AS OREB,
                AVG(COALESCE(CAST(dreb AS NUMERIC), 0.0)) AS DREB, 
                AVG(COALESCE(CAST(reb AS NUMERIC), 0.0)) AS REB, 
                AVG(COALESCE(CAST(ast AS NUMERIC), 0.0)) AS AST, 
                AVG(COALESCE(CAST(stl AS NUMERIC), 0.0)) AS STL, 
                AVG(COALESCE(CAST(blk AS NUMERIC), 0.0)) AS BLK, 
                AVG(COALESCE(CAST(turnovers AS NUMERIC), 0.0)) AS TO, 
                AVG(COALESCE(CAST(pf AS NUMERIC), 0.0)) AS PF, 
                AVG(COALESCE(CAST(pts AS NUMERIC), 0.0)) AS PTS, 
                AVG(COALESCE(CAST(plus_minus AS NUMERIC), 0.0)) AS "+/-",
                COUNT(DISTINCT "boxscorestraditional${season}".game_id)
                FROM "boxscorestraditional${season}"
                inner join "boxscoresummary${season}"
                on "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id
                WHERE player_id = $1
                AND "boxscorestraditional${season}".team_id = "boxscoresummary${season}".${H_or_V}_team_id
                AND "boxscorestraditional${season}".game_id < $2
                GROUP BY player_id, player_name, team_id, team_abbreviation`, [playerid, gameId], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}
 
const getBoxScoreTraditional82GameAveragesWholeSeason = async(request, response, next) => {
    let { playerid, season, H_or_V } = request.params;

    db.query(`SELECT player_id, player_name AS NAME, team_id, team_abbreviation AS TEAM,
                AVG(COALESCE(CAST(min AS NUMERIC), 0.0)) AS MIN, 
                AVG(COALESCE(CAST(fgm AS NUMERIC), 0.0)) AS FGM,
                AVG(COALESCE(CAST(fga AS NUMERIC), 0.0)) AS FGA,
                sum(cast(fgm as NUMERIC)) / NULLIF(sum(cast(fga as NUMERIC)), 0) AS FG_PCT,
                AVG(COALESCE(CAST(fg3m AS NUMERIC), 0.0)) AS FG3M,
                AVG(COALESCE(CAST(fg3a AS NUMERIC), 0.0)) AS FG3A,
                sum(cast(fg3m as NUMERIC)) / NULLIF(sum(cast(fg3a as NUMERIC)), 0) AS FG3_PCT,
                AVG(COALESCE(CAST(ftm AS NUMERIC), 0.0)) AS FTM,
                AVG(COALESCE(CAST(fta AS NUMERIC), 0.0)) AS FTA,
                sum(cast(ftm as NUMERIC)) / NULLIF(sum(cast(fta as NUMERIC)), 0) AS FT_PCT,
                AVG(COALESCE(CAST(oreb AS NUMERIC), 0.0)) AS OREB,
                AVG(COALESCE(CAST(dreb AS NUMERIC), 0.0)) AS DREB, 
                AVG(COALESCE(CAST(reb AS NUMERIC), 0.0)) AS REB, 
                AVG(COALESCE(CAST(ast AS NUMERIC), 0.0)) AS AST, 
                AVG(COALESCE(CAST(stl AS NUMERIC), 0.0)) AS STL, 
                AVG(COALESCE(CAST(blk AS NUMERIC), 0.0)) AS BLK, 
                AVG(COALESCE(CAST(turnovers AS NUMERIC), 0.0)) AS TO, 
                AVG(COALESCE(CAST(pf AS NUMERIC), 0.0)) AS PF, 
                AVG(COALESCE(CAST(pts AS NUMERIC), 0.0)) AS PTS, 
                AVG(COALESCE(CAST(plus_minus AS NUMERIC), 0.0)) AS "+/-"
                FROM "boxscorestraditional${season}"
                inner join "boxscoresummary${season}"
                on "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id
                WHERE player_id = $1
                AND "boxscorestraditional${season}".team_id = "boxscoresummary${season}".${H_or_V}_team_id
                GROUP BY player_id, player_name, team_id, team_abbreviation`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}

const getSumStat = async(request, response, next) => {

    let { season, teamId, gameId, stat } = request.params;
    db.query(`SELECT SUM(COALESCE(CAST(${stat} AS NUMERIC), 0.0))
                FROM "boxscorestraditional${season}"
                WHERE team_id = $1
                AND game_id < $2`, [teamId, gameId], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const createBoxScoresTraditional = (request, response, next) => {
    const body = request.body;
    let season = request.params;
    
    let minutes = body.MIN.substring(0, 5)
    let splitMins = minutes.split(':');
    let finalMins;
    if (splitMins[1]) {
        finalMins = splitMins[0] + '.' + splitMins[1];
    } else {
        finalMins = minutes;
    }
    db.query(`INSERT INTO "boxscorestraditional${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, turnovers, pf, pts, plus_minus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULLIF($10, ''), NULLIF($11, ''), 
                NULLIF($12, ''), NULLIF($13, ''), NULLIF($14, ''), NULLIF($15, ''), NULLIF($16, ''), NULLIF($17, ''), NULLIF($18, ''), NULLIF($19, ''),
                NULLIF($20, ''), NULLIF($21, ''), NULLIF($22, ''), NULLIF($23, ''), NULLIF($24, ''), NULLIF($25, ''), NULLIF($26, ''), NULLIF($27, ''),
                NULLIF($28, ''), NULLIF($29, ''))`,
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, finalMins, body.FGM, body.FGA, body.FG_PCT, body.FG3M, body.FG3A, body.FG3_PCT, body.FTM, body.FTA, body.FT_PCT, body.OREB, body.DREB, body.REB, body.AST, body.STL, body.BLK, body.TO, body.PF, body.PTS, body.PLUS_MINUS], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    });
}

const boxScoreTraditionalLoad = (request, response, next) => {

    let season = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/boxscorestraditional${season.season}.csv`)
        .pipe(
          parse({
            delimiter: ",",
            columns: true,
            ltrim: true,
          })
        )
        .on("data", function async(row) {
          // 👇 push the object row into the array
            data.push(row);
        })
        .on("error", function async(error) {
            console.log(error.message);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:");
        response.status(201).send(data);
    })
}

const getBoxScoresTraditional = async(request, response, next) => {
    let { season, gameid, playerid } = request.params;
    db.query(`SELECT * FROM "boxscorestraditional${season}" WHERE game_id = $1 AND player_id = $2`, [gameid, playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  


const getBoxScoreTraditionalHome = async(request, response, next) => {
    const {playerid, season} = request.params;
    let newSeason = JSON.stringify(season);
    let stringSeason = newSeason.replace(/"/g, '');
    db.query(`SELECT * FROM "boxscorestraditional${stringSeason}" 
              INNER JOIN "boxscoresummary${stringSeason}" 
              ON "boxscorestraditional${stringSeason}".game_id = "boxscoresummary${stringSeason}".game_id
              WHERE player_id = $1
              AND "boxscoresummary${stringSeason}".home_team_id = "boxscorestraditional${stringSeason}".team_id
              ORDER BY "boxscorestraditional${stringSeason}".id`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getBoxScoreTraditionalVisitor = (request, response, next) => {
    const {playerid, season} = request.params;
    let newSeason = JSON.stringify(season);
    let stringSeason = newSeason.replace(/"/g, '');
    db.query(`SELECT * FROM "boxscorestraditional${stringSeason}" 
              INNER JOIN "boxscoresummary${stringSeason}" 
              ON "boxscorestraditional${stringSeason}".game_id = "boxscoresummary${stringSeason}".game_id
              WHERE player_id = $1
              AND "boxscoresummary${stringSeason}".visitor_team_id = "boxscorestraditional${stringSeason}".team_id
              ORDER BY "boxscorestraditional${stringSeason}".id`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getPreviousGameIdBySeasonByTeam = (request, response, next) => {
    const {season, teamId} = request.params;
    db.query(`SELECT game_id FROM "boxscorestraditional${season}"
              WHERE team_id = $1
              ORDER BY id DESC LIMIT 1`, [teamId], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0) {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const getBoxNumFromGameIdSeason = (request, response, next) => {
    const {gameid, season, teamid, H_or_V} = request.params;
    db.query(`SELECT COUNT(DISTINCT "boxscorestraditional${season}".game_id) FROM "boxscorestraditional${season}"
              INNER JOIN "boxscoresummary${season}"
              ON "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id 
              WHERE CAST(SUBSTRING("boxscorestraditional${season}".game_id, 3) AS INT) < $1
              AND "boxscorestraditional${season}".team_id = $2
              AND "boxscoresummary${season}".${H_or_V}_team_id = $3`, [gameid, teamid, teamid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

  
const getPreviousGameIdByGameIdTeamId = (request, response, next) => {
    const {gameId, season, teamid} = request.params;

    db.query(`SELECT game_id FROM "boxscorestraditional${season}"
                WHERE team_id = $1
                AND game_id < $2
                ORDER BY game_id DESC LIMIT 1`, [teamid, gameId], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getBoxScorePlayer,
    getBoxScorePlayer,
    getBoxNumFromGameIdSeason,
    getPreviousGameIdBySeasonByTeam,
    getBoxScoreTraditionalVisitor,
    getBoxScoreTraditionalHome,
    getBoxScoresTraditional,
    boxScoreTraditionalLoad,
    createBoxScoresTraditional,  
    getBoxScoreTraditionalAverages,
    getPreviousGameIdByGameIdTeamId,
    getBoxScoreTraditional82GameAverages,
    getBoxScoreTraditional82GameAveragesWholeSeason,
    getSumStat,
}