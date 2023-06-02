const express = require('express');
const router = express.Router();
const fourFactors = require('../services/fourFactorsQueries');

const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     FourFactorsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/FourFactorsObject'
 *     FourFactorsObject:
 *       type: 'object'
 *       properties:
 *         game_id:
 *           type: 'string'
 *         team_id:
 *           type: 'string'
 *         team_abbreviation:
 *           type: 'string'
 *         team_city:
 *           type: 'string'
 *         player_id:
 *           type: 'string'
 *         player_name:
 *           type: 'string'
 *         nickname:
 *           type: 'string'
 *         start_position:
 *           type: 'string'
 *         comment:
 *           type: 'string'
 *         min:
 *           type: 'string'
 *         efg_pct:
 *           type: 'string'
 *         fta_rate:
 *           type: 'string'
 *         tm_tov_pct:
 *           type: 'string'
 *         oreb_pct:
 *           type: 'string'
 *         opp_efg_pct:
 *           type: 'string'
 *         opp_fta_rate:
 *           type: 'string'
 *         opp_tov_pct:
 *           type: 'string'
 *         opp_oreb_pct:
 *           type: 'string'
 *       example:
 *         GAME_ID: "0021500003"
 *         TEAM_ID: "1610612740"
 *         TEAM_ABBREVIATION: "NOP"
 *         TEAM_CITY: "New Orleans"
 *         PLAYER_ID: "201967"
 *         PLAYER_NAME: "Dante Cunningham"
 *         NICKNAME: "Dante"
 *         START_POSITION: "F"
 *         COMMENT: ""
 *         MIN: "26:31"
 *         EFG_PCT: "0.469"
 *         FTA_RATE: "0.347"
 *         TM_TOV_PCT: "0.13"
 *         OREB_PCT: "0.115"
 *         OPP_EFG_PCT: "0.585"
 *         OPP_FTA_RATE: "0.189"
 *         OPP_TOV_PCT: "0.142"
 *         OPP_OREB_PCT: "0.391"
 *     FourFactorsTeamsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/FourFactorsTeamsObject'
 *     FourFactorsTeamsObject:
 *       type: 'object'
 *       properties:
 *         game_id:
 *           type: 'string'
 *         team_id:
 *           type: 'string'
 *         team_name:
 *           type: 'string'
 *         team_abbreviation:
 *           type: 'string'
 *         team_city:
 *           type: 'string'
 *         min:
 *           type: 'string'
 *         efg_pct:
 *           type: 'string'
 *         fta_rate:
 *           type: 'string'
 *         tm_tov_pct:
 *           type: 'string'
 *         oreb_pct:
 *           type: 'string'
 *         opp_efg_pct:
 *           type: 'string'
 *         opp_fta_rate:
 *           type: 'string'
 *         opp_tov_pct:
 *           type: 'string'
 *         opp_oreb_pct:
 *           type: 'string'
 *       example:
 *         GAME_ID: "0021500003"
 *         TEAM_ID: "1610612740"
 *         TEAM_NAME: "Pelicans"
 *         TEAM_ABBREVIATION: "NOP"
 *         TEAM_CITY: "New Orleans"
 *         MIN: "240:00"
 *         EFG_PCT: "0.458"
 *         FTA_RATE: "0.325"
 *         TM_TOV_PCT: "0.179"
 *         OREB_PCT: "0.157"
 *         OPP_EFG_PCT: "0.474"
 *         OPP_FTA_RATE: "0.229"
 *         OPP_TOV_PCT: "0.191"
 *         OPP_OREB_PCT: "0.446"
 * /api/fourFactors/read/{season}:
 *   get:
 *     summary: Read Box Scores Four Factors from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores four factors we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, fourFactors.getBoxScoreFourFactorsFromCSV);

/**
 * @swagger
 * /api/fourFactors/{season}:
 *    post:
 *      summary: Creates a new Box Score Four Factors
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Four Factors season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Four Factors
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsObject'
 *      responses:
 *        '201':
 *          description: returns created box score four factors
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FourFactorsObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, fourFactors.createBoxScoreFourFactors);

/**
 * @swagger
 * /api/fourFactors/teams/read/{season}:
 *   get:
 *     summary: Read Box Scores Four Factors Teams from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores four factors teams we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsTeamsArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/teams/read/:season', checkAuthenticated, fourFactors.getBoxScoreFourFactorsTeamsFromCSV);

/**
 * @swagger
 * /api/fourFactors/teams/{season}:
 *    post:
 *      summary: Creates a new Box Score Four Factors Teams
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Four Factors Teams season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Four Factors Teams
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsTeamsObject'
 *      responses:
 *        '201':
 *          description: returns created box score four factors teams
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FourFactorsTeamsObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/teams/:season`, checkAuthenticated, fourFactors.createBoxScoreFourFactorsTeams);

 /** 
 * @swagger
 * /api/fourFactors/home/{playerid}/{season}:
 *   get:
 *     summary: Get Home Box Scores Four Factors by player season
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores four factors we are getting
 *         example: '201967'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores four factors we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsObject'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/home/:playerid/:season`, fourFactors.getBoxScoreFourFactorsVisitor);


 /** 
 * @swagger
 * /api/fourFactors/visitor/{playerid}/{season}:
 *   get:
 *     summary: Get Visitor Box Scores Four Factors by player season
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the player who's box scores four factors we are getting
 *         example: '201967'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores four factors we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FourFactorsObject'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/visitor/:playerid/:season`, fourFactors.getBoxScoreFourFactorsHome);

module.exports = router;