const express = require('express');
const router = express.Router();
const regularSeasonStats = require('../services/regularSeasonStatsServices');

router.get('/', regularSeasonStats.seasonRegularPlayerStatsLoad);

router.post(`/`, regularSeasonStats.createSeasonRegularPlayerStatsTotals);

router.get('/getregularseasonstatlines/:playerid', regularSeasonStats.getRegularSeasonStatLines);

router.get('/getregularseasonstatlines/:season/:playerid', regularSeasonStats.getRegularSeasonStatLinesBySeason);

router.get('/shotseasons/:playerid', regularSeasonStats.getShotSeasonsFromPlayerId);




module.exports = router;