const express = require('express');
const router = express.Router();
const dashLineups = require('../services/leagueDashLineupsQueries');

const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     LeagueDashLineupsReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguedashlineups'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     LeagueDashLineupsArray:
 *       type: 'array'
 *       example: [
 *                   "Lineups",
 *                   "-101141-202694-202704-203083-203484-",
 *                   "E. Ilyasova - M. Morris - R. Jackson - A. Drummond - K. Caldwell-Pope",
 *                   1610612765,
 *                   "DET",
 *                   48,
 *                   25,
 *                   23,
 *                   0.521,
 *                   914.8033333333333,
 *                   748,
 *                   1688,
 *                   0.443,
 *                   155,
 *                   440,
 *                   0.352,
 *                   276,
 *                   437,
 *                   0.632,
 *                   279,
 *                   609,
 *                   888,
 *                   360,
 *                   249,
 *                   149,
 *                   60,
 *                   95,
 *                   308,
 *                   393,
 *                   1927,
 *                   71,
 *                   10,
 *                   20,
 *                   12775,
 *                   5167,
 *                   1,
 *                   2,
 *                   1,
 *                   5931,
 *                   3,
 *                   2,
 *                   3847,
 *                   3,
 *                   1,
 *                   5307,
 *                   1,
 *                   3,
 *                   1,
 *                   5,
 *                   12784,
 *                   2,
 *                   9,
 *                   12786,
 *                   12785,
 *                   1,
 *                   2,
 *                   20
 *               ]
 * /api/leagueDashLineups/read/{season}:
 *   get:
 *     summary: Read League Dash Lineups from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the league dash opp pt shot we are reading
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashLineupsReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', dashLineups.getLeagueDashLineupsFromJson);


/**
 * @swagger
 * /api/leagueDashLineups/{season}:
 *    post:
 *      summary: Creates a new league dash lineups row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league dash lineups we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league dash lineups
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashLineupsArray'
 *      responses:
 *        '201':
 *          description: returns created league dash lineups array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueDashLineupsArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, dashLineups.createLeagueDashLineups);

module.exports = router;