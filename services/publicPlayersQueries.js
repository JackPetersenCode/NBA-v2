const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const getPlayersJson = async(request, response) => {
  let players = await require('./playersJson.json');
  response.status(200).send(players);
}

const getPlayerIds = (request, response) => {
    db.query('SELECT playerid FROM players ORDER BY playerid ASC', (error, results) => {
        if (error) {
          throw error
        }
        //console.log(results.rows)
      
        response.status(200).json(results.rows)
    })
}
  
const getPlayers = (request, response) => {
    db.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        //console.log(results.rows)
  
        response.status(200).json(results.rows)
    })
}
  

const getPlayerIdWithLastFirst = (request, response) => {
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
    db.query(`SELECT playerid FROM players WHERE lastname = $1 AND firstname = $2`, [last, first], (error, results) => {
      if (error) {
        throw error
      }
  
      response.status(200).json(results.rows)
    })
}


const getPlayersWithLastFirst = (request, response) => {
    let {lastName, firstName} = request.params;
    db.query(`SELECT * FROM players WHERE lastname = $1 AND firstname = $2`, [lastName, firstName], (error, results) => {
      if (error) {
        throw error
      }
  
      response.status(200).json(results.rows)
    })
}
  

const getPlayerById = async(request, response) => {
    let {playerid} = request.params;
    //console.log('muffins')
    //console.log(playerid);
    db.query('SELECT * FROM players WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createPlayer = (request, response) => {
    const body = request.body;
    //console.log(body.firstName);
    //console.log(body.lastName);
    db.query('INSERT INTO players (firstName, lastName, teamId, yearsPro, collegeName, country, playerId, dateOfBirth, affiliation, startNba, heightInMeters, weightInKilograms, leagues) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
    [body.firstName, body.lastName, body.teamId, body.yearsPro, body.collegeName, body.country, body.playerId, body.dateOfBirth, body.affiliation, body.startNba, body.heightInMeters, body.weightInKilograms, body.leagues], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results);
      response.status(201).send(body);
    })
}

const createPlayerCloud = (request, response) => {
  let body = request.body;
  //console.log(body.firstName);
  //console.log(body.lastName);
  body = {
    firstname: `${body[1]}`,
    lastname: `${body[2]}`,
    affiliation: `${body[3]}`,
    collegename: `${body[4]}`,
    country: `${body[5]}`,
    dateofbirth: `${body[6]}`,
    heightinmeters: `${body[7]}`,
    weightinkilograms: `${body[8]}`,
    yearspro: `${body[9]}`,
    leagues: body[10],
    teamid: `${body[11]}`,
    playerid: `${body[12]}`,
    startnba: `${body[13]}`,
  }
  console.log(body)

  db.query('INSERT INTO players (firstname, lastname, teamid, yearspro, collegename, country, playerid, dateofbirth, affiliation, startnba, heightinmeters, weightinkilograms, leagues) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
  [body.firstname, body.lastname, body.teamid, body.yearspro, body.collegename, body.country, body.playerid, body.dateofbirth, body.affiliation, body.startnba, body.heightinmeters, body.weightinkilograms, body.leagues], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results);
    response.status(201).send(body);
  })
}

module.exports = {
    createPlayer,
    getPlayerById,
    getPlayerIdWithLastFirst,
    getPlayerIds,
    getPlayersWithLastFirst,
    getPlayers,
    createPlayerCloud,
    getPlayersJson,
}