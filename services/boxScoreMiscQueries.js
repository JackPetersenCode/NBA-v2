const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getBoxScoreMiscFromCSV = (request, response, next) => {
    let {season} = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/boxscoremisc${season}.csv`)
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

const createBoxScoreMisc = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscoremisc${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, pts_off_tov, pts_2nd_chance, pts_fb, pts_paint, opp_pts_off_tov, opp_pts_2nd_chance, opp_pts_fb, opp_pts_paint, blk, blka, pf, pfd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.PTS_OFF_TOV, body.PTS_2ND_CHANCE, body.PTS_FB, body.PTS_PAINT, body.OPP_PTS_OFF_TOV, body.OPP_PTS_2ND_CHANCE, body.OPP_PTS_FB, body.OPP_PTS_PAINT, body.BLK, body.BLKA, body.PF, body.PFD], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const getBoxScoreMiscTeamsFromCSV = (request, response, next) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscoremiscteams${season}.csv`)
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
  
const createBoxScoreMiscTeams = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscoremiscteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, pts_off_tov, pts_2nd_chance, pts_fb, pts_paint, opp_pts_off_tov, opp_pts_2nd_chance, opp_pts_fb, opp_pts_paint, blk, blka, pf, pfd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_NAME, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.MIN, body.PTS_OFF_TOV, body.PTS_2ND_CHANCE, body.PTS_FB, body.PTS_PAINT, body.OPP_PTS_OFF_TOV, body.OPP_PTS_2ND_CHANCE, body.OPP_PTS_FB, body.OPP_PTS_PAINT, body.BLK, body.BLKA, body.PF, body.PFD], (error, results) => {
      if (error) {
          return next(error)
      }
      response.status(201).send(body);
    })
}

module.exports = {
    createBoxScoreMisc,
    createBoxScoreMiscTeams,
    getBoxScoreMiscFromCSV,
    getBoxScoreMiscTeamsFromCSV,
}