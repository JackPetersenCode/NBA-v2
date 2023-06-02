const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getLeagueDashOppPtShotFromJson = async(request, response, next) => {
    let season = request.params;
    try {
        let stats = await require(`../juicystats/leaguedashoppptshot${season.season}.json`);
        console.log(stats);
        response.status(200).send(stats);
    } catch (error) {
        return next(error);
    }
}
  
const createLeagueDashOppPtShot = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    console.log(season);
    db.query(`INSERT INTO "leaguedashoppptshot${season.season}" (team_id, team_name, team_abbreviation, gp, g, fga_frequency, fgm, fga, fg_pct, efg_pct, fg2a_frequency, fg2m, fg2a, fg2_pct, fg3_frequency, fg3m, fg3a, fg3_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
    [body[0], body[1], body[2], body[3].toString(), body[4], body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

module.exports = {
    createLeagueDashOppPtShot,
    getLeagueDashOppPtShotFromJson,
}