const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const seasonRegularPlayerStatsLoad = (request, response, next) => {

    const data = [];
    fs.createReadStream(`./seasonregularplayerstats.csv`)
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
            return next(error);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:");
        console.log(data); 
        response.status(201).send(data);
    })
}

const createSeasonRegularPlayerStatsTotals = (request, response, next) => {
    const body = request.body;
    console.log(body);
    db.query(`INSERT INTO "seasonTotalsRegularSeason" (player_id, season_id, league_id, team_id, team_abbreviation, player_age, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`, 
    [body.PLAYER_ID, body.SEASON_ID, body.LEAGUE_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.PLAYER_AGE, body.GP, body.GS, body.MIN, body.FGM, body.FGA, body.FG_PCT, body.FG3M, body.FG3A, body.FG3_PCT, body.FTM, body.FTA, body.FT_PCT, body.OREB, body.DREB, body.REB, body.AST, body.STL, body.BLK, body.TOV, body.PF, body.PTS], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
const getRegularSeasonStatLines = async(request, response, next) => {
    let { playerid } = request.params;
    console.log(playerid);
    db.query('SELECT * FROM "seasonTotalsRegularSeason" WHERE player_id = $1', [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const getRegularSeasonStatLinesBySeason = async(request, response, next) => {
    let { playerid, season } = request.params;
    console.log(playerid);
    console.log(season);
    db.query('SELECT * FROM "seasonTotalsRegularSeason" WHERE player_id = $1 and season_id = $2', [playerid, season], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getShotSeasonsFromPlayerId = async(request, response, next) => {
    let { playerid } = request.params;
    console.log(playerid);
    db.query('SELECT DISTINCT season_id FROM "seasonTotalsRegularSeason" WHERE player_id = $1', [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getCareerSeasonsByPlayerId = async(request, response, next) => {
    let { playerid } = request.params;
    console.log(playerid);
    db.query(`SELECT SUM(CAST(min AS FLOAT))
                FROM "boxscorestraditional2015-2016" AS 2015-2016
                SELECT SUM(CAST(min AS FLOAT))
                FROM "boxscorestraditional2016-2017" AS 2016-2017
                WHERE player_id = $1`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}



const getCareerLinesByPlayerId =(request, response, next) => {
    let { player_id } = request.params;
    db.query(`SELECT distinct`)
}

module.exports = {
    seasonRegularPlayerStatsLoad,
    createSeasonRegularPlayerStatsTotals,
    getRegularSeasonStatLines,
    getRegularSeasonStatLinesBySeason,
    getShotSeasonsFromPlayerId,
}