const express = require('express');
const router = express.Router();
const boxScoreTraditional = require('../services/boxscorestraditionalQueries');
const { checkAuthenticated } = require('./userRouter');
/**
 * @swagger
 * components:
 *   schemas:
 *     BoxScoreTraditionalArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *     BoxNumCountArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxNumCountObject'
 *     BoxNumCountObject:
 *       type: 'object'
 *       properties:
 *         count:
 *           type: 'string'
 *       example:
 *         count: '2'
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
 *         game_id: '0021501227'   
 *     BoxScoreTraditionalObject:
 *       type: 'object'
 *       properties:
 *         GAME_ID:
 *           type: 'string'
 *         TEAM_ID:
 *           type: 'string'
 *         TEAM_ABBREVIATION:
 *           type: 'string'
 *         TEAM_CITY:
 *           type: 'string'
 *         PLAYER_ID:
 *           type: 'string'
 *         PLAYER_NAME:
 *           type: 'string'
 *         NICKNAME:
 *           type: 'string'
 *         START_POSITION:
 *           type: 'string'
 *         COMMENT:
 *           type: 'string'
 *         MIN:
 *           type: 'string'
 *         FGM:
 *           type: 'string'
 *         FGA:
 *           type: 'string'
 *         FG_PCT:
 *           type: 'string'
 *         FG3M:
 *           type: 'string'
 *         FG3A:
 *           type: 'string'
 *         FG3_PCT:
 *           type: 'string'
 *         FTM:
 *           type: 'string'
 *         FTA:
 *           type: 'string'
 *         FT_PCT:
 *           type: 'string'
 *         OREB:
 *           type: 'string'
 *         DREB:
 *           type: 'string'
 *         REB:
 *           type: 'string'
 *         AST:
 *           type: 'string'
 *         STL:
 *           type: 'string'
 *         BLK:
 *           type: 'string'
 *         TO:
 *           type: 'string'
 *         PF:
 *           type: 'string'
 *         PTS:
 *           type: 'string'
 *         PLUS_MINUS:
 *           type: 'string'
 *       example:
 *         GAME_ID: '0021500003'
 *         TEAM_ID: '1610612744'
 *         TEAM_ABBREVIATION: GSW
 *         TEAM_CITY: Golden State
 *         PLAYER_ID: '203110'
 *         PLAYER_NAME: Draymond Green
 *         NICKNAME: Draymond
 *         START_POSITION: F
 *         COMMENT: something about player health usually
 *         MIN: 29:26
 *         FGM: '3'
 *         FGA: '12'
 *         FG_PCT: '0.25'
 *         FG3M: '2'
 *         FG3A: '5'
 *         FG3_PCT: '0.4'
 *         FTM: '2'
 *         FTA: '2'
 *         FT_PCT: '1.0'
 *         OREB: '3'
 *         DREB: '5'
 *         REB: '8'
 *         AST: '2'
 *         STL: '1'
 *         BLK: '0'
 *         TO: '1'
 *         PF: '5'
 *         PTS: '10'
 *         PLUS_MINUS: '20.0'
 * /api/boxScoresTraditional/home/{playerid}/{season}:
 *   get:
 *     summary: Get Home Box Score Traditional by player season
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores we are getting
 *         example: '203110'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/home/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalHome);

router.get('/averages/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalAverages);

router.get('/averages/82games/:playerid/:season/:H_or_V', boxScoreTraditional.getBoxScoreTraditional82GameAveragesWholeSeason);

router.get('/averages/82games/:gameId/:playerid/:season/:H_or_V', boxScoreTraditional.getBoxScoreTraditional82GameAverages);

router.get('/previousgameid/:gameId/:season/:teamid', boxScoreTraditional.getPreviousGameIdByGameIdTeamId);

router.get(`/sumstat/:season/:teamId/:gameId/:stat`, boxScoreTraditional.getSumStat);

 /** 
 * @swagger
 * /api/boxScoresTraditional/visitor/{playerid}/{season}:
 *   get:
 *     summary: Get Visitor Box Scores Traditional by player season
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores we are getting
 *         example: '203110'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/visitor/:playerid/:season', boxScoreTraditional.getBoxScoreTraditionalVisitor);


/**
 * @swagger
 * /api/boxScoresTraditional/{season}:
 *    post:
 *      summary: Creates a new Box Score Traditional
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Traditional season to post to
 *          example: 'TEST200Rows2019-2020'
 *      requestBody:
 *        description: Data for new Box Score Traditional
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *      responses:
 *        '201':
 *          description: returns created box score traditional
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreTraditionalObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', checkAuthenticated, boxScoreTraditional.createBoxScoresTraditional);

 /** 
 * @swagger
 * /api/boxScoresTraditional/read/{season}:
 *   get:
 *     summary: Read Box Scores Traditional from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalArray'
 *       '403':
 *         description: Not Authorized
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/read/:season', checkAuthenticated, boxScoreTraditional.boxScoreTraditionalLoad);

 /** 
 * @swagger
 * /api/boxScoresTraditional/{playerid}/{season}:
 *   get:
 *     summary: Get Box Scores Traditional by player season
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores we are getting
 *         example: '203110'    
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/:playerid/:season`, boxScoreTraditional.getBoxScorePlayer);

 /** 
 * @swagger
 * /api/boxScoresTraditional/{season}/{gameid}/{playerid}:
 *   get:
 *     summary: Get Box Score Traditional by game player season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016'   
 *       - in: path
 *         name: gameid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the game we are getting
 *         example: '0021500003'
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores we are getting
 *         example: '203110'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreTraditionalArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/:season/:gameid/:playerid', boxScoreTraditional.getBoxScoresTraditional);


 /** 
 * @swagger
 * /api/boxScoresTraditional/boxnum/{gameid}/{season}/{teamid}/{H_or_V}:
 *   get:
 *     summary: Get number of home or visitor games played by team up until date of gameid in given season
 *     parameters:  
 *       - in: path
 *         name: gameid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the game we are getting
 *         example: '0021500069'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016' 
 *       - in: path
 *         name: teamid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's box scores we are getting
 *         example: '1610612744'
 *       - in: path
 *         name: H_or_V
 *         schema:
 *           type: string
 *         required: true
 *         description: Either 'home' or 'visitor'
 *         example: 'home'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxNumCountArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/boxnum/:gameid/:season/:teamid/:H_or_V`, boxScoreTraditional.getBoxNumFromGameIdSeason)

router.get(`/jackarithm/home/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalHome);

router.get(`/jackarithm/visitor/:playerid/:season`, boxScoreTraditional.getBoxScoreTraditionalVisitor);


 /** 
 * @swagger
 * /api/boxScoresTraditional/previousgame/gameid/{season}/{teamId}:
 *   get:
 *     summary: Get previous game played gameid of team from "boxscorestraditional${season}" 
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016' 
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's box scores we are getting
 *         example: '1610612744'
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
router.get(`/previousgame/gameid/:season/:teamId`, boxScoreTraditional.getPreviousGameIdBySeasonByTeam);

module.exports = router;