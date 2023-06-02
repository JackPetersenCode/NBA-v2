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
describe('/GET *READ FROM CSV box scores four factors by season', () => {
    function testReadBoxScoreFourFactors (season, status) {
        it(`it should READ all game box score four factors from "boxscorefourfactors${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/fourFactors/read/${season}`)
              .end((err, res) => {
                    if ( status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array');
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
        testReadBoxScoreFourFactors(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Four Factors', () => {
    function testCreateBoxScoreFourFactors (boxScore, season, status) {
        it('it should create a new box score four factors, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/fourFactors/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('EFG_PCT')
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
                "GAME_ID": "0021500003",
                "TEAM_ID": "1610612740",
                "TEAM_ABBREVIATION": "NOP",
                "TEAM_CITY": "New Orleans",
                "PLAYER_ID": "201967",
                "PLAYER_NAME": "Dante Cunningham",
                "NICKNAME": "Dante",
                "START_POSITION": "F",
                "COMMENT": "",
                "MIN": "26:31",
                "EFG_PCT": "0.469",
                "FTA_RATE": "0.347",
                "TM_TOV_PCT": "0.13",
                "OREB_PCT": "0.115",
                "OPP_EFG_PCT": "0.585",
                "OPP_FTA_RATE": "0.189",
                "OPP_TOV_PCT": "0.142",
                "OPP_OREB_PCT": "0.391"
            }  , "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreFourFactors(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV box scores four factors teams by season', () => {
    function testReadBoxScoreFourFactorsTeams (season, status) {
        it(`it should READ all game box score four factors teams from "boxscorefourfactors${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/fourFactors/teams/read/${season}`)
              .end((err, res) => {
                    if ( status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array');
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
        testReadBoxScoreFourFactorsTeams(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Four Factors Teams', () => {
    function testCreateBoxScoreFourFactorsTeams(boxScore, season, status) {
        it('it should create a new box score four factors teams, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/fourFactors/teams/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('EFG_PCT')
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
                "GAME_ID": "0021500003",
                "TEAM_ID": "1610612740",
                "TEAM_NAME": "Pelicans",
                "TEAM_ABBREVIATION": "NOP",
                "TEAM_CITY": "New Orleans",
                "MIN": "240:00",
                "EFG_PCT": "0.458",
                "FTA_RATE": "0.325",
                "TM_TOV_PCT": "0.179",
                "OREB_PCT": "0.157",
                "OPP_EFG_PCT": "0.474",
                "OPP_FTA_RATE": "0.229",
                "OPP_TOV_PCT": "0.191",
                "OPP_OREB_PCT": "0.446"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreFourFactorsTeams(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET home box scores four factors by playerid, season', () => {
    function testBoxScoresFourFactorsHome (playerid, season, status) {
        it(`it should GET all home game box scores from "boxscorefourfactors${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/fourFactors/home/${playerid}/${season}`)
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
        testBoxScoresFourFactorsHome(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET visitor box scores four factors by playerid, season', () => {
    function testBoxScoresFourFactorsVisitor (playerid, season, status) {
        it(`it should GET all visitor game box scores from "boxscorefourfactors${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/fourFactors/visitor/${playerid}/${season}`)
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
        testBoxScoresFourFactorsVisitor(players[i][0], players[i][1], players[i][2])
    }
});