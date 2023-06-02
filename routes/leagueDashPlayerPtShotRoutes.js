const express = require('express');
const router = express.Router();
const dashPlayerPtShot = require('../services/leagueDashPlayerPtShotQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     LeagueDashPlayerPtShotReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguedashplayerptshot'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     LeagueDashPlayerPtShotArray:
 *       type: 'array'
 *       example: [
 *                  201939,
 *                  "Stephen Curry",
 *                  1610612744,
 *                  "GSW",
 *                  28,
 *                  79,
 *                  79,
 *                  1,
 *                  805,
 *                  1546,
 *                  0.521,
 *                  0.651,
 *                  0.429,
 *                  403,
 *                  664,
 *                  0.607,
 *                  0.571,
 *                  402,
 *                  882,
 *                  0.456
 *               ]
 *     LeagueDashPlayerShotLocationsReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguedashplayershotlocations'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     LeagueDashPlayerShotLocationsArray:
 *       type: 'array'
 *       example: [
 *                  201166,
 *                  "Aaron Brooks",
 *                  1610612741,
 *                  "CHI",
 *                  31,
 *                  "Aaron",
 *                  58,
 *                  123,
 *                  0.472,
 *                  34,
 *                  84,
 *                  0.405,
 *                  30,
 *                  77,
 *                  0.39,
 *                  1,
 *                  6,
 *                  0.167,
 *                  5,
 *                  10,
 *                  0.5,
 *                  60,
 *                  165,
 *                  0.364,
 *                  0,
 *                  4,
 *                  0,
 *                  6,
 *                  16,
 *                  0.375
 *                ]
 * /api/leagueDashPlayerPtShot/read/{season}:
 *   get:
 *     summary: Read League Dash Player Pt Shot from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league dash player pt shot we are reading
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerPtShotReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, dashPlayerPtShot.getLeagueDashPlayerPtShotFromJson);

/**
 * @swagger
 * /api/leagueDashPlayerPtShot/{season}:
 *    post:
 *      summary: Creates a new league dash player pt shot row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league dash player pt shot we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league dash player pt shot
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerPtShotArray'
 *      responses:
 *        '201':
 *          description: returns created league dash player pt shot array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueDashPlayerPtShotArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, dashPlayerPtShot.createLeagueDashPlayerPtShot);


/**
 * @swagger
 * /api/leagueDashPlayerPtShot/read/leaguedashplayershotlocations/{season}:
 *   get:
 *     summary: Read League Dash Player shot locations from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league dash player shot locations we are reading
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerShotLocationsReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/leaguedashplayershotlocations/:season', checkAuthenticated, dashPlayerPtShot.getLeagueDashPlayerShotLocationsFromJson);

/**
 * @swagger
 * /api/leagueDashPlayerPtShot/leaguedashplayershotlocations/{season}:
 *    post:
 *      summary: Creates a new league dash player shot locations row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league dash player shot locations we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league dash player shot locations
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerShotLocationsArray'
 *      responses:
 *        '201':
 *          description: returns created league dash player shot locations array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueDashPlayerShotLocationsArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/leaguedashplayershotlocations/:season`, checkAuthenticated, dashPlayerPtShot.createLeagueDashPlayerShotLocations);

module.exports = router;