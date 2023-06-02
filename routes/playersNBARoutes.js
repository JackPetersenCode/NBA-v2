const express = require('express');
const router = express.Router();
const playersNBA = require('../services/playersNBAQueries');
const { checkAuthenticated } = require('./userRouter');


/**
 * @swagger
 * components:
 *   schemas:
 *     PlayerIdArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayerIdObject'
 *     PlayerIdObject:
 *       type: 'object'
 *       properties:
 *         player_id:
 *           type: 'string'
 *       example:
 *         player_id: '203110'
 *     PlayersNBAReadArray:
 *       type: 'array'
 *       example: ["Willie Burton","Willie","Burton","false","416"]
 *     PlayersNBAReadResults:
 *       type: 'array'
 *       items:
 *          $ref: '#/components/schemas/PlayersNBAReadArray'
 *     PlayerArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayersNBAReadObject'
 *     PlayersNBAReadObject:
 *       type: 'object'
 *       properties:
 *         full_name:
 *           type: 'string'
 *         first_name:
 *           type: 'string'
 *         last_name:
 *           type: 'string'
 *         is_active:
 *           type: 'string'
 *         player_id:
 *           type: 'string'
 *       example:
 *         full_name: 'Draymond Green'
 *         first_name: 'Draymond'
 *         last_name: 'Green'
 *         is_active: 'true'
 *         player_id: '203110'
 * /api/playersNBA:
 *    post:
 *      summary: Creates a new playersNBA row in database
 *      requestBody:
 *        description: Data for new playerNBA
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayersNBAReadObject'
 *      responses:
 *        '201':
 *          description: returns created playersNBA read object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PlayersNBAReadObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/', checkAuthenticated, playersNBA.createPlayersNBA);


router.get('/allPlayers', playersNBA.getAllIdsNames);
/**
 * @swagger
 * /api/playersNBA:
 *   get:
 *     summary: Read playersNBA from JSON
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayersNBAReadResults'
 *       '403':
 *         description: Not Authorized
 */
router.get('/', checkAuthenticated, playersNBA.getPlayersNBA);

router.get('/priceAllPlayers/:season', playersNBA.getPriceAllPlayers);

/**
 * @swagger
 * /api/playersNBA/{name}:
 *   get:
 *     summary: Get player_id using full name from playersNBA
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: String name of the player who's id we are getting
 *         example: 'Draymond Green'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerIdArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/:name', playersNBA.getOfficialPlayerIdWithFullName);

router.get('/:season/:name', playersNBA.getPlayerIdWithShotTable);

/**
 * @swagger
 * /api/playersNBA/official/players/playerid/{lastName}/{firstName}:
 *   get:
 *     summary: Get player_id using lastName firstName from playersNBA
 *     parameters:
 *       - in: path
 *         name: lastName
 *         schema:
 *           type: string
 *         required: true
 *         description: String last name of the player who's id we are getting
 *         example: 'Green'
 *       - in: path
 *         name: firstName
 *         schema:
 *           type: string
 *         required: true
 *         description: String first name of the player who's id we are getting
 *         example: 'Draymond'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerIdArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/official/players/playerid/:lastName/:firstName', playersNBA.getOfficialPlayerIdWithLastFirst);

/**
 * @swagger
 * /api/playersNBA/playerNBA/{playerid}:
 *   get:
 *     summary: Get player using player_id from playersNBA
 *     parameters:
 *       - in: path
 *         name: playerid
 *         schema:
 *           type: string
 *         required: true
 *         description: String playerid of the player we are getting
 *         example: '203110'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/playerNBA/:playerid', playersNBA.getPlayerByIdOfficial);

module.exports = router;

