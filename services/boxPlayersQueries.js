const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const errors = require('../middleware/errors.js');  


const getOfficialPlayerIdList = (request, response, next) => {
    
    let {season} = request.params;
    db.query(`SELECT distinct player_id FROM "boxscorestraditional${season}"`, (error, results) => {
        if (error) {
            return next(error);
        }
        console.log(results.rows);
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const getOfficialPlayerIdNameList = (request, response, next) => {
    
    let {season} = request.params;

    db.query(`SELECT distinct player_id, player_name FROM "boxscorestraditional${season}"`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

  
const getTeamPlayersFromTeamId = (request, response, next) => {
    let teamid = request.params;
    db.query('SELECT DISTINCT player_name FROM "boxscorestraditional2021-2022" WHERE team_id = $1', [teamid.teamid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRosterBySeasonByTeam = (request, response, next) => {
    const { season, teamid } = request.params;
    db.query(`SELECT DISTINCT player_id, player_name FROM "boxscorestraditional${season}" WHERE team_id = $1`, [teamid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getPreviousRosterBySeasonByTeamByGameId = (request, response, next) => {
    const { season, teamId, gameid } = request.params;
    console.log('aaaaaaaa')
    db.query(`SELECT DISTINCT player_id, player_name FROM "boxscorestraditional${season}" 
              WHERE team_id = $1 AND game_id = $2`, [teamId, gameid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getPlayerIdWithName = (request, response, next) => {
    let {season, name} = request.params;
    console.log(season);
    console.log(name);
    db.query(`SELECT DISTINCT player_id FROM "boxscorestraditional${season}" WHERE player_name = $1`, [name], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)

    })
}


module.exports = {
    getPreviousRosterBySeasonByTeamByGameId,
    getRosterBySeasonByTeam,         
    getTeamPlayersFromTeamId,
    getOfficialPlayerIdNameList,
    getOfficialPlayerIdList,
    getPlayerIdWithName,  
}