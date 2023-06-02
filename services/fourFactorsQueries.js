const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const { nextTick } = require("process");

const getBoxScoreFourFactorsFromCSV = (request, response) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscorefourfactors${season}.csv`)
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
        response.status(201).send(data);
    })
}

const createBoxScoreFourFactors = (request, response) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscorefourfactors${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, efg_pct, fta_rate, tm_tov_pct, oreb_pct, opp_efg_pct, opp_fta_rate, opp_tov_pct, opp_oreb_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.EFG_PCT, body.FTA_RATE, body.TM_TOV_PCT, body.OREB_PCT, body.OPP_EFG_PCT, body.OPP_FTA_RATE, body.OPP_TOV_PCT, body.OPP_OREB_PCT], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
}

const getBoxScoreFourFactorsTeamsFromCSV = (request, response, next) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscorefourfactorsteams${season}.csv`)
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
        //console.log("parsed csv data:"); 
        response.status(201).send(data);
    })
}

const createBoxScoreFourFactorsTeams = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscorefourfactorsteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, efg_pct, fta_rate, tm_tov_pct, oreb_pct, opp_efg_pct, opp_fta_rate, opp_tov_pct, opp_oreb_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_NAME, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.MIN, body.EFG_PCT, body.FTA_RATE, body.TM_TOV_PCT, body.OREB_PCT, body.OPP_EFG_PCT, body.OPP_FTA_RATE, body.OPP_TOV_PCT, body.OPP_OREB_PCT], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const getBoxScoreFourFactorsHome = (request, response, next) => {
  const {playerid, season} = request.params;

  db.query(`SELECT * FROM "boxscorefourfactors${season}" 
            INNER JOIN "boxscoresummary${season}" 
            ON "boxscorefourfactors${season}".game_id = "boxscoresummary${season}".game_id
            WHERE player_id = $1
            AND "boxscoresummary${season}".home_team_id = "boxscorefourfactors${season}".team_id`, [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getBoxScoreFourFactorsVisitor = (request, response, next) => {
  const {playerid, season} = request.params;

  db.query(`SELECT * FROM "boxscorefourfactors${season}" 
            INNER JOIN "boxscoresummary${season}" 
            ON "boxscorefourfactors${season}".game_id = "boxscoresummary${season}".game_id
            WHERE player_id = $1
            AND "boxscoresummary${season}".visitor_team_id = "boxscorefourfactors${season}".team_id`, [playerid], (error, results) => {
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
    getBoxScoreFourFactorsFromCSV,
    getBoxScoreFourFactorsHome,
    getBoxScoreFourFactorsTeamsFromCSV,
    getBoxScoreFourFactorsVisitor,
    createBoxScoreFourFactorsTeams,
    createBoxScoreFourFactors,
}