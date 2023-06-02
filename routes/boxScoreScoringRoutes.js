const express = require('express');
const router = express.Router();
const boxScoreScoring = require('../services/boxScoreScoringQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     BoxScoreScoringArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreScoringObject'
 *     BoxScoreScoringObject:
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
 *         pct_fga_2pt:
 *           type: 'string'
 *         pct_fga_3pt:
 *           type: 'string'
 *         pct_pts_2pt:
 *           type: 'string'
 *         pct_pts_2pt_mr:
 *           type: 'string'
 *         pct_pts_3pt:
 *           type: 'string'
 *         pct_pts_fb:
 *           type: 'string'
 *         pct_pts_ft:
 *           type: 'string'
 *         pct_pts_off_tov:
 *           type: 'string'
 *         pct_pts_paint:
 *           type: 'string'
 *         pct_ast_2pm:
 *           type: 'string'
 *         pct_uast_2pm:
 *           type: 'string'
 *         pct_ast_3pm:
 *           type: 'string'
 *         pct_uast_3pm:
 *           type: 'string'
 *         pct_ast_fgm:
 *           type: 'string'
 *         pct_uast_fgm:
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
 *         PCT_FGA_2PT: "0.625"
 *         PCT_FGA_3PT: "0.375"
 *         PCT_PTS_2PT: "0.462"
 *         PCT_PTS_2PT_MR: "0.154"
 *         PCT_PTS_3PT: "0.462"
 *         PCT_PTS_FB: "0.231"
 *         PCT_PTS_FT: "0.077"
 *         PCT_PTS_OFF_TOV: "0.615"
 *         PCT_PTS_PAINT: "0.308"
 *         PCT_AST_2PM: "1.0"
 *         PCT_UAST_2PM: "0.0"
 *         PCT_AST_3PM: "1.0"
 *         PCT_UAST_3PM: "0.0"
 *         PCT_AST_FGM: "1.0"
 *         PCT_UAST_FGM: "0.0"
 *     BoxScoreScoringTeamsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreScoringTeamsObject'
 *     BoxScoreScoringTeamsObject:
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
 *         pct_fga_2pt:
 *           type: 'string'
 *         pct_fga_3pt:
 *           type: 'string'
 *         pct_pts_2pt:
 *           type: 'string'
 *         pct_pts_2pt_mr:
 *           type: 'string'
 *         pct_pts_3pt:
 *           type: 'string'
 *         pct_pts_fb:
 *           type: 'string'
 *         pct_pts_ft:
 *           type: 'string'
 *         pct_pts_off_tov:
 *           type: 'string'
 *         pct_pts_paint:
 *           type: 'string'
 *         pct_ast_2pm:
 *           type: 'string'
 *         pct_uast_2pm:
 *           type: 'string'
 *         pct_ast_3pm:
 *           type: 'string'
 *         pct_uast_3pm:
 *           type: 'string'
 *         pct_ast_fgm:
 *           type: 'string'
 *         pct_uast_fgm:
 *           type: 'string'
 *       example:
 *         GAME_ID: "0021500003"
 *         TEAM_ID: "1610612740"
 *         TEAM_NAME: "Pelicans"
 *         TEAM_ABBREVIATION: "NOP"
 *         TEAM_CITY: "New Orleans"
 *         MIN: "240:00"
 *         PCT_FGA_2PT: "0.783"
 *         PCT_FGA_3PT: "0.217"
 *         PCT_PTS_2PT: "0.611"
 *         PCT_PTS_2PT_MR: "0.189"
 *         PCT_PTS_3PT: "0.189"
 *         PCT_PTS_FB: "0.189"
 *         PCT_PTS_FT: "0.2"
 *         PCT_PTS_OFF_TOV: "0.305"
 *         PCT_PTS_PAINT: "0.421"
 *         PCT_AST_2PM: "0.586"
 *         PCT_UAST_2PM: "0.414"
 *         PCT_AST_3PM: "0.667"
 *         PCT_UAST_3PM: "0.333"
 *         PCT_AST_FGM: "0.6"
 *         PCT_UAST_FGM: "0.4"
 * /api/boxScoreScoring/read/{season}:
 *   get:
 *     summary: Read Box Scores Scoring from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores scoring we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreScoringArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/read/:season', checkAuthenticated, boxScoreScoring.getBoxScoreScoringFromCSV);

/**
 * @swagger
 * /api/boxScoreScoring/{season}:
 *    post:
 *      summary: Creates a new Box Score Scoring
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Scoring season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Scoring
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreScoringObject'
 *      responses:
 *        '201':
 *          description: returns created box score scoring
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreScoringObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/:season`, checkAuthenticated, boxScoreScoring.createBoxScoreScoring);

/**
 * @swagger
 * /api/boxScoreScoring/teams/read/{season}:
 *   get:
 *     summary: Read Box Scores Scoring Teams from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores scoring teams we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreScoringTeamsArray'
 *       '403':
 *         description: Not Authorized
 */
router.get('/teams/read/:season', checkAuthenticated, boxScoreScoring.getBoxScoreScoringTeamsFromCSV);


/**
 * @swagger
 * /api/boxScoreScoring/teams/{season}:
 *    post:
 *      summary: Creates a new Box Score Scoring Teams
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: Box Score Scoring Teams season to post to
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new Box Score Scoring Teams
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreScoringTeamsObject'
 *      responses:
 *        '201':
 *          description: returns created box score scoring teams
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BoxScoreScoringTeamsObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post(`/teams/:season`, checkAuthenticated, boxScoreScoring.createBoxScoreScoringTeams);

module.exports = router;
