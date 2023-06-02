const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getOddsFromCSV = (request, response, next) => {
    let season = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/odds${season.season}.csv`)
        .pipe(
          parse({
            delimiter: " ",
            columns: true,
            relax_column_count: true,
            ltrim: true,
          })
        )
        .on("data", function async(row) {
          // 👇 push the object row into the array
            data.push(row);
            console.log(row);
        })
        .on("error", function async(error) {
            return next(error);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:"); 
        console.log(data);
        response.status(201).send(data);
    })
}
  
const getNewOddsFromCSV = (request, response, next) => {
    let season = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/newOdds${season.season}.csv`)
        .pipe(
          parse({
            delimiter: ",",
            columns: true,
            relax_column_count: true,
            ltrim: true,
          })
        )
        .on("data", function async(row) {
          // 👇 push the object row into the array
            data.push(row);
            console.log(row);
        })
        .on("error", function async(error) {
            return next(error);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:"); 
        response.status(201).send(data);
    })
}

const createOddsBySeason = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    
    db.query(`INSERT INTO "odds${season.season}" (date, rot, vh, team, first, second, third, fourth, final, open, close, ml, h2h) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, 
    [body[0], body[1], body[2], body[3], body[4], body[5], body[6], body[7], body[8], body[9], body[10], body[11], body[12]], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const createNewOddsBySeason = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    db.query(`INSERT INTO "newOdds${season.season}" (game_id, commence_time, home_team, away_team, home_odds, away_odds) VALUES ($1, $2, $3, $4, $5, $6)`, 
    [body.game_id, body.commence_time, body.home_team, body.away_team, body.home_odds, body.away_odds], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
const getHomeMoneyline = (request, response, next) => {
    const {season, homeTeam, gamedate} = request.params;

    db.query(`SELECT ml FROM "odds${season}"
              WHERE team = $1
              AND date = $2`, [homeTeam, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}
  
const getVisitorMoneyline = (request, response, next) => {
    const {season, visitorTeam, gamedate} = request.params;
    db.query(`SELECT ml FROM "odds${season}"
              WHERE team = $1
              AND date = $2`, [visitorTeam, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getNewOddsByGameByTeam = (request, response, next) => {
    const {season, team, gamedate, H_or_V} = request.params;
    db.query(`SELECT ${H_or_V}_odds FROM "newOdds${season}"
                WHERE ${H_or_V}_team = $1
                AND SUBSTRING(commence_time, 1, 10) = $2`, [team, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}


const getUpcomingGames = (request, response, next) => {
    const {season} = request.params;
    db.query(`SELECT
                distinct on(commence_time, home_team) 
                id,
                commence_time,
                home_team,
                away_team, 
                home_odds, 
                away_odds, 
                game_id
                from "newOdds${season}"
                WHERE commence_time != 'commence_time'
                order by commence_time desc limit 10`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const createMatchupResults = (request, response, next) => {
    const {season} = request.params;
    const body = request.body;
    db.query(`INSERT INTO "matchupresults${season}" (game_date, matchup, actual_home, actual_visitor, expected_home, expected_visitor, odds_home, odds_visitor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [body.game_date, body.matchup, body.actual_home, body.actual_visitor, body.expected_home, body.expected_visitor, body.odds_home, body.odds_visitor],
                (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    })
}

const createExpected = (request, response, next) => {
    const {season} = request.params;
    const body = request.body;
    db.query(`INSERT INTO "matchupresultsTEST${season}" (game_date, matchup, home_team, home_team_id, home_expected, visitor_team, visitor_team_id, visitor_expected, home_actual, visitor_actual, home_odds, visitor_odds, green_red) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [body.game_date, body.matchup, body.home_team, body.home_team_id, body.home_expected, body.visitor_team, body.visitor_team_id, body.visitor_expected, body.home_actual, body.visitor_actual, body.home_odds, body.visitor_odds, body.green_red],
                (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    })
}

const getHistoricalResults = (request, response, next) => {
    const {season} = request.params;
    db.query(`SELECT * FROM "matchupresults${season}"
                ORDER BY id DESC`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getHistoricalResultsByTeam = (request, response, next) => {

    const {team, season} = request.params;
    console.log(team)
    console.log(season)
    db.query(`SELECT * FROM "matchupresults${season}"
                WHERE home_team = $1
                OR visitor_team = $1
                ORDER BY id DESC`, [team], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getWinPercentage = (request, response, next) => {
    let { season } = request.params;
    console.log(season)
    db.query(`SELECT green_red, COUNT(*)
                FROM "matchupresults${season}"
                GROUP BY green_red`,
                (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getWinPercentageOverall = (request, response, next) => {
    db.query(`SELECT green_red, COUNT(*)
                FROM "matchupresults2016-2017"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2017-2018"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2018-2019"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2019-2020"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2020-2021"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2021-2022"
                GROUP BY green_red
                UNION ALL
                SELECT green_red, COUNT(*)
                FROM "matchupresults2022-2023"
                GROUP BY green_red`,
                (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}


const getWinPercentageByTeam = (request, response, next) => {
    let { team, season } = request.params;
    console.log(season)
    db.query(`SELECT green_red, COUNT(*)
                FROM "matchupresults${season}"
                WHERE home_team = $1
                OR visitor_team = $1
                GROUP BY green_red`, [team],
                (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getVisitorMoneyline,
    getHomeMoneyline,
    getOddsFromCSV,
    createOddsBySeason,
    createNewOddsBySeason,
    getNewOddsFromCSV,
    getUpcomingGames, 
    createMatchupResults,
    createExpected,
    getNewOddsByGameByTeam,
    getHistoricalResults,
    getWinPercentage,
    getHistoricalResultsByTeam,
    getWinPercentageByTeam,
    getWinPercentageOverall,
}