const express = require('express');
const router = express.Router();
const dashPlayerClutch = require('../services/leagueDashPlayerClutchQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     LeagueDashPlayerClutchReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguedashplayerclutch'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     LeagueDashPlayerClutchArray:
 *       type: 'array'
 *       example: [
 *                  "Players",
 *                  201166,
 *                  "Aaron Brooks",
 *                  "Aaron",
 *                  1610612741,
 *                  "CHI",
 *                  31,
 *                  12,
 *                  6,
 *                  6,
 *                  0.5,
 *                  36.70333333333333,
 *                  8,
 *                  15,
 *                  0.533,
 *                  2,
 *                  9,
 *                  0.222,
 *                  4,
 *                  6,
 *                  0.667,
 *                  1,
 *                  4,
 *                  5,
 *                  3,
 *                  3,
 *                  1,
 *                  0,
 *                  0,
 *                  7,
 *                  3,
 *                  22,
 *                  2,
 *                  32.5,
 *                  0,
 *                  0,
 *                  34,
 *                  257,
 *                  235,
 *                  174,
 *                  188,
 *                  221,
 *                  138,
 *                  163,
 *                  86,
 *                  105,
 *                  101,
 *                  162,
 *                  177,
 *                  167,
 *                  211,
 *                  196,
 *                  212,
 *                  222,
 *                  143,
 *                  119,
 *                  149,
 *                  200,
 *                  1,
 *                  258,
 *                  192,
 *                  157,
 *                  168,
 *                  195,
 *                  190,
 *                  13,
 *                  186,
 *                  1,
 *                  "201166,1610612741"
 *               ]
 * /api/leagueDashPlayerClutch/read/{season}:
 *   get:
 *     summary: Read League Dash Player Clutch from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league dash player clutch we are reading
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerClutchReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, dashPlayerClutch.getLeagueDashPlayerClutchFromJson);

/**
 * @swagger
 * /api/leagueDashPlayerClutch/{season}:
 *    post:
 *      summary: Creates a new league dash player clutch row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league dash player clutch we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league dash player clutch
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashPlayerClutchArray'
 *      responses:
 *        '201':
 *          description: returns created league dash player clutch array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueDashPlayerClutchArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, dashPlayerClutch.createLeagueDashPlayerClutch);

module.exports = router;