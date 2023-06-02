const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getAllFirstLastCarmeloPointsInSeason = (request, response, next) => {
    const season = request.params;
    db.query(`SELECT firstname, lastname, carmelopts FROM "carmeloPts" WHERE season = $1 AND carmelopts!='STATISTICS UNAVAILABLE' ORDER BY CAST(carmelopts AS FLOAT) ASC`, [season.season], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const createPlayerCarmeloPoints = (request, response, next) => {
    const body = request.body;
  
    db.query('INSERT INTO "carmeloPts" (playerid, firstname, lastname, carmelopts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.carmeloPts, body.season], (error, results) => {
        if (error) {
            return next(error)
        }
        response.status(201).send(body);
    })
}

const getNewCarmeloFactor = (request, response, next) => {
    const { season } = request.params;
    db.query(`SELECT "leagueHustleStatsPlayer${season}".player_name, "leagueHustleStatsPlayer${season}".team_abbreviation,
            "leagueHustleStatsPlayer${season}".min,
            CAST(contested_shots AS NUMERIC)
            + CAST(deflections AS NUMERIC)
            + CAST(charges_drawn AS NUMERIC)
            + CAST(screen_assists AS NUMERIC)
            + CAST(screen_ast_pts AS NUMERIC)
            + CAST(loose_balls_recovered AS NUMERIC)
            + CAST(box_out_player_team_rebs AS NUMERIC)
            + CAST(box_out_player_rebs AS NUMERIC)
            + CAST(box_outs AS NUMERIC) AS TOTAL_STATS,
            AVG((CAST("boxscorestraditional${season}".fgm AS FLOAT) + .5 * CAST("boxscorestraditional${season}".fg3m AS FLOAT)) / NULLIF(CAST("boxscorestraditional${season}".fga AS FLOAT), 0)) * 100 AS EFG,
            ((CAST(contested_shots AS NUMERIC)
            + CAST(deflections AS NUMERIC)
            + CAST(charges_drawn AS NUMERIC)
            + CAST(screen_assists AS NUMERIC)
            + CAST(screen_ast_pts AS NUMERIC)
            + CAST(loose_balls_recovered AS NUMERIC)
            + CAST(box_out_player_team_rebs AS NUMERIC)
            + CAST(box_out_player_rebs AS NUMERIC)
            + CAST(box_outs AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) * 100)
            + AVG((CAST("boxscorestraditional${season}".fgm AS FLOAT) + .5 * CAST("boxscorestraditional${season}".fg3m AS FLOAT)) / NULLIF(CAST("boxscorestraditional${season}".fga AS FLOAT), 0)) * 100
            - 100 AS CARMELO_FACTOR,
            CAST(.15 * AVG(CAST("boxscorestraditional${season}".pts AS NUMERIC)) 
             + .07 * AVG(CAST("boxscorestraditional${season}".reb AS NUMERIC)) 
             + .06 * AVG(CAST(ast AS NUMERIC)) 
             + .125 * AVG(CAST(stl AS NUMERIC)) 
             - .125 * AVG(CAST(turnovers AS NUMERIC))
             + .3 * AVG(CAST(plus_minus AS NUMERIC)) 
             + .02 * AVG(CAST(fg_pct AS NUMERIC)) AS FLOAT) AS MVP_POINTS
            FROM "leagueHustleStatsPlayer${season}"
            INNER JOIN "boxscorestraditional${season}"
            ON "leagueHustleStatsPlayer${season}".player_name = "boxscorestraditional${season}".player_name
            WHERE CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) > 10
            AND "boxscorestraditional${season}".min IS NOT NULL
            AND "boxscorestraditional${season}".ft_pct IS NOT NULL
            AND CAST("boxscorestraditional${season}".min AS FLOAT) > 0
            AND "boxscorestraditional${season}".player_id != 'PLAYER_ID'
            GROUP BY "leagueHustleStatsPlayer${season}".contested_shots, 
            "leagueHustleStatsPlayer${season}".deflections,
            "leagueHustleStatsPlayer${season}".charges_drawn,
            "leagueHustleStatsPlayer${season}".screen_assists,
            "leagueHustleStatsPlayer${season}".screen_ast_pts,
            "leagueHustleStatsPlayer${season}".loose_balls_recovered,
            "leagueHustleStatsPlayer${season}".box_out_player_team_rebs,
            "leagueHustleStatsPlayer${season}".box_out_player_rebs,
            "leagueHustleStatsPlayer${season}".box_outs,
            "leagueHustleStatsPlayer${season}".min,
            "leagueHustleStatsPlayer${season}".player_name, 
            "leagueHustleStatsPlayer${season}".team_abbreviation
            ORDER BY MVP_POINTS DESC`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createPlayerCarmeloPoints,
    getAllFirstLastCarmeloPointsInSeason,
    getNewCarmeloFactor,
}
    