const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getPlayersNBA = async(request, response, next) => {
    try {
        let players = await require('../juicystats/playersNBA.json');
        response.status(200).send(players);
    } catch (error) {
        return next(error);
    }
}

const createPlayersNBA = async(request, response, next) => {
    //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKKKKKKKKKKKKKK');
    let body = request.body;
    db.query('INSERT INTO "playersNBA" (full_name, first_name, last_name, is_active, playerid) VALUES ($1, $2, $3, $4, $5)', 
        [body.full_name, body.first_name, body.last_name, body.is_active, body.playerid], (error, results) => {
        if (error) {
            return next(error);
        }
    })
    response.status(201).send(body);
}

const getOfficialPlayerIdWithLastFirst = (request, response, next) => {
    let {lastName, firstName} = request.params;
    let lastNameEndString = '';
    let firstNameEndString = '';
    for (let i = 1; i < lastName.length; i++) {
        lastNameEndString += lastName[i];
    }
    let last = lastName[0].toUpperCase() + lastNameEndString;
    for (let i = 1; i < firstName.length; i++) {
        firstNameEndString += firstName[i];
    }
    let first = firstName[0].toUpperCase() + firstNameEndString;

    db.query(`SELECT playerid FROM "playersNBA" WHERE last_name = $1 AND first_name = $2`, [last, first], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getPlayerByIdOfficial = async(request, response, next) => {
    let {playerid} = request.params;

    db.query('SELECT * FROM "playersNBA" WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getOfficialPlayerIdWithFullName = (request, response, next) => {
    let {name} = request.params;

    db.query(`SELECT playerid FROM "playersNBA" WHERE full_name = $1`, [name], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}

const getPlayerIdWithShotTable = (request, response, next) => {
    let {season, name} = request.params;
    console.log(season);
    console.log(name);
    db.query(`SELECT DISTINCT player_id FROM "${season}" WHERE player_name = $1`, [name], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)

    })
}

const getPriceAllPlayers = (request, response, next) => {
    const { season } = request.params;
   
    db.query(`SELECT player_name, player_id,
                AVG(CAST(pts AS NUMERIC)) AS pts, 
                AVG(CAST(ast AS NUMERIC)) AS ast, 
                AVG(CAST(reb AS NUMERIC)) AS reb, 
                AVG(CAST(min AS NUMERIC)) AS min
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name`, (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)

    })
}

const getAllIdsNames = (request, response, next) => {
    db.query(`SELECT playerid, full_name FROM "playersNBA"`, (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)

    })
}



module.exports = {
    createPlayersNBA,
    getOfficialPlayerIdWithLastFirst,
    getPlayersNBA,
    getPlayerByIdOfficial,
    getOfficialPlayerIdWithFullName,
    getPlayerIdWithShotTable,
    getPriceAllPlayers,
    getAllIdsNames,
}