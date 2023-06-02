const express = require('express');
const router = express.Router();
const carmelo = require('../services/carmeloQueries');
const { checkAuthenticated } = require('./userRouter');

/**
 * @swagger
 * components:
 *   schemas:
 *     PlayersNBAArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayersNBAObject'
 *     PlayersNBAObject:
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
 *         playerid:
 *           type: 'string'
 *       example:
 *         full_name: "Draymond Green"
 *         first_name: "Draymond"
 *         last_name: "Green"
 *         is_active: "true"
 *         playerid: "203110"
 *     CarmeloArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/CarmeloObject'
 *     CarmeloObject:
 *       type: 'object'
 *       properties:
 *         player:
 *           type: 'object'
 *           items:
 *             $ref: '#/components/schemas/PlayersNBAArray'
 *         carmeloPts:
 *           type: 'string'
 *         season:
 *           type: 'string'
 *       example:
 *         player: [{"full_name": "Draymond Green", "first_name": "Draymond", "last_name": "Green", "is_active": "true", "playerid": "203110"}]
 *         carmeloPts: '-0.32'
 *         season: '2015-2016'
 *     CarmeloResponseArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/CarmeloResponseObject'
 *     CarmeloResponseObject:
 *       type: 'object'
 *       properties:
 *         firstname:
 *           type: 'string'
 *         lastname:
 *           type: 'string'
 *         carmelopts:
 *           type: 'string'
 *       example:
 *         firstname: 'Draymond'
 *         lastname: 'Green'
 *         carmelopts: '-0.32'
 * /api/carmelo:
 *    post:
 *      summary: Creates a new carmelo pts player row in database
 *      requestBody:
 *        description: Data for new carmelo pts player
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarmeloObject'
 *      responses:
 *        '201':
 *          description: returns created carmeloObject
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CarmeloObject'
 *        '403':
 *          description: Not Authorized
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Invalid Path
 */
router.post('/', checkAuthenticated, carmelo.createPlayerCarmeloPoints);


/**
 * @swagger
 * /api/carmelo/getLocalCarmeloPointsInSeason/{season}:
 *   get:
 *     summary: Get All Carmelo Pts Players by season
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the carmelo pts we are getting
 *         example: '2015-2016'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarmeloResponseArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get('/getLocalCarmeloPointsInSeason/:season', carmelo.getAllFirstLastCarmeloPointsInSeason);

router.get('/newCarmelo/:season', carmelo.getNewCarmeloFactor);
 
module.exports = router;