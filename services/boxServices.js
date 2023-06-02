const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const createBoxScores = (request, response) => {
    const body = request.body;
    let season = request.params;
    console.log(season.season)
    console.log(season)
    let minutes = body.MIN.substring(0, 5)
    let splitMins = minutes.split(':');
    let finalMins;
    if (splitMins[1]) {
        finalMins = splitMins[0] + '.' + splitMins[1];
    } else {
        finalMins = minutes;
    }
    db.query(`INSERT INTO "boxscores${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, e_off_rating, off_rating, e_def_rating, def_rating, e_net_rating, net_rating, ast_pct, ast_tov, ast_ratio, oreb_pct, dreb_pct, reb_pct, tm_tov_pct, efg_pct, ts_pct, usg_pct, e_usg_pct, e_pace, pace, pace_per40, poss, pie) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULLIF($10, ''), NULLIF($11, ''), 
    NULLIF($12, ''), NULLIF($13, ''), NULLIF($14, ''), NULLIF($15, ''), NULLIF($16, ''), NULLIF($17, ''), NULLIF($18, ''), NULLIF($19, ''),
    NULLIF($20, ''), NULLIF($21, ''), NULLIF($22, ''), NULLIF($23, ''), NULLIF($24, ''), NULLIF($25, ''), NULLIF($26, ''), NULLIF($27, ''),
    NULLIF($28, ''), NULLIF($29, ''), NULLIF($30, ''), NULLIF($31, ''), NULLIF($32, ''))`,
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, finalMins, body.E_OFF_RATING, body.OFF_RATING, body.E_DEF_RATING, body.DEF_RATING, body.E_NET_RATING, body.NET_RATING, body.AST_PCT, body.AST_TOV, body.AST_RATIO, body.OREB_PCT, body.DREB_PCT, body.REB_PCT, body.TM_TOV_PCT, body.EFG_PCT, body.TS_PCT, body.USG_PCT, body.E_USG_PCT, body.E_PACE, body.PACE, body.PACE_PER40, body.POSS, body.PIE], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    });
}

const boxScoreLoad = (request, response, next) => {

    let season = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./juicystats/boxscores${season.season}.csv`)
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
            return next(error)
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:");
       
        response.status(201).send(data);
    })
}

module.exports = {
    boxScoreLoad,
    createBoxScores,   
}