const express = require('express');
const router = express.Router();
const dashOppPtShot = require('../services/leagueDashOppShotQueries');
const { checkAuthenticated } = require('./userRouter');

/**
 * @swagger
 * components:
 *   schemas:
 *     LeagueDashOppPtShotReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'leaguedashoppptshot'
 *         parameters: {"PerMode": "Totals", "LeagueId": null}
 *         resultSets: ['stats go here']
 *     LeagueDashOppPtShotArray:
 *       type: 'array'
 *       example: [
 *                  1610612741,
 *                  "Chicago Bulls",
 *                  "CHI",
 *                  82,
 *                  82,
 *                  1,
 *                  3233,
 *                  6862,
 *                  0.471,
 *                  0.519,
 *                  0.728,
 *                  2583,
 *                  4995,
 *                  0.517,
 *                  0.272,
 *                  650,
 *                  1867,
 *                  0.348
 *               ]
 * /api/leagueDashOppPtShot/read/{season}:
 *   get:
 *     summary: Read League Dash Opp Pt Shot from CSV
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
 *               $ref: '#/components/schemas/LeagueDashOppPtShotReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, dashOppPtShot.getLeagueDashOppPtShotFromJson);


/**
 * @swagger
 * /api/leagueDashOppPtShot/{season}:
 *    post:
 *      summary: Creates a new league dash opp pt shot row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the league dash opp pt shot we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new league dash opp pt shot
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueDashOppPtShotArray'
 *      responses:
 *        '201':
 *          description: returns created league dash opp pt shot array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeagueDashOppPtShotArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, dashOppPtShot.createLeagueDashOppPtShot);

module.exports = router;