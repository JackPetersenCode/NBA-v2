const express = require('express');
const router = express.Router();
const leagueGames = require('../services/leagueGamesQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     TeamAbbreviationArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/TeamAbbreviationObject'
 *     TeamAbbreviationObject:
 *       type: 'object'
 *       properties:
 *         team_abbreviation:
 *           type: 'string'
 *       example:
 *         team_abbreviation: 'GSW'
 *     GameResultsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/GameResultsObject'
 *     GameResultsObject:
 *       type: 'object'
 *       properties:
 *         game_date:
 *           type: 'string'
 *         matchup:
 *           type: 'string'
 *         wl:
 *           type: 'string'
 *         pts:
 *           type: 'string'
 *         plus_minus:
 *           type: 'string'
 *       example:
 *         game_date: '2015-10-27'
 *         matchup: 'GSW vs. NOP'
 *         wl: 'W'
 *         pts: '111'
 *         plus_minus: '16'
 *     TeamIdArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/TeamIdObject'
 *     TeamIdObject:
 *       type: 'object'
 *       properties:
 *         team_id:
 *           type: 'string'
 *       example:
 *         team_id: '1610612744'
 *     GameIdArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/GameIdObject'
 *     GameIdObject:
 *       type: 'object'
 *       properties:
 *         game_id:
 *           type: 'string'
 *       example:
 *         game_id: '0021500003'
 *     gameIdDateMatchupArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/gameIdDateMatchupObject'
 *     gameIdDateMatchupObject:
 *       type: 'object'
 *       properties:
 *         game_id:
 *           type: 'string'
 *         game_date:
 *           type: 'string'
 *         matchup:
 *           type: 'string'
 *       example:
 *         game_id: '0021500003'
 *         game_date: '2015-10-27'
 *         matchup: 'GSW vs. NOP'
 *     LeagueGamesReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguegamelog'
 *         parameters: {"LeagueId": null, "Season": "2015-16"}
 *         resultSets: [{"headers": [
 *              "SEASON_ID",
 *               "TEAM_ID",
 *               "TEAM_ABBREVIATION",
 *               "TEAM_NAME",
 *               "GAME_ID",
 *               "GAME_DATE",
 *               "MATCHUP",
 *               "WL",
 *               "MIN",
 *               "FGM",
 *               "FGA",
 *               "FG_PCT",
 *               "FG3M",
 *               "FG3A",
 *               "FG3_PCT",
 *               "FTM",
 *               "FTA",
 *               "FT_PCT",
 *               "OREB",
 *               "DREB",
 *               "REB",
 *               "AST",
 *               "STL",
 *               "BLK",
 *               "TOV",
 *               "PF",
 *               "PTS",
 *               "PLUS_MINUS",
 *               "VIDEO_AVAILABLE"],
 *              "rowSet": ['stats go here']}]
 *     LeagueGamesReadArray:
 *       type: 'array'
 *       example: [
 *                  "22015",
 *                  1610612744,
 *                  "GSW",
 *                  "Golden State Warriors",
 *                  "0021500003",
 *                  "2015-10-27",
 *                  "GSW vs. NOP",
 *                  "W",
 *                  240,
 *                  41,
 *                  96,
 *                  0.427,
 *                  9,
 *                  30,
 *                  0.3,
 *                  20,
 *                  22,
 *                  0.909,
 *                  21,
 *                  35,
 *                  56,
 *                  29,
 *                  8,
 *                  7,
 *                  20,
 *                  29,
 *                  111,
 *                  16,
 *                  1
 *               ]
 *     LeagueGamesArray:
 *       type: 'array'
 *       items:
 *          $ref: '#/components/schemas/LeagueGamesObject'
 *     LeagueGamesObject:
 *       type: 'object'
 *       properties:
 *         season_id:
 *           type: 'string'
 *         team_id:
 *           type: 'string'
 *         team_abbreviation:
 *           type: 'string'
 *         team_name:
 *           type: 'string'
 *         game_id:
 *           type: 'string'
 *         game_date:
 *           type: 'string'
 *         matchup:
 *           type: 'string'
 *         wl:
 *           type: 'string'
 *         min:
 *           type: 'string'
 *         fgm:
 *           type: 'string'
 *         fga:
 *           type: 'string'
 *         fg_pct:
 *           type: 'string'
 *         fg3m:
 *           type: 'string'
 *         fg3a:
 *           type: 'string'
 *         fg3_pct:
 *           type: 'string'
 *         ftm:
 *           type: 'string'
 *         fta:
 *           type: 'string'
 *         ft_pct:
 *           type: 'string'
 *         oreb:
 *           type: 'string'
 *         dreb:
 *           type: 'string'
 *         reb:
 *           type: 'string'
 *         ast:
 *           type: 'string'
 *         stl:
 *           type: 'string'
 *         blk:
 *           type: 'string'
 *         to:
 *           type: 'string'
 *         pf:
 *           type: 'string'
 *         pts:
 *           type: 'string'
 *         plus_minus:
 *           type: 'string'
 *         video_available:
 *           type: 'string'
 *       example:
 *         season_id: "22015"
 *         team_id: "1610612744"
 *         team_abbreviation: "GSW"
 *         team_name: "Golden State Warriors"
 *         game_id: "0021500003"
 *         game_date: "2015-10-27"
 *         matchup: "GSW vs. NOP"
 *         wl: "W"
 *         min: "240"
 *         fgm: "41"
 *         fga: "96"
 *         fg_pct: "0.427"
 *         fg3m: "9"
 *         fg3a: "30"
 *         fg3_pct: "0.3"
 *         ftm: "20"
 *         fta: "22"
 *         ft_pct: "0.909"
 *         oreb: "21"
 *         dreb: "35"
 *         reb: "56"
 *         ast: "29"
 *         stl: "8"
 *         blk: "7"
 *         tov: "20"
 *         pf: "29"
 *         pts: "111"
 *         plus_minus: "16"
 *         video_available: "1"
 * /api/leagueGames/{season}:
 *   get:
 *     summary: Read League Games from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league games we are reading
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueGamesReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/:season', checkAuthenticated, leagueGames.getGamesBySeason);


//router.get('/local/leaguegames', leagueGames.getGamesLocal);

/**
 * @swagger
 * /api/leagueGames/local/leaguegames/{season}:
 *   get:
 *     summary: Get Local League Games by season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the League Games we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueGamesArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/local/leaguegames/:season', leagueGames.getGamesBySeasonLocal);

router.get('/withboxscoresummary/:season', leagueGames.getGamesBySeasonJackarithm);

router.get('/averageScore/:season', leagueGames.getAveragePointTotalWholeSeason);


router.get('/averageScore/:gameId/:season', leagueGames.getAveragePointTotal);

/**
 * @swagger
 * /api/leagueGames/{season}:
 *    post:
 *      summary: Creates a new league games row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league games we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league games
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueGamesReadArray'
 *      responses:
 *        '201':
 *          description: returns created league games read array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueGamesReadArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', checkAuthenticated, leagueGames.createGamesBySeason);

/**
 * @swagger
 * /api/leagueGames/gameidgamedatematchup/{player}/{season}:
 *   get:
 *     summary: Get gameIdDateMatchupArray of games played by player in season
 *     parameters:
 *       - in: path
 *         name: player
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the player who's gameIdDateMatchupObject we are getting
 *         example: 'Draymond Green'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the gameIdDateMatchupArray we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/gameIdDateMatchupArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/gameidgamedatematchup/:player/:season', leagueGames.getGameIdGameDateMatchupBySeasonDropDownLocal);


 /** 
 * @swagger
 * /api/leagueGames/teamid/{teamname}:
 *   get:
 *     summary: Get team_id of team from "leagueGames2021-2022" 
 *     parameters:
 *       - in: path
 *         name: teamname
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the team who's team_id we are getting
 *         example: 'Golden State Warriors'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamIdArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/teamid/:teamname', leagueGames.getTeamIdFromName);

 /** 
 * @swagger
 * /api/leagueGames/gameResults/home/{team}/{season}:
 *   get:
 *     summary: Get home team gameResultsObject from "leagueGames${season}" 
 *     parameters:
 *       - in: path
 *         name: team
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the home team who's game results we are getting
 *         example: 'Golden State Warriors'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game results we are getting
 *         example: '2015-2016' 
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameResultsArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/gameResults/home/:team/:season', leagueGames.getGameResultsByHomeTeamSeason);

 /** 
 * @swagger
 * /api/leagueGames/gameResults/visitor/{team}/{season}:
 *   get:
 *     summary: Get home visitor gameResultsObject from "leagueGames${season}" 
 *     parameters:
 *       - in: path
 *         name: team
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the visitor team who's game results we are getting
 *         example: 'New Orleans Pelicans'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game results we are getting
 *         example: '2015-2016' 
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameResultsArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/gameResults/visitor/:team/:season', leagueGames.getGameResultsByVisitorTeamSeason);

 /** 
 * @swagger
 * /api/leagueGames/actual/gameresult/{matchup1}/{season}:
 *   get:
 *     summary: Get actual gameResultsObject from "leagueGames${season}" 
 *     parameters:
 *       - in: path
 *         name: matchup1
 *         schema:
 *           type: string
 *         required: true
 *         description: String matchup of the teams who's actual game results we are getting
 *         example: 'GSW vs. NOP'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game results we are getting
 *         example: '2015-2016' 
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueGamesArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/actual/gameresult/:matchup1/:season`, leagueGames.getActualGameResultsByMatchupBySeason);

 /** 
 * @swagger
 * /api/leagueGames/teamabbreviation/{team_name}:
 *   get:
 *     summary: Get team abbreviation from "leagueGames${season}" by team_name 
 *     parameters:
 *       - in: path
 *         name: team_name
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the team who's abbreviation we are getting
 *         example: 'Golden State Warriors'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamAbbreviationArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/teamabbreviation/:team_name`, leagueGames.getAbbreviationFromTeamName);

 /** 
 * @swagger
 * /api/leagueGames/testing/previousgame/gameid/{season}/{teamId}/{gamedate}:
 *   get:
 *     summary: Get game_id by team_id, gamedate from leagueGames${season}
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game_id we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: string
 *         required: true
 *         description: String teamId of the game_id we are getting
 *         example: '1610612744'
 *       - in: path
 *         name: gamedate
 *         schema:
 *           type: string
 *         required: true
 *         description: String gamedate of the game_id we are getting
 *         example: '2015-10-27'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameIdArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/testing/previousgame/gameid/:season/:teamId/:gamedate`, leagueGames.getPreviousGameIdBySeasonByTeamByGameDate);

router.get(`/frontSchedule/:season`, leagueGames.getFrontSchedule)

module.exports = router;
