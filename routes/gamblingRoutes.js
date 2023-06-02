const express = require('express');
const router = express.Router();
const gambling = require('../services/gamblingQueries');
const { checkAuthenticated } = require('./userRouter');

/**
 * @swagger
 * components:
 *   schemas:
 *     MoneylineArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/MoneylineObject'
 *     MoneylineObject:
 *       type: 'object'
 *       properties:
 *         ml:
 *           type: 'string'
 *       example:
 *         ml: '-175'
 *     OddsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/OddsObject'
 *     OddsObject:
 *       type: 'object'
 *       properties:
 *         count:
 *           type: 'string'
 *       example:
 *         "Date\tRot\tVH\tTeam\t1st\t2nd\t3rd\t4th\tFinal\tOpen\tClose\tML\t2H": "1027\t501\tV\tCleveland\t17\t23\t28\t27\t95\t197.5\t198.5\t160\t97"
 * /api/gambling/odds/{season}:
 *   get:
 *     summary: Read Gambling Odds from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the odds we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OddsArray'
 *       '403':
 *         description: Not Authorized
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */

router.get('/odds/:season', checkAuthenticated, gambling.getOddsFromCSV);

router.post('/odds/:season', gambling.createOddsBySeason);

router.get('/newOdds/:season', gambling.getNewOddsFromCSV)

router.post('/newOdds/:season', gambling.createNewOddsBySeason);

router.get('/upcominggames/:season', gambling.getUpcomingGames);

router.post('/matchupResults/:season', gambling.createMatchupResults);

router.post(`/jackorithm/:season`, gambling.createExpected);

router.get('/winPct/:season', gambling.getWinPercentage);

router.get('/winPctByTeam/:team/:season', gambling.getWinPercentageByTeam);

router.get('/winPctOverall', gambling.getWinPercentageOverall)

/**
 * @swagger
 * /api/gambling/moneyline/home/{season}/{homeTeam}/{gamedate}:
 *   get:
 *     summary: Get moneyline of home team of game corresponding to gamedate
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the moneyline we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: homeTeam
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the team who's odds we are getting
 *         example: 'GoldenState'
 *       - in: path
 *         name: gamedate
 *         schema:
 *           type: string
 *         required: true
 *         description: String date of the game we are seeking the moneyline for
 *         example: '619'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoneylineArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/moneyline/home/:season/:homeTeam/:gamedate`, gambling.getHomeMoneyline);

router.get(`/newOdds/:season/:team/:gamedate/:H_or_V`, gambling.getNewOddsByGameByTeam);

router.get(`/historicalResults/:season`, gambling.getHistoricalResults);

router.get(`/historicalResults/ByTeam/:team/:season`, gambling.getHistoricalResultsByTeam);

/**
 * @swagger
 * /api/gambling/moneyline/visitor/{season}/{visitorTeam}/{gamedate}:
 *   get:
 *     summary: Get moneyline of visitor team of game corresponding to gamedate
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the moneyline we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: visitorTeam
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the team who's odds we are getting
 *         example: 'Cleveland'
 *       - in: path
 *         name: gamedate
 *         schema:
 *           type: string
 *         required: true
 *         description: String date of the game we are seeking the moneyline for
 *         example: '619'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoneylineArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/moneyline/visitor/:season/:visitorTeam/:gamedate`, gambling.getVisitorMoneyline);

module.exports = router;