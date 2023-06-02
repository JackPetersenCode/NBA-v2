const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getBoxScoreScoringFromCSV = (request, response, next) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscorescoring${season}.csv`)
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

const createBoxScoreScoring = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscorescoring${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, pct_fga_2pt, pct_fga_3pt, pct_pts_2pt, pct_pts_2pt_mr, pct_pts_3pt, pct_pts_fb, pct_pts_ft, pct_pts_off_tov, pct_pts_paint, pct_ast_2pm, pct_uast_2pm, pct_ast_3pm, pct_uast_3pm, pct_ast_fgm, pct_uast_fgm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.PCT_FGA_2PT, body.PCT_FGA_3PT, body.PCT_PTS_2PT, body.PCT_PTS_2PT_MR, body.PCT_PTS_3PT, body.PCT_PTS_FB, body.PCT_PTS_FT, body.PCT_PTS_OFF_TOV, body.PCT_PTS_PAINT, body.PCT_AST_2PM, body.PCT_UAST_2PM, body.PCT_AST_3PM, body.PCT_UAST_3PM, body.PCT_AST_FGM, body.PCT_UAST_FGM], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}


const getBoxScoreScoringTeamsFromCSV = (request, response, next) => {
    let {season} = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscorescoringteams${season}.csv`)
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

const createBoxScoreScoringTeams = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "boxscorescoringteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, pct_fga_2pt, pct_fga_3pt, pct_pts_2pt, pct_pts_2pt_mr, pct_pts_3pt, pct_pts_fb, pct_pts_ft, pct_pts_off_tov, pct_pts_paint, pct_ast_2pm, pct_uast_2pm, pct_ast_3pm, pct_uast_3pm, pct_ast_fgm, pct_uast_fgm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`, 
    [body.GAME_ID, body.TEAM_ID, body.TEAM_NAME, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.MIN, body.PCT_FGA_2PT, body.PCT_FGA_3PT, body.PCT_PTS_2PT, body.PCT_PTS_2PT_MR, body.PCT_PTS_3PT, body.PCT_PTS_FB, body.PCT_PTS_FT, body.PCT_PTS_OFF_TOV, body.PCT_PTS_PAINT, body.PCT_AST_2PM, body.PCT_UAST_2PM, body.PCT_AST_3PM, body.PCT_UAST_3PM, body.PCT_AST_FGM, body.PCT_UAST_FGM], (error, results) => {
        if (error) {
            return next(error)
        }
        response.status(201).send(body);
    })  
}
  
module.exports = {
    getBoxScoreScoringFromCSV,
    getBoxScoreScoringTeamsFromCSV,
    createBoxScoreScoring,
    createBoxScoreScoringTeams,
}