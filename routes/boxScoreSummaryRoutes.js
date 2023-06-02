const express = require('express');
const router = express.Router();
const boxScoreSummary = require('../services/boxScoreSummaryQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     CountArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/CountObject'
 *     CountObject:
 *       type: 'object'
 *       properties:
 *         count:
 *           type: 'string'
 *       example:
 *         count: '41'
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
 *         game_id: '0021500445' 
 *     BoxScoreSummaryArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreSummaryObject'
 *     BoxScoreSummaryObject:
 *       type: 'object'
 *       properties:
 *         game_date_est:
 *           type: 'string'
 *         game_sequence:
 *           type: 'string'
 *         game_id:
 *           type: 'string'
 *         game_status_id:
 *           type: 'string'
 *         game_status_text:
 *           type: 'string'
 *         gamecode:
 *           type: 'string'
 *         home_team_id:
 *           type: 'string'
 *         visitor_team_id:
 *           type: 'string'
 *         season:
 *           type: 'string'
 *         live_period:
 *           type: 'string'
 *         live_pc_time:
 *           type: 'string'
 *         natl_tv_broadcaster_abbreviation:
 *           type: 'string'
 *         live_period_time_bcast:
 *           type: 'string'
 *         wh_status:
 *           type: 'string'
 *       example:
 *         GAME_DATE_EST: "2015-10-27T00:00:00"
 *         GAME_SEQUENCE: "3"
 *         GAME_ID: "0021500003"
 *         GAME_STATUS_ID: "3"
 *         GAME_STATUS_TEXT: "Final"
 *         GAMECODE: "20151027/NOPGSW"
 *         HOME_TEAM_ID: "1610612744"
 *         VISITOR_TEAM_ID: "1610612740"
 *         SEASON: "2015"
 *         LIVE_PERIOD: "4"
 *         LIVE_PC_TIME: ""
 *         NATL_TV_BROADCASTER_ABBREVIATION: "TNT"
 *         LIVE_PERIOD_TIME_BCAST: "Q4  - TNT"
 *         WH_STATUS: "1"
 * /api/boxScoreSummary/read/{season}:
 *   get:
 *     summary: Read Box Scores Summary from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores summary we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreSummaryArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, boxScoreSummary.getBoxScoreSummaryFromCSV);

/**
 * @swagger
 * /api/boxScoreSummary/{season}:
 *    post:
 *      summary: Creates a new Box Score Summary
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Summary season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Summary
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreSummaryObject'
 *      responses:
 *        '201':
 *          description: returns created box score summary
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreSummaryObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, boxScoreSummary.createBoxScoreSummary);

router.get(`/teamname/:teamId`, boxScoreSummary.getTeamNameFromTeamId);
//router.get(`/boxscoresummary/:season`, boxScoreSummary.createBoxScoreSummary);

/**
 * @swagger
 * /api/boxScoreSummary/home/gameids/{season}/{teamid}:
 *   get:
 *     summary: Get array of home game_id's of team in given season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game_id's we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: teamid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's game_id's we are getting
 *         example: '1610612740'
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
router.get(`/home/gameids/:season/:team_id`, boxScoreSummary.getHomeGameIdsBySeason);

/**
 * @swagger
 * /api/boxScoreSummary/visitor/gameids/{season}/{teamid}:
 *   get:
 *     summary: Get array of visitor game_id's of team in given season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the game_id's we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: teamid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's game_id's we are getting
 *         example: '1610612740'
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
router.get(`/visitor/gameids/:season/:team_id`, boxScoreSummary.getVisitorGameIdsBySeason);

/**
 * @swagger
 * /api/boxScoreSummary/lengthofseason/{season}/{teamid}/{H_or_V}:
 *   get:
 *     summary: Get array of length 1 containing object with property count of team's home or visitor games in given season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the count we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: teamid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's count of games we are getting
 *         example: '1610612740'
 *       - in: path
 *         name: H_or_V
 *         schema:
 *           type: string
 *         required: true
 *         description: String 'home' or 'visitor' of the team who's count of games we are getting
 *         example: 'home'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/lengthofseason/:season/:teamid/:H_or_V`, boxScoreSummary.getLengthOfSeason);

module.exports = router;