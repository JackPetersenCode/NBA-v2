const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const getBoxScoreSummaryFromCSV = (request, response, next) => {
    let {season} = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/boxscoresummary${season}.csv`)
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


const createBoxScoreSummary = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    db.query(`INSERT INTO "boxscoresummary${season.season}" (game_date_est, game_sequence, game_id, game_status_id, game_status_text, gamecode, home_team_id, visitor_team_id, season, live_period, live_pc_time, natl_tv_broadcaster_abbreviation, live_period_time_bcast, wh_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, 
    [body.GAME_DATE_EST, body.GAME_SEQUENCE, body.GAME_ID, body.GAME_STATUS_ID, body.GAME_STATUS_TEXT, body.GAMECODE, body.HOME_TEAM_ID, body.VISITOR_TEAM_ID, body.SEASON, body.LIVE_PERIOD, body.LIVE_PC_TIME, body.NATL_TV_BROADCASTER_ABBREVIATION, body.LIVE_PERIOD_TIME_BCAST, body.WH_STATUS], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}


const getHomeGameIdsBySeason = (request, response, next) => {
    const {season, team_id} = request.params;
    db.query(`SELECT DISTINCT game_id FROM "boxscoresummary${season}" WHERE home_team_id = $1`, [team_id], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const getVisitorGameIdsBySeason = (request, response, next) => {
    const {season, team_id} = request.params;
    db.query(`SELECT DISTINCT game_id FROM "boxscoresummary${season}" WHERE visitor_team_id = $1`, [team_id], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getLengthOfSeason = (request, response, next) => {
    const {season, teamid, H_or_V} = request.params;
    console.log(season);
    console.log(teamid);
    db.query(`SELECT COUNT(DISTINCT game_id) FROM "boxscoresummary${season}"
              WHERE ${H_or_V}_team_id = $1`, [teamid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getTeamNameFromTeamId = (request, response, next) => {
    const { teamId } = request.params;
    console.log(teamId)
    db.query(`SELECT DISTINCT team_name
                FROM "leagueGames2022-2023"
                WHERE team_id = $1`, [teamId], (error, results) => {
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
    getLengthOfSeason,
    getVisitorGameIdsBySeason,
    getHomeGameIdsBySeason,
    getBoxScoreSummaryFromCSV,
    createBoxScoreSummary,
    getTeamNameFromTeamId,   
}