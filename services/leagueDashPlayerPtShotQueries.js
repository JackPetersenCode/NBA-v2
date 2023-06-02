const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getLeagueDashPlayerPtShotFromJson = async(request, response, next) => {
    let season = request.params;
    try {
        let stats = await require(`../juicystats/leaguedashplayerptshot${season.season}.json`);
        response.status(200).send(stats);
    } catch (error) {
        return next(error);
    }
}
  
const createLeagueDashPlayerPtShot = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    for (let i = 0; i < body.length; i++) {
        if (!body[i]) {
            body[i] = 'null';
        }
    }
    db.query(`INSERT INTO "leaguedashplayerptshot${season.season}" (player_id, player_name, player_last_team_id, player_last_team_abbreviation, age, gp, g, fga_frequency, fgm, fga, fg_pct, efg_pct, fg2a_frequency, fg2m, fg2a, fg2_pct, fg3_frequency, fg3m, fg3a, fg3_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`, 
    [body[0].toString(), body[1], body[2].toString(), body[3], body[4].toString(), body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
const getLeagueDashPlayerShotLocationsFromJson = async(request, response, next) => {
    let season = request.params;
    try {
        let stats = await require(`../juicystats/leaguedashplayershotlocations${season.season}.json`);
        response.status(200).send(stats);
    } catch (error) {
        return next(error);
    }
}

const createLeagueDashPlayerShotLocations = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    for (let i = 0; i < body.length; i++) {
        if (!body[i]) {
            body[i] = 'null';
        }
    }
    db.query(`INSERT INTO "leaguedashplayershotlocations${season.season}" (player_id, player_name, team_id, team_abbreviation, age, nickname, fgm_restricted, fga_restricted, fg_pct_restricted, fgm_paint, fga_paint, fg_pct_paint, fgm_midrange, fga_midrange, fg_pct_midrange, fgm_lc3, fga_lc3, fg_pct_lc3, fgm_rc3, fga_rc3, fg_pct_rc3, fgm_above_break_3, fga_above_break_3, fg_pct_above_break_3, fgm_backcourt, fga_backcourt, fg_pct_backcourt, fgm_c3, fga_c3, fg_pct_c3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)`, 
    [body[0].toString(), body[1], body[2].toString(), body[3], body[4].toString(), body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString(), body[29].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

module.exports = {
    createLeagueDashPlayerShotLocations,
    getLeagueDashPlayerShotLocationsFromJson,
    createLeagueDashPlayerPtShot,
    getLeagueDashPlayerPtShotFromJson,
}