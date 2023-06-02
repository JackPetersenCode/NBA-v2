const express = require('express');
const router = express.Router();
const statRanked = require('../services/statRankedQueries');
const { checkAuthenticated } = require('./userRouter');


router.get(`/hustleStats/:season`, statRanked.getRankedHustleStats);

router.get(`/:season`, statRanked.getRankedStats);

router.get(`/boxScores/:season`, statRanked.getRankedBoxScores);
router.get(`/boxScoresMisc/:season`, statRanked.getRankedBoxScoresMisc);

router.get(`/ptsLeaders/:season`, statRanked.getPtsLeaders);

router.get(`/rebLeaders/:season`, statRanked.getRebLeaders);
router.get(`/astLeaders/:season`, statRanked.getAstLeaders);
router.get(`/stlLeaders/:season`, statRanked.getStlLeaders);
router.get(`/blkLeaders/:season`, statRanked.getBlkLeaders);
router.get(`/plusMinusLeaders/:season`, statRanked.getPlusMinusLeaders);
router.get(`/fgPctLeaders/:season`, statRanked.getFgPctLeaders);
router.get(`/fg3mLeaders/:season`, statRanked.getFg3mLeaders);
router.get(`/fg3PctLeaders/:season`, statRanked.getFg3PctLeaders);
router.get(`/sumStat/:orderBy/:season/:category`, statRanked.getSumStat);

router.get(`/qualifiedPlayers/:season`, statRanked.getQualifiedPlayers);
router.get(`/career/:season/:player_id`, statRanked.getCareerStats);

router.get(`/:stat/:season`, statRanked.getRankedPlayersByStat);

module.exports = router;