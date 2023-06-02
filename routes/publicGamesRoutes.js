const express = require('express');
const router = express.Router();
const publicApiGames = require('../services/publicGamesQueries');

router.get('/gamescloud', publicApiGames.getGamesFromJson);

router.post('/gamescloud', publicApiGames.createGameCloud);

router.get('/gameinfocloud', publicApiGames.getGameInfoFromJson);

router.post('/gameinfocloud', publicApiGames.createGameInfoCloud);
router.get('/gameinfo/:gameid', publicApiGames.getGameInfoByGameId);
router.get('/games/:playerid', publicApiGames.getGamesByPlayer);

router.get('/games/vteamhteam/:playerid', publicApiGames.getVTeamHTeam);

router.get('/games/:gameid/:playerid', publicApiGames.getLocalGamesByGameByPlayerPublic);

router.get('/games/gameid/:playerid/:league/:seasonyear/:shotsgameid', publicApiGames.getGameIdPublic);
router.post('/', publicApiGames.createGame);

router.post('/seasonyear/:seasonyear', publicApiGames.createGameInfo);
router.get('/games/:playerid/:league/:seasonyear', publicApiGames.getPlayerSeasonGameStats);

module.exports = router;
