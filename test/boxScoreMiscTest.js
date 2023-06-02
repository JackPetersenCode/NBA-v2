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
describe('/GET *READ FROM CSV box scores misc by season', () => {
    function testReadBoxScoreMisc (season, status) {
        it(`it should READ all game box score misc from "boxscoremisc${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoreMisc/read/${season}`)
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
        testReadBoxScoreMisc(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Misc', () => {
    function testCreateBoxScoresMisc (boxScore, season, status) {
        it('it should create a new box score misc, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/boxScoreMisc/${season}`)
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
                "GAME_ID": "0021500003",
                "TEAM_ID": "1610612740",
                "TEAM_ABBREVIATION": "NOP",
                "TEAM_CITY": "New Orleans",
                "PLAYER_ID": "201967",
                "PLAYER_NAME": "Buck Dancer",
                "NICKNAME": "Dante",
                "START_POSITION": "F",
                "COMMENT": "",
                "MIN": "26:31",
                "PTS_OFF_TOV": "8",
                "PTS_2ND_CHANCE": "2",
                "PTS_FB": "3",
                "PTS_PAINT": "4",
                "OPP_PTS_OFF_TOV": "16",
                "OPP_PTS_2ND_CHANCE": "9",
                "OPP_PTS_FB": "11",
                "OPP_PTS_PAINT": "36",
                "BLK": "0",
                "BLKA": "1",
                "PF": "2",
                "PFD": "1"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoresMisc(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV box scores misc teams by season', () => {
    function testReadBoxScoreMiscTeams (season, status) {
        it(`it should READ all game box score misc teams from "boxscoremiscteams${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoreMisc/teams/read/${season}`)
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
        testReadBoxScoreMiscTeams(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Misc Teams', () => {
    function testCreateBoxScoresMiscTeams(boxScore, season, status) {
        it('it should create a new box score misc teams, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/boxScoreMisc/teams/${season}`)
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
                "GAME_ID": "0021500003",
                "TEAM_ID": "1610612740",
                "TEAM_NAME": "Pelicans",
                "TEAM_ABBREVIATION": "NOP",
                "TEAM_CITY": "New Orleans",
                "MIN": "26:31",
                "PTS_OFF_TOV": "8",
                "PTS_2ND_CHANCE": "2",
                "PTS_FB": "3",
                "PTS_PAINT": "4",
                "OPP_PTS_OFF_TOV": "16",
                "OPP_PTS_2ND_CHANCE": "9",
                "OPP_PTS_FB": "11",
                "OPP_PTS_PAINT": "36",
                "BLK": "0",
                "BLKA": "1",
                "PF": "2",
                "PFD": "1"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoresMiscTeams(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});