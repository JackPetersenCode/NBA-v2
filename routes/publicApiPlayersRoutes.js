const express = require('express');
const router = express.Router();
const publicApiPlayers = require('../services/publicPlayersQueries');

router.post('/', publicApiPlayers.createPlayer);
router.get('/:playerid', publicApiPlayers.getPlayerById);
router.get('/local/players/:lastName/:firstName', publicApiPlayers.getPlayersWithLastFirst);
router.get('/local/players/playerid/:lastName/:firstName', publicApiPlayers.getPlayerIdWithLastFirst);
router.get('/players', publicApiPlayers.getPlayers);
router.get('/playerIds', publicApiPlayers.getPlayerIds);
router.post('/playerscloud', publicApiPlayers.createPlayerCloud);
router.get('/playersJson', publicApiPlayers.getPlayersJson);

module.exports = router;

