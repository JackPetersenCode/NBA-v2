const express = require('express');
const router = express.Router();
const shots = require('../services/shotsQueries');
const { checkAuthenticated } = require('./userRouter');

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamAbbreviationArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/TeamAbbreviationObject'
 *     TeamAbbreviationObject:
 *       type: 'object'
 *       properties:
 *         team_abbreviation:
 *           type: 'string'
 *       example:
 *         team_abbreviation: 'GSW'
 *     GameResultsArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/GameResultsObject'
 *     GameResultsObject:
 *       type: 'object'
 *       properties:
 *         game_date:
 *           type: 'string'
 *         matchup:
 *           type: 'string'
 *         wl:
 *           type: 'string'
 *         pts:
 *           type: 'string'
 *         plus_minus:
 *           type: 'string'
 *       example:
 *         game_date: '2015-10-27'
 *         matchup: 'GSW vs. NOP'
 *         wl: 'W'
 *         pts: '111'
 *         plus_minus: '16'
 *     TeamIdArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/TeamIdObject'
 *     TeamIdObject:
 *       type: 'object'
 *       properties:
 *         team_id:
 *           type: 'string'
 *       example:
 *         team_id: '1610612744'
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
 *         game_id: '0021500003'
 *     gameIdDateMatchupArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/gameIdDateMatchupObject'
 *     gameIdDateMatchupObject:
 *       type: 'object'
 *       properties:
 *         game_id:
 *           type: 'string'
 *         game_date:
 *           type: 'string'
 *         matchup:
 *           type: 'string'
 *       example:
 *         game_id: '0021500003'
 *         game_date: '2015-10-27'
 *         matchup: 'GSW vs. NOP'
 *     ShotsReadResults:
 *       type: 'object'
 *       properties:
 *         resource:
 *           type: 'string'
 *         parameters:
 *           type: 'object'
 *         resultSets:
 *           type: 'array'
 *       example:
 *         resource: 'shotchartdetail'
 *         parameters: {"LeagueId": null, "Season": "2015-16"}
 *         resultSets: ['shots data']
 *     ShotsReadArray:
 *       type: 'array'
 *       example: [
 *                  "Shot Chart Detail",
 *                  "0021500001",
 *                  2,
 *                  203083,
 *                  "Andre Drummond",
 *                  1610612765,
 *                  "Detroit Pistons",
 *                  1,
 *                  11,
 *                  41,
 *                  "Missed Shot",
 *                  "Driving Layup Shot",
 *                  "2PT Field Goal",
 *                  "Restricted Area",
 *                  "Center(C)",
 *                  "Less than 8 ft.",
 *                  1,
 *                  -17,
 *                  -6,
 *                  1,
 *                  0,
 *                  20151027,
 *                  "ATL",
 *                  "DET"
 *               ]
 *     ShotsArray:
 *       type: 'array'
 *       items:
 *          $ref: '#/components/schemas/ShotsObject'
 *     ShotsObject:
 *       type: 'object'
 *       properties:
 *         grid_type:
 *           type: 'string'
 *         game_id:
 *           type: 'string'
 *         game_event_id:
 *           type: 'string'
 *         player_id:
 *           type: 'string'
 *         player_name:
 *           type: 'string'
 *         team_id:
 *           type: 'string'
 *         team_name:
 *           type: 'string'
 *         period:
 *           type: 'string'
 *         minutes_remaining:
 *           type: 'string'
 *         seconds_remaining:
 *           type: 'string'
 *         event_type:
 *           type: 'string'
 *         action_type:
 *           type: 'string'
 *         shot_type:
 *           type: 'string'
 *         shot_zone_basic:
 *           type: 'string'
 *         shot_zone_area:
 *           type: 'string'
 *         shot_zone_range:
 *           type: 'string'
 *         shot_distance:
 *           type: 'string'
 *         loc_x:
 *           type: 'string'
 *         loc_y:
 *           type: 'string'
 *         shot_attempted_flag:
 *           type: 'string'
 *         shot_made_flag:
 *           type: 'string'
 *         game_date:
 *           type: 'string'
 *         htm:
 *           type: 'string'
 *         vtm:
 *           type: 'string'
 *       example:
 *         id: 361
 *         grid_type: "Shot Chart Detail"
 *         game_id: "0021500003"
 *         game_event_id: "4"
 *         player_id: "203110"
 *         player_name: "Draymond Green"
 *         team_id: "1610612744"
 *         team_name: "Golden State Warriors"
 *         period: "1"
 *         minutes_remaining: "11"
 *         seconds_remaining: "35"
 *         event_type: "Made Shot"
 *         action_type: "Jump Shot"
 *         shot_type: "3PT Field Goal"
 *         shot_zone_basic: "Above the Break 3"
 *         shot_zone_area: "Left Side Center(LC)"
 *         shot_zone_range: "24+ ft."
 *         shot_distance: "26"
 *         loc_x: "-217"
 *         loc_y: "149"
 *         shot_attempted_flag: "1"
 *         shot_made_flag: "1"
 *         game_date: "20151027"
 *         htm: "GSW"
 *         vtm: "NOP"
 */


router.get('/', checkAuthenticated, shots.getShots);

/**
 * @swagger
 * /api/shots/{season}:
 *   get:
 *     summary: Get ShotsArray by season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the shots we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShotsReadResults'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/:season', checkAuthenticated, shots.getShotsBySeason);

/**
 * @swagger
 * /api/shots/{player}/{season}:
 *   get:
 *     summary: Get ShotsArray by player season
 *     parameters:
 *       - in: path
 *         name: player
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the player who's shots we are getting
 *         example: 'Draymond Green'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the shots we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShotsArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/:player/:season', shots.getShotsByPlayerBySeasonLocal);


router.get('/finishing/:season/:idString', shots.getFinishingStats);

router.get('/shooting/:season/:idString', shots.getShootingStats);

router.get('/reboundingdefense/:season/:idString', shots.getReboundingDefenseStats);

router.get('/playmaking/:season/:idString', shots.getPlaymakingStats);

//TOO BIG IN POSTMAN, CAN'T FIND USAGE OF ROUTE IN CODE
router.get('/local/shots/:season', shots.getShotsBySeasonLocal);

//CAN'T FIND USAGE OF ROUTE IN CODE
router.get('/local/shots/:player', shots.getShotsByPlayerLocal);


/**
 * @swagger
 * /api/shots/{player}/{season}/{game_id}:
 *   get:
 *     summary: Get ShotsArray by player season and game_id
 *     parameters:
 *       - in: path
 *         name: player
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the player who's shots we are getting
 *         example: 'Draymond Green'
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the shots we are getting
 *         example: '2015-2016'
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: String game_id of the shots we are getting
 *         example: '0021500003'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShotsArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/:player/:season/:game_id', shots.getShotsByPlayerBySeasonByGameLocal);

//NOT CURRENTLY USED
router.post('/', checkAuthenticated, shots.createShot);

/**
 * @swagger
 * /api/shots/{season}:
 *    post:
 *      summary: Creates a new shots row in database
 *      parameters:
 *        - in: path
 *          name: season
 *          schema:
 *            type: string
 *          required: true
 *          description: String season of the shots we are posting
 *          example: '2015-2016'
 *      requestBody:
 *        description: Data for new shots
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShotsReadArray'
 *      responses:
 *        '201':
 *          description: returns created shots read array
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ShotsReadArray'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/:season', checkAuthenticated, shots.createShotBySeason);


module.exports = router;