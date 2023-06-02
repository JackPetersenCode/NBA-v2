const express = require('express');
const router = express.Router();
const boxScoreMisc = require('../services/boxScoreMiscQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     BoxScoreMiscArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreMiscObject'
 *     BoxScoreMiscObject:
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
 *         pts_off_tov:
 *           type: 'string'
 *         pts_2nd_chance:
 *           type: 'string'
 *         pts_fb:
 *           type: 'string'
 *         pts_paint:
 *           type: 'string'
 *         opp_pts_off_tov:
 *           type: 'string'
 *         opp_pts_2nd_chance:
 *           type: 'string'
 *         opp_pts_fb:
 *           type: 'string'
 *         opp_pts_paint:
 *           type: 'string'
 *         blk:
 *           type: 'string'
 *         blka:
 *           type: 'string'
 *         pf:
 *           type: 'string'
 *         pfd:
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
 *         PTS_OFF_TOV: "8"
 *         PTS_2ND_CHANCE: "2"
 *         PTS_FB: "3"
 *         PTS_PAINT: "4"
 *         OPP_PTS_OFF_TOV: "16"
 *         OPP_PTS_2ND_CHANCE: "9"
 *         OPP_PTS_FB: "11"
 *         OPP_PTS_PAINT: "36"
 *         BLK: "0"
 *         BLKA: "1"
 *         PF: "2"
 *         PFD: "1"
 *     BoxScoreMiscTeamsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreMiscTeamsObject'
 *     BoxScoreMiscTeamsObject:
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
 *         pts_off_tov:
 *           type: 'string'
 *         pts_2nd_chance:
 *           type: 'string'
 *         pts_fb:
 *           type: 'string'
 *         pts_paint:
 *           type: 'string'
 *         opp_pts_off_tov:
 *           type: 'string'
 *         opp_pts_2nd_chance:
 *           type: 'string'
 *         opp_pts_fb:
 *           type: 'string'
 *         opp_pts_paint:
 *           type: 'string'
 *         blk:
 *           type: 'string'
 *         blka:
 *           type: 'string'
 *         pf:
 *           type: 'string'
 *         pfd:
 *           type: 'string'
 *       example:
 *         GAME_ID: "0021500003"
 *         TEAM_ID: "1610612740"
 *         TEAM_NAME: "Pelicans"
 *         TEAM_ABBREVIATION: "NOP"
 *         TEAM_CITY: "New Orleans"
 *         MIN: "26:31"
 *         PTS_OFF_TOV: "8"
 *         PTS_2ND_CHANCE: "2"
 *         PTS_FB: "3"
 *         PTS_PAINT: "4"
 *         OPP_PTS_OFF_TOV: "16"
 *         OPP_PTS_2ND_CHANCE: "9"
 *         OPP_PTS_FB: "11"
 *         OPP_PTS_PAINT: "36"
 *         BLK: "0"
 *         BLKA: "1"
 *         PF: "2"
 *         PFD: "1"
 * /api/boxScoreMisc/read/{season}:
 *   get:
 *     summary: Read Box Scores Misc from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores misc we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreMiscArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, boxScoreMisc.getBoxScoreMiscFromCSV);

/**
 * @swagger
 * /api/boxScoreMisc/{season}:
 *    post:
 *      summary: Creates a new Box Score Misc
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Misc season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Misc
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreMiscObject'
 *      responses:
 *        '201':
 *          description: returns created box score misc
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreMiscObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, boxScoreMisc.createBoxScoreMisc);
/**
 * @swagger
 * /api/boxScoreMisc/teams/read/{season}:
 *   get:
 *     summary: Read Box Scores Misc Teams from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores misc teams we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreMiscTeamsArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/teams/read/:season', checkAuthenticated, boxScoreMisc.getBoxScoreMiscTeamsFromCSV);


/**
 * @swagger
 * /api/boxScoreMisc/teams/{season}:
 *    post:
 *      summary: Creates a new Box Score Misc Teams
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Misc Teams season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Misc Teams
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreMiscTeamsObject'
 *      responses:
 *        '201':
 *          description: returns created box score misc teams
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreMiscTeamsObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/teams/:season`, checkAuthenticated, boxScoreMisc.createBoxScoreMiscTeams);

module.exports = router;