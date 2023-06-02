const express = require('express');
const router = express.Router();
const mvpPoints = require('../services/mvpPointsQueries');

router.get(`/:playerid/:season/:H_or_V`, mvpPoints.getMVPPointsByPlayerBySeason);
router.get('/getLocalMvpPointsInSeason/:season', mvpPoints.getAllFirstLastMvpPointsInSeason);
router.post('/', mvpPoints.createPlayerMvpPoints);
router.get(`/getAllMvpPoints/:season`, mvpPoints.getAllMvpPointsFunction);

module.exports = router;
