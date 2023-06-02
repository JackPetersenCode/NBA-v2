const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const { request } = require("https");

const getRankedPlayersByStat = (request, response, next) => {

    let { stat, season } = request.params;
    console.log(stat)
    console.log(season)

    db.query(`SELECT AVG(CAST(${stat} AS FLOAT)), player_id, player_name, team_abbreviation
                FROM "boxscorestraditional${season}"
                WHERE ${stat} IS NOT NULL
                AND ${stat} != ''
                AND ${stat} != UPPER('${stat}')
                AND ${stat} != 'TO'
                GROUP BY player_id, player_name, team_abbreviation
                ORDER BY AVG(CAST(${stat} AS FLOAT)) DESC`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRankedStats = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT player_id, player_name, team_id, team_abbreviation,
                AVG(CAST(min AS FLOAT)) AS MIN, 
                AVG(CAST(fgm AS FLOAT)) AS FGM,
                AVG(CAST(fga AS FLOAT)) AS FGA,
                sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) AS FG_PCT,
                AVG(CAST(fg3m AS FLOAT)) AS FG3M,
                AVG(CAST(fg3a AS FLOAT)) AS FG3A,
                sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) AS FG3_PCT,
                AVG(CAST(ftm AS FLOAT)) AS FTM,
                AVG(CAST(fta AS FLOAT)) AS FTA,
                sum(cast(ftm as float)) / NULLIF(sum(cast(fta as float)), 0) AS FT_PCT,
                AVG(CAST(oreb AS FLOAT)) AS OREB,
                AVG(CAST(dreb AS FLOAT)) AS DREB, 
                AVG(CAST(reb AS FLOAT)) AS REB, 
                AVG(CAST(ast AS FLOAT)) AS AST, 
                AVG(CAST(stl AS FLOAT)) AS STL, 
                AVG(CAST(blk AS FLOAT)) AS BLK, 
                AVG(CAST(turnovers AS FLOAT)) AS TO, 
                AVG(CAST(pf AS FLOAT)) AS PF, 
                AVG(CAST(pts AS FLOAT)) AS PTS, 
                AVG(CAST(plus_minus AS FLOAT)) AS "+/-"
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation`, (error, results) => {
      
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getCareerStats = (request, response, next) => {

    let { season, player_id } = request.params;
    console.log('boo')
    
    console.log(season)
    console.log(player_id)

    db.query(`SELECT player_name, team_id, team_abbreviation,
                AVG(CAST(min AS FLOAT)) AS MIN, 
                AVG(CAST(fgm AS FLOAT)) AS FGM,
                AVG(CAST(fga AS FLOAT)) AS FGA,
                sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) AS FG_PCT,
                AVG(CAST(fg3m AS FLOAT)) AS FG3M,
                AVG(CAST(fg3a AS FLOAT)) AS FG3A,
                sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) AS FG3_PCT,
                AVG(CAST(ftm AS FLOAT)) AS FTM,
                AVG(CAST(fta AS FLOAT)) AS FTA,
                sum(cast(ftm as float)) / NULLIF(sum(cast(fta as float)), 0) AS FT_PCT,
                AVG(CAST(oreb AS FLOAT)) AS OREB,
                AVG(CAST(dreb AS FLOAT)) AS DREB, 
                AVG(CAST(reb AS FLOAT)) AS REB, 
                AVG(CAST(ast AS FLOAT)) AS AST, 
                AVG(CAST(stl AS FLOAT)) AS STL, 
                AVG(CAST(blk AS FLOAT)) AS BLK, 
                AVG(CAST(turnovers AS FLOAT)) AS TOV, 
                AVG(CAST(pf AS FLOAT)) AS PF, 
                AVG(CAST(pts AS FLOAT)) AS PTS, 
                AVG(CAST(plus_minus AS FLOAT)) AS "+/-",
                COUNT(DISTINCT game_id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id = $1
                GROUP BY player_name, team_id, team_abbreviation`, [player_id], (error, results) => {
      
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return [];
        }
        response.status(200).json(results.rows)
    })
}

const getSeasonsPlayed = (request, response, next) => {
    let { player_id } = request. params;

}

const getRankedBoxScores = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscores${season}".player_id, "boxscores${season}".player_name, "boxscores${season}".team_id, "boxscores${season}".team_abbreviation, 
                AVG(CAST("boxscores${season}".min AS FLOAT)) AS MIN, 
                AVG(CAST(e_off_rating AS FLOAT)) AS E_OFF_RATING,
                AVG(CAST(off_rating AS FLOAT)) AS OFF_RATING,
                AVG(cast(e_def_rating as float)) AS E_DEF_RATING,
                AVG(CAST(def_rating AS FLOAT)) AS DEF_RATING,
                AVG(CAST(e_net_rating AS FLOAT)) AS E_NET_RATING,
                AVG(cast(net_rating as float)) AS NET_RATING,
                AVG(CAST(ast_pct AS FLOAT)) AS AST_PCT,
                AVG(CAST(ast_tov AS FLOAT)) AS AST_TOV,
                AVG(cast(ast_ratio as float)) AS AST_RATIO,
                AVG(CAST(oreb_pct AS FLOAT)) AS OREB_PCT,
                AVG(CAST(dreb_pct AS FLOAT)) AS DREB_PCT, 
                AVG(CAST(reb_pct AS FLOAT)) AS REB_PCT, 
                AVG(CAST(tm_tov_pct AS FLOAT)) AS TM_TOV_PCT, 
                AVG((CAST("boxscorestraditional${season}".fgm AS FLOAT) + .5 * CAST("boxscorestraditional${season}".fg3m AS FLOAT)) / NULLIF(CAST("boxscorestraditional${season}".fga AS FLOAT), 0)) AS EFG_PCT, 
                AVG(CAST(ts_pct AS FLOAT)) AS TS_PCT, 
                AVG(CAST(usg_pct AS FLOAT)) AS USG_PCT, 
                AVG(CAST(e_usg_pct AS FLOAT)) AS E_USG_PCT, 
                AVG(CAST(e_pace AS FLOAT)) AS E_PACE, 
                AVG(CAST(pace AS FLOAT)) AS PACE,
                AVG(CAST(pace_per40 AS FLOAT)) AS PACE_PER40, 
                AVG(CAST(poss AS FLOAT)) AS POSS, 
                AVG(CAST(pie AS FLOAT)) AS PIE
                FROM "boxscores${season}"
                INNER JOIN "boxscorestraditional${season}"
                ON "boxscorestraditional${season}".player_id = "boxscores${season}".player_id
                WHERE "boxscores${season}".min IS NOT NULL
                AND CAST("boxscores${season}".min AS FLOAT) > 0
                AND "boxscores${season}".player_id != 'PLAYER_ID'
                GROUP BY "boxscores${season}".player_id, "boxscores${season}".player_name, "boxscores${season}".team_id, "boxscores${season}".team_abbreviation`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRankedBoxScoresMisc = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscoremisc${season}".player_name, "boxscoremisc${season}".team_abbreviation, 
                SUM(CAST("boxscoremisc${season}".min AS FLOAT)) AS MIN, 
                SUM(CAST(pts_off_tov AS FLOAT)) AS PTS_OFF_TOV,
                SUM(CAST(pts_2nd_chance AS FLOAT)) AS PTS_2ND_CHANCE,
                SUM(cast(pts_fb as float)) AS PTS_FB,
                SUM(CAST(pts_paint AS FLOAT)) AS PTS_PAINT,
                SUM(CAST(opp_pts_off_tov AS FLOAT)) AS OPP_PTS_OFF_TOV,
                SUM(cast(opp_pts_2nd_chance as float)) AS OPP_PTS_2ND_CHANCE,
                SUM(CAST(opp_pts_fb AS FLOAT)) AS OPP_PTS_FB,
                SUM(CAST(opp_pts_paint AS FLOAT)) AS OPP_PTS_PAINT,
                SUM(cast("boxscoremisc${season}".blk as float)) AS BLK,
                SUM(CAST(blka AS FLOAT)) AS BLKA,
                SUM(CAST("boxscoremisc${season}".pf AS FLOAT)) AS PF, 
                SUM(CAST(pfd AS FLOAT)) AS PFD
                FROM "boxscoremisc${season}"
                WHERE "boxscoremisc${season}".min IS NOT NULL
                AND CAST("boxscoremisc${season}".min AS FLOAT) > 0
                AND "boxscoremisc${season}".player_id != 'PLAYER_ID'
                GROUP BY "boxscoremisc${season}".player_name, "boxscoremisc${season}".team_abbreviation`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getPtsLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                AVG(CAST(pts AS FLOAT)) AS PTS, 
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY AVG(CAST(pts AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getRebLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                AVG(CAST(reb AS FLOAT)) AS REB, 
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY AVG(CAST(reb AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getAstLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                AVG(CAST(ast AS FLOAT)) AS AST,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY AVG(CAST(ast AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getStlLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                AVG(CAST(stl AS FLOAT)) AS STL, 
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY AVG(CAST(stl AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getBlkLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                AVG(CAST(blk AS FLOAT)) AS BLK,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY AVG(CAST(blk AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getFgPctLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) * 100 AS FG_PCT,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING SUM(CAST(fgm AS FLOAT)) > 300
                ORDER BY sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getPlusMinusLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                SUM(CAST(plus_minus AS FLOAT)) AS PLUS_MINUS,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING COUNT(game_id) > 57
                ORDER BY SUM(CAST(plus_minus AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getFg3mLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                SUM(CAST(fg3m AS FLOAT)) AS FG3M,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING SUM(CAST(fg3m AS FLOAT)) > 81
                ORDER BY SUM(CAST(fg3m AS FLOAT)) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getFg3PctLeaders = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) * 100 AS FG3_PCT,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                HAVING SUM(CAST(fg3m AS FLOAT)) > 81
                ORDER BY sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) DESC LIMIT 5`, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}

const getPtsOffTovLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(pts_off_tov))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(pts_off_tov)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getPts2ndChanceLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(pts_2nd_chance))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(pts_2nd_chance)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getPtsFbLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(pts_fb))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(pts_fb)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getPtsPaintLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(pts_paint))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(pts_paint)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getOppPtsOffTovLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(opp_pts_off_tov))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(opp_pts_off_tov)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}
const getOppPts2ndChanceLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(opp_pts_2nd_chance))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(opp_pts_2nd_chance)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getOppPtsFbLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(opp_pts_fb))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(opp_pts_fb)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getOppPtsPaintLeaders = (request, response, next) => {

    //fg part: fgm, ftm, fga, pts,
    //
    let { season } = request.params;
    db.query(`SELECT "boxscoresmisc${season}".player_id, "boxscoresmisc${season}".player_name, "boxscoresmisc${season}".team_abbreviation,
                sum(cast(opp_pts_paint))
                FROM "boxscoresmisc${season}"
                WHERE min IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                ORDER BY sum(cast(opp_pts_paint)) LIMIT 5
                `, (error, results) => {

    if (error) {
        throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getSumStat = (request, response, next) => {
    let { orderBy, season, category } = request.params;
    db.query(`SELECT "${category}${season}".player_id, "${category}${season}".player_name, "${category}${season}".team_abbreviation,
    sum(cast(${orderBy} as float)) as ${orderBy}
    FROM "${category}${season}"
    WHERE min IS NOT NULL
    AND CAST(min AS FLOAT) > 0
    AND player_id != 'PLAYER_ID'
    GROUP BY player_id, player_name, team_id, team_abbreviation
    ORDER BY SUM(CAST(${orderBy} as float)) desc limit 5`, (error, results) => {

        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const getQualifiedPlayers = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscorestraditional${season}".player_id, "boxscorestraditional${season}".player_name, "boxscorestraditional${season}".team_abbreviation,
                COUNT(id)
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation
                `, (error, results) => {

    if (error) {
        throw error;
    }
    if (results.rows.length === 0 || results.rows[0].count === '0') {
        return next(new Error( 'Stats Do Not Exist' ));
    }
    response.status(200).json(results.rows)
  })
}


const getRankedHustleStats = (request, response, next) => {
    const {season} = request.params;
    db.query(`SELECT * FROM "leagueHustleStatsPlayer${season}"`, (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows)
    })
}

module.exports = {
    getRankedPlayersByStat,
    getRankedStats,
    getRankedBoxScores,
    getRankedHustleStats,
    getPtsLeaders,
    getQualifiedPlayers,
    getAstLeaders,
    getRebLeaders,
    getStlLeaders,
    getBlkLeaders,
    getFg3PctLeaders,
    getFg3mLeaders,
    getFgPctLeaders,
    getPlusMinusLeaders,
    getSumStat,
    getRankedBoxScoresMisc, 
    getCareerStats,
}