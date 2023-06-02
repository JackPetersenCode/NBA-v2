const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const getShots = async(request, response, next) => {
    let shotsArray = [];
    //let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    let years = ['2015-2016'];
    try {
        let shots = await require(`./juicystats/2022-2023.json`);
        response.status(200).send(shots);
    } catch (error) {
        return next(error);
    }   
}
//CHANGE ALL AWAITS TO SQL QUERIES, IDIOT.
const getShotsLocal = async(request, response, next) => {
    db.query('SELECT * FROM "2015-2016"', (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getShotsBySeason = async(request, response, next) => {
    let season = request.params;
    //console.log(season['season']);
    try {
        let shots = await require(`../juicystats/${season['season']}.json`);
        response.status(200).send(shots);
    } catch (error) {
        return next(error);
    } 
}

const getShotsBySeasonLocal = async(request, response, next) => {
    let season = request.params;
    console.log('shots by season local');
    db.query(`SELECT * FROM "${season["season"]}"`, (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getShotsByPlayerBySeason = async(request, response, next) => {
    let season = request.params;
    //console.log(season['season']);
    try {
        let shots = await require(`../juicystats/${season['season']}.json`);
        response.status(200).send(shots);
    } catch (error) {
        return next(error);
    }
}

const getFinishingStats = (request, response, next) => {
    let { season, idString } = request.params;

    let split = idString.split(',')
    db.query(`SELECT player_name, player_id, COUNT(DISTINCT id)
                FROM "${season}"
                WHERE action_type = ANY(ARRAY['Driving Layup Shot', 'Running Reverse Dunk Shot', 'Putback Dunk Shot', 'Layup Shot',
                    'Reverse Dunk Shot', 'Running Alley Oop Dunk Shot', 'Driving Finger Roll Layup Shot', 'Cutting Dunk Shot',
                    'Driving Reverse Dunk Shot', 'Cutting Finger Roll Layup Shot', 'Putback Layup Shot', 'Running Alley Oop Layup Shot',
                    'Dunk Shot', 'Driving Dunk Shot', 'Running Finger Roll Layup Shot', 'Driving Reverse Layup Shot', 'Tip Layup Shot',
                    'Reverse Layup Shot', 'Tip Dunk Shot', 'Finger Roll Layup Shot', 'Alley Oop Dunk Shot', 'Alley Oop Layup shot',
                    'Cutting Layup Shot', 'Running Layup Shot'])
                AND player_id = ANY(ARRAY['${split[0]}', '${split[1]}', '${split[2]}','${split[3]}', '${split[4]}', '${split[5]}','${split[6]}', '${split[7]}', '${split[8]}', '${split[9]}'])
                GROUP BY player_name, player_id`, (error, results) => {
        if (error) {
            console.log(error)
            throw(error);
        }
        response.status(200).json(results.rows)
    })
}

const getShootingStats = (request, response, next) => {
    let { season, idString } = request.params;

    let split = idString.split(',')

    db.query(`SELECT "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".player_id,
                SUM(CAST("boxscorestraditional${season}".fga AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS fga,
                SUM(CAST("boxscorestraditional${season}".fg3a AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS fg3a,
                SUM(CAST("boxscorestraditional${season}".pts AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS pts,
                AVG((CAST("boxscorestraditional${season}".fgm AS NUMERIC) + .5 * CAST("boxscorestraditional${season}".fg3m AS NUMERIC)) / NULLIF(CAST("boxscorestraditional${season}".fga AS NUMERIC), 0)) * 100 AS EFG
                FROM "boxscorestraditional${season}"
                INNER JOIN "boxscores${season}"
                ON "boxscorestraditional${season}".player_id = "boxscores${season}".player_id
                WHERE "boxscorestraditional${season}".player_id = ANY(ARRAY['${split[0]}', '${split[1]}', '${split[2]}','${split[3]}', '${split[4]}', '${split[5]}','${split[6]}', '${split[7]}', '${split[8]}', '${split[9]}'])
                AND "boxscorestraditional${season}".min IS NOT NULL
                AND "boxscores${season}".min IS NOT NULL
                AND "boxscorestraditional${season}".ft_pct IS NOT NULL
                AND CAST("boxscorestraditional${season}".min AS NUMERIC) > 0
                AND CAST("boxscores${season}".min AS NUMERIC) > 0
                AND "boxscorestraditional${season}".player_id != 'PLAYER_ID'
                AND "boxscores${season}".player_id != 'PLAYER_ID'
                GROUP BY "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".player_id`, (error, results) => {
        if (error) {
            console.log(error)
            throw(error);
        }
        response.status(200).json(results.rows)
    })
}

const getPlaymakingStats = (request, response, next) => {
    let { season, idString } = request.params;

    let split = idString.split(',')
 
    db.query(`SELECT "boxscorestraditional${season}".player_name,
                "boxscorestraditional${season}".player_id,
                SUM(CAST(ast AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS ast,
                SUM(CAST(pts_2nd_chance AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS pts_2nd_chance,
                SUM(CAST(pts_fb AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS pts_fb,
                SUM(CAST(pts_off_tov AS NUMERIC)) / SUM(CAST("boxscorestraditional${season}".min AS NUMERIC)) AS pts_off_tov
                FROM "boxscorestraditional${season}"
                INNER JOIN "boxscoremisc${season}"
                ON "boxscorestraditional${season}".player_id = "boxscoremisc${season}".player_id
                WHERE "boxscorestraditional${season}".player_id = ANY(ARRAY['${split[0]}', '${split[1]}', '${split[2]}','${split[3]}', '${split[4]}', '${split[5]}','${split[6]}', '${split[7]}', '${split[8]}', '${split[9]}'])
                AND "boxscorestraditional${season}".min IS NOT NULL
                AND "boxscoremisc${season}".min IS NOT NULL
                AND "boxscorestraditional${season}".ft_pct IS NOT NULL
                AND CAST("boxscorestraditional${season}".min AS NUMERIC) > 0
                AND CAST("boxscoremisc${season}".min AS NUMERIC) > 0
                AND "boxscorestraditional${season}".player_id != 'PLAYER_ID'
                AND "boxscoremisc${season}".player_id != 'PLAYER_ID'
                GROUP BY "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".player_id`, (error, results) => {
        if (error) {
            console.log(error)
            throw(error);
        }
        response.status(200).json(results.rows)
    })
}

const getReboundingDefenseStats = (request, response, next) => {
    let { season, idString } = request.params;

    let split = idString.split(',')

    db.query(`SELECT "leagueHustleStatsPlayer${season}".player_name, "leagueHustleStatsPlayer${season}".player_id,
                SUM(CAST(stl AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) AS stl,
                SUM(CAST(oreb AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) AS oreb,
                SUM(CAST(dreb AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) AS dreb,
                SUM(CAST(blk AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) AS blk,
                (CAST(contested_shots AS NUMERIC)
                + CAST(deflections AS NUMERIC)
                + CAST(charges_drawn AS NUMERIC)
                + CAST(screen_assists AS NUMERIC)
                + CAST(screen_ast_pts AS NUMERIC)
                + CAST(loose_balls_recovered AS NUMERIC)
                + CAST(box_out_player_team_rebs AS NUMERIC)
                + CAST(box_out_player_rebs AS NUMERIC)
                + CAST(box_outs AS NUMERIC)) / CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) AS hustle_factor
                FROM "leagueHustleStatsPlayer${season}"
                INNER JOIN "boxscorestraditional${season}"
                ON "leagueHustleStatsPlayer${season}".player_id = "boxscorestraditional${season}".player_id
                WHERE "boxscorestraditional${season}".player_id = ANY(ARRAY['${split[0]}', '${split[1]}', '${split[2]}','${split[3]}', '${split[4]}', '${split[5]}','${split[6]}', '${split[7]}', '${split[8]}', '${split[9]}'])
                AND CAST("leagueHustleStatsPlayer${season}".min AS NUMERIC) > 0
                AND "boxscorestraditional${season}".min IS NOT NULL
                AND "boxscorestraditional${season}".ft_pct IS NOT NULL
                AND CAST("boxscorestraditional${season}".min AS NUMERIC) > 0
                AND "boxscorestraditional${season}".player_id != 'PLAYER_ID'
                GROUP BY
                    "leagueHustleStatsPlayer${season}".contested_shots, 
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
                    "leagueHustleStatsPlayer${season}".player_id`, (error, results) => {
        if (error) {
            console.log(error);
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getShotsByPlayerBySeasonLocal = async(request, response, next) => {
    let { player, season } = request.params;
    
    db.query(`SELECT * FROM "${season}" WHERE player_name = $1`, [player], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
    })
}

const getShotsByPlayerBySeasonByGameLocal = async(request, response, next) => {
  let { player, season, game_id } = request.params;
  let playerid = player.player_id;
  db.query(`SELECT * FROM "${season}" WHERE player_name = $1 AND game_id = $2`, [player, game_id], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getShotsByPlayerLocal = async(request, response, next) => {
  let player = request.params;
  let playerid = player.playerid;
  db.query('SELECT * FROM "2015-2016" WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const createShot = (request, response, next) => {
  const body = request.body;
  db.query('INSERT INTO shotchartdetail (grid_type, game_id, game_event_id, player_id, player_name, team_id, team_name, period, minutes_remaining, seconds_remaining, event_type, action_type, shot_type, shot_zone_basic, shot_zone_area, shot_zone_range, shot_distance, loc_x, loc_y, shot_attempted_flag, shot_made_flag, game_date, htm, vtm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
  [body[0], body[1], body[2].toString(), body[3].toString(), body[4], body[5].toString(), body[6], body[7].toString(), body[8].toString(), body[9].toString(), body[10], body[11], body[12], body[13], body[14], body[15], body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21], body[22], body[23]], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const createShotBySeason = (request, response, next) => {
    let season = request.params;
    const body = request.body;
    db.query(`INSERT INTO "${season['season']}" (grid_type, game_id, game_event_id, player_id, player_name, team_id, team_name, period, minutes_remaining, seconds_remaining, event_type, action_type, shot_type, shot_zone_basic, shot_zone_area, shot_zone_range, shot_distance, loc_x, loc_y, shot_attempted_flag, shot_made_flag, game_date, htm, vtm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`, 
    [body[0], body[1], body[2].toString(), body[3].toString(), body[4], body[5].toString(), body[6], body[7].toString(), body[8].toString(), body[9].toString(), body[10], body[11], body[12], body[13], body[14], body[15], body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21], body[22], body[23]], (error, results) => {
          if (error) {
              return next(error);
          }
          response.status(201).send(body);
    })
}



module.exports = {
  getShots,
  createShotBySeason,
  createShot,
  getShotsByPlayerLocal,
  getShotsByPlayerBySeasonByGameLocal,
  getShotsByPlayerBySeasonLocal,
  getShotsByPlayerBySeason,
  getShotsBySeasonLocal,
  getShotsBySeason,
  getShotsLocal,
  getFinishingStats,
  getShootingStats,
  getReboundingDefenseStats,
  getPlaymakingStats,
}