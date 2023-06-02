const express = require('express');
const router = express.Router();
const boxPlayers = require('../services/boxPlayersQueries')

const { checkAuthenticated } = require('./userRouter');
/**
 * @swagger
 * components:
 *   schemas:
 *     PlayerNameArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/PlayerNameObject'
 *     PlayerNameObject:
 *       type: 'object'
 *       properties:
 *         player_name:
 *           type: 'string'
 *       example:
 *         player_name: 'Kevin Looney'
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
 *         player_id: '1626172'
 *     RosterArray:
 *       type: 'array'
 *       items:
 *         $ref: '#/components/schemas/RosterPlayerObject'
 *     RosterPlayerObject:
 *       type: 'object'
 *       properties:
 *         player_id:
 *           type: 'string'
 *         player_name:
 *           type: 'string'
 *       example:
 *         player_id: '1626172'
 *         player_name: 'Kevin Looney'
 * /api/boxPlayers/getroster/{season}/{teamid}:
 *   get:
 *     summary: Get Team Roster by season, teamid
 *     parameters:
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the roster we are getting
 *         example: '2015-2016'
 *       - in: path   
 *         name: teamid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's roster we are getting
 *         example: '1610612744'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RosterArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/getroster/:season/:teamid`, boxPlayers.getRosterBySeasonByTeam);

/**
 * @swagger
* /api/boxPlayers/playeridlist/{season}:
*   get:
*     summary: Get all playerid's from every team in the given season
*     parameters:
*       - in: path
*         name: season
*         schema:
*           type: string
*         required: true
*         description: String season of the playerids we are getting
*         example: '2015-2016'
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
router.get('/playeridlist/:season', boxPlayers.getOfficialPlayerIdList);


/**
 * @swagger
* /api/boxPlayers/playernameidlist/{season}:
*   get:
*     summary: Get all playerids and player names from every team in the given season
*     parameters:
*       - in: path
*         name: season
*         schema:
*           type: string
*         required: true
*         description: String season of the players we are getting
*         example: '2015-2016'
*     responses:
*       '200':
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/RosterArray'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get('/playernameidlist/:season', boxPlayers.getOfficialPlayerIdNameList);

/**
 * @swagger
* /api/boxPlayers/teamplayers/{teamid}:
*   get:
*     summary: Get all player names from given team in the latest season
*     parameters:
*       - in: path
*         name: teamid
*         schema:
*           type: string
*         required: true
*         description: String teamid of the players we are getting
*         example: '1610612744'
*     responses:
*       '200':
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PlayerNameArray'
*       '400':
*         description: Bad Request
*       '404':
*         description: Invalid Path
*/
router.get('/teamplayers/:teamid', boxPlayers.getTeamPlayersFromTeamId);


 /** 
 * @swagger
 * /api/boxPlayers/previousgame/gameid/{season}/{teamId}/{gameid}:
 *   get:
 *     summary: Get previous game's roster by season, teamid, gameid
 *     parameters:  
 *       - in: path
 *         name: season
 *         schema:
 *           type: string
 *         required: true
 *         description: String season of the box scores we are getting
 *         example: '2015-2016' 
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the team who's box scores we are getting
 *         example: '1610612744'
 *       - in: path
 *         name: gameid
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the game we are getting
 *         example: '0021500069'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RosterArray'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid Path
 */
router.get(`/previousgame/gameid/:season/:teamId/:gameid`, boxPlayers.getPreviousRosterBySeasonByTeamByGameId);

router.get(`/:season/:name`, boxPlayers.getPlayerIdWithName);
module.exports = router;