const express = require('express');
const router = express.Router();
const boxServices = require('../services/boxServices');
const { checkAuthenticated } = require('./userRouter');

/**
 * @swagger
 * components:
 *   schemas:
 *     BoxScoreAdvancedArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/BoxScoreAdvancedObject'
 *     BoxScoreAdvancedObject:
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
 *         e_off_rating:
 *           type: 'string'
 *         off_rating:
 *           type: 'string'
 *         e_def_rating:
 *           type: 'string'
 *         def_rating:
 *           type: 'string'
 *         e_net_rating:
 *           type: 'string'
 *         net_rating:
 *           type: 'string'
 *         ast_pct:
 *           type: 'string'
 *         ast_tov:
 *           type: 'string'
 *         ast_ratio:
 *           type: 'string'
 *         oreb_pct:
 *           type: 'string'
 *         dreb_pct:
 *           type: 'string'
 *         reb_pct:
 *           type: 'string'
 *         tm_tov_pct:
 *           type: 'string'
 *         efg_pct:
 *           type: 'string'
 *         ts_pct:
 *           type: 'string'
 *         usg_pct:
 *           type: 'string'
 *         e_usg_pct:
 *           type: 'string'
 *         e_pace:
 *           type: 'string'
 *         pace:
 *           type: 'string'
 *         pace_per40:
 *           type: 'string'
 *         poss:
 *           type: 'string'
 *         pie:
 *           type: 'string'
 *       example:
 *         game_id: '0021500003'
 *         team_id: '1610612744'
 *         team_abbreviation: GSW
 *         team_city: Golden State
 *         player_id: '203110'
 *         player_name: Draymond Green
 *         nickname: Draymond
 *         start_position: F
 *         comment: something about player health usually
 *         min: 29:26
 *         e_off_rating: '119.5'
 *         off_rating: '120.6'
 *         e_def_rating: '85.9'
 *         def_rating: '88.9'
 *         e_net_rating: '33.6'
 *         net_rating: '31.7'
 *         ast_pct: '0.08'
 *         ast_tov: '2.0'
 *         ast_ratio: '12.5'
 *         oreb_pct: '0.086'
 *         dreb_pct: '0.192'
 *         reb_pct: '0.131'
 *         tm_tov_pct: '6.3'
 *         efg_pct: '0.333'
 *         ts_pct: '0.388'
 *         usg_pct: '0.182'
 *         e_usg_pct: '0.18'
 *         e_pace: '104.99'
 *         pace: '102.74'
 *         pace_per40: '85.62'
 *         poss: '63'
 *         pie: '0.046'
 * /api/box/{season}:
 *   post:
 *     summary: Create a Box Score Advanced
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box score advanced we are creating
 *         example: '2015-2016'
 *     requestBody:
 *       description: Data for new Box Score Traditional
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/BoxScoreAdvancedObject'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreAdvancedArray'
 *       '403':
 *         description: Not Authorized
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.post('/:season', checkAuthenticated, boxServices.createBoxScores);

 /** 
 * @swagger
 * /api/box/read/{season}:
 *   get:
 *     summary: Read Box Scores Advanced from CSV
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are reading
 *         example: '2015-2016'
 *     responses:
 *       '201':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoxScoreAdvancedArray'
 *       '403':
 *         description: Not Authorized
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/read/:season', checkAuthenticated, boxServices.boxScoreLoad);

module.exports = router;