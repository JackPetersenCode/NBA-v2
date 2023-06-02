const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getBoxScorePlayerTrackerFromCSV = (request, response) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscoreplayertracker${season}.csv`)
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
        //console.log("parsed csv data:"); 
        response.status(201).send(data);
    })
}

const createBoxScorePlayerTracker = (request, response) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscoreplayertracker${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, start_position, comment, min, spd, dist, orbc, drbc, rbc, tchs, sast, ftast, pass, ast, cfgm, cfga, cfg_pct, ufgm, ufga, ufg_pct, fg_pct, dfgm, dfga, dfg_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.START_POSITION, body.COMMENT, body.MIN, body.SPD, body.DIST, body.ORBC, body.DRBC, body.RBC, body.TCHS, body.SAST, body.FTAST, body.PASS, body.AST, body.CFGM, body.CFGA, body.CFG_PCT, body.UFGM, body.UFGA, body.UFG_PCT, body.FG_PCT, body.DFGM, body.DFGA, body.DFG_PCT], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
}

const getBoxScorePlayerTrackerTeamsFromCSV = (request, response) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscoreplayertrackerteams${season}.csv`)
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
        //console.log("parsed csv data:"); 
        response.status(201).send(data);
    })
}


const createBoxScorePlayerTrackerTeams = (request, response) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscoreplayertrackerteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, dist, orbc, drbc, rbc, tchs, sast, ftast, pass, ast, cfgm, cfga, cfg_pct, ufgm, ufga, ufg_pct, fg_pct, dfgm, dfga, dfg_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_NAME, body.TEAM_CITY, body.MIN, body.DIST, body.ORBC, body.DRBC, body.RBC, body.TCHS, body.SAST, body.FTAST, body.PASS, body.AST, body.CFGM, body.CFGA, body.CFG_PCT, body.UFGM, body.UFGA, body.UFG_PCT, body.FG_PCT, body.DFGM, body.DFGA, body.DFG_PCT], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
}
  
module.exports = {
    getBoxScorePlayerTrackerFromCSV,
    createBoxScorePlayerTracker,
    getBoxScorePlayerTrackerTeamsFromCSV,
    createBoxScorePlayerTrackerTeams,
}