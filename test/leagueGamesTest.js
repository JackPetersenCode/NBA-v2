const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST League Games', () => {
    function testCreateLeagueGames (boxScore, season, status) {
        it('it should create a new league game row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueGames/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array');
                    } else if (status === 403) {
                        res.status.should.be.equal(403);
                        chai.expect(res.body).to.be.an('object').with.property('message').to.be.equal('not authenticated');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let boxScores = [
        [                [
            "22015",
            1610612744,
            "GSW",
            "Golden State Warriors",
            "0021500003",
            "2015-10-27",
            "GSW vs. NOP",
            "W",
            240,
            41,
            96,
            0.427,
            9,
            30,
            0.3,
            20,
            22,
            0.909,
            21,
            35,
            56,
            29,
            8,
            7,
            20,
            29,
            111,
            16,
            1
        ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueGames(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM JSON League Games by season', () => {
    function testReadLeagueGames(season, status) {
        it(`it should READ all league games from "leagueGames${season}.json"`, (done) => {
          chai.request(app)
              .get(`/leagueGames/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('object').with.property('resultSets');
                    } else if (status === 403) {
                        res.status.should.be.equal(403);
                        chai.expect(res.body).to.be.an('object').with.property('message').to.be.equal('not authenticated');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let seasons = [["2015-2016", 403]];
    for(let i = 0; i < seasons.length; i++) {
        testReadLeagueGames(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET local league games in season', () => {
    function testLocalLeagueGames(season, status) {
        it(`it should GET all league games from "leagueGames${season}"`, (done) => {
          chai.request(app)
              .get(`/leagueGames/local/leaguegames/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('matchup');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 200], ['2015-201', 400], ['2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testLocalLeagueGames(players[i][0], players[i][1])
    }
});

describe('/GET game id, game date, matchup by player, season', () => {
    function testGameIdDateMatchup(player, season, status) {
        it(`it should GET all gameIdDateMatchup objects from "leagueGames${season}"`, (done) => {
          chai.request(app)
              .get(`/leagueGames/gameidgamedatematchup/${player}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_id');
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_date');
                        chai.expect(res.body[0]).to.be.an('object').with.property('matchup');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['Draymond Green', '2015-2016', 200], ['Draymond Gree', '2015-2016', 404], ['Draymond Green', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testGameIdDateMatchup(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET team_id by team_name', () => {
    function testLeagueGamesTeamId(teamname, status) {
        it(`it should GET team_id from "leagueGames2021-2022" WHERE team_name = teamname`, (done) => {
          chai.request(app)
              .get(`/leagueGames/teamid/${teamname}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('team_id');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['Golden State Warriors', 200], ['Golden State Warrior', 404]];
    for(let i = 0; i < players.length; i++) {
        testLeagueGamesTeamId(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET all home GameResultsObjects by team in given season', () => {
    function testGameResultsHome(season, team, status) {
        it(`it should GET all home game results from "leagueGames${season}" WHERE team_name = team`, (done) => {
          chai.request(app)
              .get(`/leagueGames/gameResults/home/${team}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('wl');
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_date');
                        chai.expect(res.body[0]).to.be.an('object').with.property('matchup');
                        chai.expect(res.body[0]).to.be.an('object').with.property('pts');
                        chai.expect(res.body[0]).to.be.an('object').with.property('plus_minus');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 'Golden State Warriors', 200], ['2015-2016', 'Golden State Warrior', 404], ['2015-2015', 'Golden State Warriors', 400]];
    for(let i = 0; i < players.length; i++) {
        testGameResultsHome(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET all visitor GameResultsObjects by team in given season', () => {
    function testGameResultsVisitor(season, team, status) {
        it(`it should GET all visitor game results from "leagueGames${season}" WHERE team_name = team`, (done) => {
          chai.request(app)
              .get(`/leagueGames/gameResults/visitor/${team}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('wl');
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_date');
                        chai.expect(res.body[0]).to.be.an('object').with.property('matchup');
                        chai.expect(res.body[0]).to.be.an('object').with.property('pts');
                        chai.expect(res.body[0]).to.be.an('object').with.property('plus_minus');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 'Golden State Warriors', 200], ['2015-2016', 'Golden State Warrior', 404], ['2015-2015', 'Golden State Warriors', 400]];
    for(let i = 0; i < players.length; i++) {
        testGameResultsVisitor(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET actual Game Results by matchup in given season', () => {
    function testGameResultsActual(season, matchup1, status) {
        it(`it should GET all actual game results from "leagueGames${season}" WHERE matchup = matchup`, (done) => {
          chai.request(app)
              .get(`/leagueGames/actual/gameresult/${matchup1}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('wl');
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_date');
                        chai.expect(res.body[0]).to.be.an('object').with.property('matchup');
                        chai.expect(res.body[0]).to.be.an('object').with.property('pts');
                        chai.expect(res.body[0]).to.be.an('object').with.property('plus_minus');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 'GSW vs. NOP', 200], ['2015-2016', 'GSW vs. NO', 404], ['2015-2015', 'GSW vs. NOP', 400]];
    for(let i = 0; i < players.length; i++) {
        testGameResultsActual(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET team abbreviation from the team name', () => {
    function testLeagueGamesTeamAbbreviation (teamname, status) {
        it(`it should GET team abbreviation from "leagueGames2021-2022" WHERE team_name = teamname`, (done) => {
          chai.request(app)
              .get(`/leagueGames/teamabbreviation/${teamname}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(1);
                        chai.expect(res.body[0]).to.be.an('object').with.property('team_abbreviation')
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['Golden State Warriors', 200], ['Golden State Warrior', 404]];
    for(let i = 0; i < players.length; i++) {
        testLeagueGamesTeamAbbreviation(players[i][0], players[i][1])
    }
});

describe('/GET game_id with season, team_id, and game_date', () => {
    function testLeagueGamesGameId(season, teamid, gamedate, status) {
        it(`it should GET game_id from "leagueGames${season}" WHERE team_id = teamid AND game_date = gamedate`, (done) => {
          chai.request(app)
              .get(`/leagueGames/testing/previousgame/gameid/${season}/${teamid}/${gamedate}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(1);
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_id')
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', '1610612744', '2015-10-27', 200], ['2015-2016', '1610612744', '2015-10-2', 404]];
    for(let i = 0; i < players.length; i++) {
        testLeagueGamesGameId(players[i][0], players[i][1], players[i][2], players[i][3]);
    }
});

