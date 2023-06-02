const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const { nextTick } = require("process");


const getLeagueHustleStatsBySeason = async(request, response, next) => {
    let season = request.params;
    try {
        let games = await require(`../juicystats/leaguehustlestatsplayer${season.season}.json`);
        response.status(200).send(games); 
    } catch (error) {
        return next(error);
    }   
}

const createPlayerHustlePoints = (request, response, next) => {
    const body = request.body;
  
    db.query('INSERT INTO "hustleFactor" (playerid, firstname, lastname, hustlepts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.hustlePts, body.season], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const getAllFirstLastHustlePointsInSeason = (request, response, next) => {
    const season = request.params;
    db.query(`SELECT firstname, lastname, hustlepts FROM "hustleFactor" WHERE season = $1 AND hustlepts!='STATISTICS UNAVAILABLE' ORDER BY CAST(hustlepts AS FLOAT) ASC`, [season.season], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const createLeagueHustleStatsBySeason = (request, response, next) => {
    let season = request.params;
    console.log(season);
    const body = request.body;
    console.log(body);
    db.query(`INSERT INTO "leagueHustleStatsPlayer${season['season']}" (player_id, player_name, team_id, team_abbreviation, age, g, min, contested_shots, contested_shots_2pt, contested_shots_3pt, deflections, charges_drawn, screen_assists, screen_ast_pts, off_loose_balls_recovered, def_loose_balls_recovered, loose_balls_recovered, pct_loose_balls_recovered_off, pct_loose_balls_recovered_def, off_boxouts, def_boxouts, box_out_player_team_rebs, box_out_player_rebs, box_outs, pct_box_outs_off, pct_box_outs_def, pct_box_outs_team_reb, pct_box_outs_reb) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`, 
    [body[0], body[1].toString(), body[2], body[3], body[4], body[5], body[6], body[7], body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
module.exports = {
    createLeagueHustleStatsBySeason,
    getAllFirstLastHustlePointsInSeason,
    getLeagueHustleStatsBySeason,
    createPlayerHustlePoints,   
}