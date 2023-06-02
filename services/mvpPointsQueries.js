const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const createPlayerMvpPoints = (request, response) => {
    const body = request.body;
    //console.log(body.player[0].playerid);
    console.log(body.mvppoints);
    console.log(body);
    db.query('INSERT INTO "mvpPointsv3" (playerid, player_name, mvppoints, season, H_or_V) VALUES ($1, $2, $3, $4, $5)', [body.playerid, body.player_name, body.mvppoints, body.season, body.H_or_V], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
}

const getAllFirstLastMvpPointsInSeason = (request, response) => {
    const season = request.params;
   
    db.query(`SELECT firstname, lastname, mvppoints FROM "mvpPoints" WHERE season = $1 AND mvppoints!='STATISTICS UNAVAILABLE' ORDER BY CAST(mvppoints AS FLOAT) ASC`, [season.season], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getMVPPointsByPlayerBySeason = (request, response) => {
    const {playerid, season, H_or_V} = request.params;

    db.query(`SELECT * FROM "mvpPoints"
              WHERE playerid = $1
              AND season = $2`, [playerid, season], (error, results) => {
                //AND h_or_v = $3
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

const getAllMvpPointsFunction = (request, response) => {
    const {season} = request.params;

    db.query(`SELECT mvppoints FROM "mvpPoints" 
              WHERE season = $1`, [season], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getMVPPointsByPlayerBySeason,
    getAllFirstLastMvpPointsInSeason,
    createPlayerMvpPoints,
    getAllMvpPointsFunction,
}