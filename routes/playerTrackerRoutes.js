const express = require('express');
const router = express.Router();
const boxScorePlayerTracker = require('../services/playerTrackerQueries');

router.get('/read/:season', boxScorePlayerTracker.getBoxScorePlayerTrackerFromCSV);

router.post(`/:season`, boxScorePlayerTracker.createBoxScorePlayerTracker);

router.get('/teams/read/:season', boxScorePlayerTracker.getBoxScorePlayerTrackerTeamsFromCSV);

router.post(`/teams/:season`, boxScorePlayerTracker.createBoxScorePlayerTrackerTeams);

module.exports = router;