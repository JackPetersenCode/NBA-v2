const db = require("./pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


/*
const getBoxScoreByGameLocal = async(request, response) => {
  let season = request.params;
  db.query(`SELECT * FROM "${season["season"]}"`, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
*/




const deleteDatabase = (request, response) => {
    db.query('DELETE FROM players', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on players');
    });
    db.query('DELETE FROM games', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on games');
    });
    db.query('DELETE FROM gameinfo', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on gameinfo');
    });
}

/*
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const body = request.body
    console.log(body);
    db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [body.name, body.email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(body);
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send()
    })
}
*/



/*
const writePlayersCSV = (request, response) => {
  let players = request.body;
  const jsonString = JSON.stringify(players);
  fs.writeFile('./playersJson.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })
}
*/
        











const getTeamNames = async(request, response) => {
  console.log('inside getTeamNames in leagueGamesQueries')
  db.query('SELECT DISTINCT team_name FROM "leagueGames2021-2022"', (error, results) => {
      if (error) {
          console.log(error)
      }
      response.status(200).json(results.rows)
  })
}

const getStatsHeadersFromTable = (request, response) => {
  const table = request.params;
  db.query(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table.table}'`, (error, results) => {
    if (error) {
        console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getTableLengthBox = (request, response) => {
    const table = request.params;
    db.query(`SELECT COUNT(DISTINCT game_id) FROM "${table.table}"`, (error, results) => {
        if (error) {
            console.log(error)
        }
        response.status(200).json(results.rows)
    })
}

const getTableLength = (request, response) => {
  const table = request.params;
  db.query(`SELECT COUNT(id) FROM "${table.table}"`, (error, results) => {
      if (error) {
          console.log(error)
      }
      response.status(200).json(results.rows)
  })
}

module.exports = {
    deleteDatabase,
    getStatsHeadersFromTable,
    getTeamNames,
    getTableLength,
    getTableLengthBox
}