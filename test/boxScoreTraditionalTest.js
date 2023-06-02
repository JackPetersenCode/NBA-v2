const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

chai.use(chaiHttp);
describe('/GET home box scores traditional by playerid, season', () => {
    function testBoxScoresTraditionalHome (playerid, season, status) {
        it(`it should GET all home game box scores from "boxscorestraditional${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/home/${playerid}/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
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
    let players = [['201939', '2015-2016', 200], ['1628369', '2015-2016', 404], ['201939', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditionalHome(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET visitor box scores traditional by playerid, season', () => {
    function testBoxScoresTraditionalVisitor (playerid, season, status) {
        it(`it should GET all visitor game box scores from "boxscorestraditional${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/visitor/${playerid}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
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
    let players = [['201939', '2015-2016', 200], ['1628369', '2015-2016', 404], ['201939', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditionalVisitor(players[i][0], players[i][1], players[i][2])
    }
});

describe('/POST Box Score Traditional', () => {
    function testCreateBoxScoresTraditional (boxScore, season, status) {
        it('it should create a new box score, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/boxScoresTraditional/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('GAME_ID')
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
        [
            {
                "GAME_ID": "1",
                "TEAM_ID": "1",
                "TEAM_ABBREVIATION": "BOS",
                "TEAM_CITY": "Boston",
                "PLAYER_ID": "1",
                "PLAYER_NAME": "Buck Dancer",
                "NICKNAME": "Buck",
                "START_POSITION": "F",
                "COMMENT": "something about player health usually",
                "MIN": "30:00",
                "FGM": "5",
                "FGA": "10",
                "FG_PCT": "0.5",
                "FG3M": "2",
                "FG3A": "4",
                "FG3_PCT": "0.5",
                "FTM": "2",
                "FTA": "2",
                "FT_PCT": "1.0",
                "OREB": "1",
                "DREB": "1",
                "REB": "2",
                "AST": "1",
                "STL": "1",
                "BLK": "1",
                "TURNOVERS": "1",
                "PF": "1",
                "PTS": "12",
                "PLUS_MINUS": "5"
            }, "TEST200Rows2019-2020", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoresTraditional(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }


});

describe('/GET *READ FROM CSV box scores traditional by season', () => {
    function testReadBoxScoresTraditional (playerid, season, status) {
        it(`it should READ all game box scores from "boxscorestraditional${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/read/${season}`)
              .end((err, res) => {
                    if ( status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array').of.length(32652);
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
        testReadBoxScoresTraditional(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET box scores traditional by playerid, season', () => {
    function testBoxScoresTraditional (playerid, season, status) {
        it(`it should GET all game box scores from "boxscorestraditional${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/${playerid}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
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
    let players = [['201939', '2015-2016', 200], ['1628369', '2015-2016', 404], ['201939', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditional(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET box scores traditional by season, gameid, playerid', () => {
    function testBoxScoresTraditionalGame (season, gameid, playerid, status) {
        it(`it should GET all game box scores from "boxscorestraditional${season}" WHERE game_id = gameid AND player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/${season}/${gameid}/${playerid}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
                        chai.expect(res.body[0].game_id).to.be.equal(gameid);
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
    let players = [['2015-2016', '0021500003', '203110', 200], ['2015-2016', '0021500005', '1628369', 404], ['2015-2015', '0021500003', '203110', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditionalGame(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET number of home or visitor games played by team up until date of gameid in given season', () => {
    function testBoxNum (gameid, season, teamid, H_or_V, status) {
        it(`it should GET count of home or away games played in given season from "boxscorestraditional${season}" WHERE game_id = gameid AND team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/boxnum/${gameid}/${season}/${teamid}/${H_or_V}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(1);
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
    let players = [['0021500069', '2015-2016', '1610612744', 'home', 200], ['0021500069', '2015-2015', '1610612744', 'home', 400], ['0021500069', '2015-2016', '161061274', 'home', 404]];
    for(let i = 0; i < players.length; i++) {
        testBoxNum(players[i][0], players[i][1], players[i][2], players[i][3], players[i][4])
    }
});

describe('/GET previous game gameid by season, teamId', () => {
    function testPreviousGameId (season, teamId, status) {
        it(`it should GET previous game's game_id from "boxscorestraditional${season}" WHERE season = season AND team_id = teamId`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/previousgame/gameid/${season}/${teamId}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(1);
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
    let players = [['2015-2016', '1610612744', 200], ['2015-2016', '161061274', 404], ['2015-2015', '1610612744', 400]];
    for(let i = 0; i < players.length; i++) {
        testPreviousGameId(players[i][0], players[i][1], players[i][2])
    }
});