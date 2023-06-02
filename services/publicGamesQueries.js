const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const getPlayerSeasonGameStats = async(request, response) => {
    let {playerid, league, seasonyear} = request.params;
  
    let year = seasonyear.substring(0, 4);
  
    db.query(`SELECT * FROM games
              INNER JOIN gameinfo 
              ON games.gameid=gameinfo.gameid
              WHERE playerid = $1 AND league = $2 AND gameinfo.seasonyear = $3`, [playerid, league, year], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows)
  
      response.status(200).json(results.rows)
    })
}

const getGamesFromJson = async(request, response) => {
    let games = await require(`./gamesJson.json`);
    console.log(games);
    response.status(200).send(games);
}


const createGame = (request, response) => {
    const body = request.body;
    console.log('boom')
    db.query('INSERT INTO games (gameId, teamId, points, position, min, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offReb, defReb, totReb, assists, pFouls, steals, turnovers, blocks, plusMinus, playerId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
    [body.gameId, body.teamId, body.points, body.position, body.min, body.fgm, body.fga, body.fgp, body.ftm, body.fta, body.ftp, body.tpm, body.tpa, body.tpp, body.offReb, body.defReb, body.totReb, body.assists, body.pFouls, body.steals, body.turnovers, body.blocks, body.plusMinus, body.playerId], (error, results) => {
      if (error) {
        throw error;
      }
      //console.log(results);
      response.status(201).send(body);
    });
}


const createGameCloud = (request, response) => {
    let body = request.body;
    console.log('boomshakalaka');
    console.log(body);
    body = {
      gameid: `${body[1]}`,
      teamid: `${body[2]}`,
      points: `${body[3]}`,
      position: `${body[4]}`,
      min: `${body[5]}`,
      fgm: `${body[6]}`,
      fga: `${body[7]}`,
      fgp: `${body[8]}`,
      ftm: `${body[9]}`,
      fta: body[10],
      ftp: `${body[11]}`,
      tpm: `${body[12]}`,
      tpa: `${body[13]}`,
      tpp: `${body[14]}`,
      offreb: `${body[15]}`,
      defreb: `${body[16]}`,
      totreb: body[17],
      assists: `${body[18]}`,
      pfouls: `${body[19]}`,
      steals: `${body[20]}`,
      turnovers: `${body[21]}`,
      blocks: `${body[22]}`,
      plusminus: `${body[23]}`,
      playerid: `${body[24]}`, 
    }
    console.log(body)
    console.log(body.gameid);
    db.query('INSERT INTO games (gameid, teamid, points, position, min, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offreb, defreb, totreb, assists, pfouls, steals, turnovers, blocks, plusminus, playerid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
    [body.gameid, body.teamid, body.points, body.position, body.min, body.fgm, body.fga, body.fgp, body.ftm, body.fta, body.ftp, body.tpm, body.tpa, body.tpp, body.offreb, body.defreb, body.totreb, body.assists, body.pfouls, body.steals, body.turnovers, body.blocks, body.plusminus, body.playerid], (error, results) => {
      if (error) {
        throw error;
      }
      //console.log(results);
      response.status(201).send(body);
    });
}
  
const createGameInfo = (request, response) => {
    const body = request.body;
    //console.log(body);
    db.query('INSERT INTO gameinfo (seasonYear, league, gameId, startTimeUTC, endTimeUTC, arena, city, country, clock, gameDuration, currentPeriod, halftime, endOfPeriod, seasonStage, statusShortGame, vTeam, hTeam) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
    [body.seasonYear, body.league, body.gameId, body.startTimeUTC, body.endTimeUTC, body.arena, body.city, body.country, body.clock, body.gameDuration, body.currentPeriod, body.halftime, body.endOfPeriod, body.seasonStage, body.statusShortGame, body.vTeam, body.hTeam], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    });
}

const createGameInfoCloud = (request, response) => {
    let body = request.body;
    console.log('woo-aa');
    console.log(body);
    body = {
      seasonyear: `${body[1]}`,
      league: `${body[2]}`,
      gameid: `${body[3]}`,
      starttimeutc: `${body[4]}`,
      endtimeutc: `${body[5]}`,
      arena: `${body[6]}`,
      city: `${body[7]}`,
      country: `${body[8]}`,
      clock: `${body[9]}`,
      gameduration: body[10],
      currentperiod: `${body[11]}`,
      halftime: `${body[12]}`,
      endofperiod: `${body[13]}`,
      seasonstage: `${body[14]}`,
      statusshortgame: `${body[15]}`,
      vteam: body[16],
      hteam: body[17],
    }
    console.log(body)
    console.log(body.gameid);
    db.query('INSERT INTO gameinfo (seasonyear, league, gameid, starttimeutc, endtimeutc, arena, city, country, clock, gameduration, currentperiod, halftime, endofperiod, seasonstage, statusshortgame, vteam, hteam) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
      [body.seasonyear, body.league, body.gameid, body.starttimeutc, body.endtimeutc, body.arena, body.city, body.country, body.clock, body.gameduration, body.currentperiod, body.halftime, body.endofperiod, body.seasonstage, body.statusshortgame, body.vteam, body.hteam], (error, results) => {
          if (error) {
              throw error;
          }
          response.status(201).send(body);
    });
}

const getLocalGamesByGameByPlayerPublic = async(request, response) => {
    let {playerid, gameid} = request.params;
    //let playerid = player.playerid;
    db.query('SELECT * FROM games WHERE playerid = $1 AND gameid = $2', [playerid, gameid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
  
const getGameIdPublic = async(request, response) => {
    let {playerid, league, seasonyear, shotsgameid} = request.params;
    
    let year = seasonyear.substring(0, 4);
  
    db.query(`SELECT games.gameid FROM games
              INNER JOIN gameinfo
              ON games.gameid = gameinfo.gameid
              WHERE games.playerid = $1`, [playerid], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows)
  
      response.status(200).json(results.rows)
    })
}
  
const getGamesByPlayer = async(request, response) => {
    let playerid = request.params;
    console.log(playerid);
    db.query(`SELECT * FROM games
              WHERE games.playerid = $1`, [playerid.playerid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getGameInfoByGameId = async(request, response) => {
    let gameid = request.params;
    db.query(`SELECT * FROM gameinfo
              WHERE gameinfo.gameid = $1`, [gameid.gameid], (error, results) => {
      if (error) {
        throw error
    }
      response.status(200).json(results.rows)
    })
}
  
const getVTeamHTeam = async(request, response) => {
    console.log(request.params);
    let playerid = request.params;
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
    console.log(playerid)
    db.query(`SELECT vteam, hteam FROM gameinfo
              INNER JOIN games 
              ON gameinfo.gameid = games.gameid
              WHERE games.playerid = $1`, [playerid.playerid], (error, results) => {
      if (error) {
        throw error
      }
  //    console.log(results.rows)
  
      response.status(200).json(results.rows)
    })
}

const getGameInfoFromJson = async(request, response) => {
    let gameinfo = await require(`./gameinfo.json`);
    console.log(gameinfo);
    response.status(200).send(gameinfo);
}

module.exports = {
    getVTeamHTeam,
    getGameInfoByGameId,
    getGameInfoFromJson,
    getGamesByPlayer,
    getGameIdPublic,
    getLocalGamesByGameByPlayerPublic,
    createGameInfoCloud,
    createGameInfo,
    createGameCloud,
    createGame,
    getGamesFromJson,
    getPlayerSeasonGameStats,
}