const express = require('express');
const router = express.Router();
const hustleStats = require('../services/hustleStatsQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     PlayersNBAArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayersNBAObject'
 *     PlayersNBAObject:
 *       type: 'object'
 *       properties:
 *         full_name:
 *           type: 'string'
 *         first_name:
 *           type: 'string'
 *         last_name:
 *           type: 'string'
 *         is_active:
 *           type: 'string'
 *         playerid:
 *           type: 'string'
 *       example:
 *         full_name: "Draymond Green"
 *         first_name: "Draymond"
 *         last_name: "Green"
 *         is_active: "true"
 *         playerid: "203110"
 *     HustleArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/HustleObject'
 *     HustleObject:
 *       type: 'object'
 *       properties:
 *         player:
 *           type: 'object'
 *           items:
 *             $ref: '#/components/schemas/PlayersNBAArray'
 *         hustlePts:
 *           type: 'string'
 *         season:
 *           type: 'string'
 *       example:
 *         player: [{"full_name": "Draymond Green", "first_name": "Draymond", "last_name": "Green", "is_active": "true", "playerid": "203110"}]
 *         hustlePts: '3.81'
 *         season: '2015-2016'
 *     LeagueHustleArray:
 *       type: 'array'
 *       example: [201143,"Al Horford",1610612737,"ATL",30,82,2631,25,22,3,3,0,6,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 *     LeagueHustleReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguehustlestatsplayer'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     HustleResponseArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/HustleResponseObject'
 *     HustleResponseObject:
 *       type: 'object'
 *       properties:
 *         firstname:
 *           type: 'string'
 *         lastname:
 *           type: 'string'
 *         carmelopts:
 *           type: 'string'
 *       example:
 *         firstname: 'Nate'
 *         lastname: 'Robinson'
 *         hustlepts: '-1.82'
 * /api/hustleStats:
 *    post:
 *      summary: Creates a new hustle stats player row in database
 *      requestBody:
 *        description: Data for new hustle stats player
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/HustleObject'
 *      responses:
 *        '201':
 *          description: returns created hustleObject
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HustleObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/', checkAuthenticated, hustleStats.createPlayerHustlePoints);

/**
 * @swagger
 * /api/hustleStats/getLocalHustlePointsInSeason/{season}:
 *   get:
 *     summary: Get All Hustle Pts Players by season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the hustle pts we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HustleResponseArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/getLocalHustlePointsInSeason/:season', hustleStats.getAllFirstLastHustlePointsInSeason);

/**
 * @swagger
 * /api/hustleStats/{season}:
 *    post:
 *      summary: Creates a new league hustle stats player row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league hustle stats we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league hustle stats player
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueHustleArray'
 *      responses:
 *        '201':
 *          description: returns created league hustle array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueHustleArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', checkAuthenticated, hustleStats.createLeagueHustleStatsBySeason);

/**
 * @swagger
 * /api/hustleStats/leaguehustlestats/{season}:
 *   get:
 *     summary: Read League Hustle Stats from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league hustle stats we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueHustleReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/leaguehustlestats/:season', checkAuthenticated, hustleStats.getLeagueHustleStatsBySeason);

module.exports = router;
