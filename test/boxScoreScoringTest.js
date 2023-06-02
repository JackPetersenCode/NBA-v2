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
describe('/GET *READ FROM CSV box scores scoring by season', () => {
    function testReadBoxScoreScoring (season, status) {
        it(`it should READ all game box score scoring from "boxscorescoring${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoreScoring/read/${season}`)
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
        testReadBoxScoreScoring(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Scoring', () => {
    function testCreateBoxScoreScoring (boxScore, season, status) {
        it('it should create a new box score scoring, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/boxScoreScoring/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('PCT_FGA_2PT')
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
                "PLAYER_ID": "203076",
                "PLAYER_NAME": "Anthony Davis",
                "NICKNAME": "Anthony",
                "START_POSITION": "F",
                "COMMENT": "",
                "MIN": "34:31",
                "PCT_FGA_2PT": "0.9",
                "PCT_FGA_3PT": "0.1",
                "PCT_PTS_2PT": "0.444",
                "PCT_PTS_2PT_MR": "0.333",
                "PCT_PTS_3PT": "0.0",
                "PCT_PTS_FB": "0.222",
                "PCT_PTS_FT": "0.556",
                "PCT_PTS_OFF_TOV": "0.333",
                "PCT_PTS_PAINT": "0.111",
                "PCT_AST_2PM": "0.75",
                "PCT_UAST_2PM": "0.25",
                "PCT_AST_3PM": "0.0",
                "PCT_UAST_3PM": "0.0",
                "PCT_AST_FGM": "0.75",
                "PCT_UAST_FGM": "0.25"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreScoring(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV box scores scoring teams by season', () => {
    function testReadBoxScoreScoringTeams (season, status) {
        it(`it should READ all game box score scoring teams from "boxscorescoringteams${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoreScoring/teams/read/${season}`)
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
        testReadBoxScoreScoringTeams(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Scoring Teams', () => {
    function testCreateBoxScoreScoringTeams(boxScore, season, status) {
        it('it should create a new box score scoring teams, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/boxScoreScoring/teams/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('PCT_FGA_2PT')
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
                "PCT_FGA_2PT": "0.783",
                "PCT_FGA_3PT": "0.217",
                "PCT_PTS_2PT": "0.611",
                "PCT_PTS_2PT_MR": "0.189",
                "PCT_PTS_3PT": "0.189",
                "PCT_PTS_FB": "0.189",
                "PCT_PTS_FT": "0.2",
                "PCT_PTS_OFF_TOV": "0.305",
                "PCT_PTS_PAINT": "0.421",
                "PCT_AST_2PM": "0.586",
                "PCT_UAST_2PM": "0.414",
                "PCT_AST_3PM": "0.667",
                "PCT_UAST_3PM": "0.333",
                "PCT_AST_FGM": "0.6",
                "PCT_UAST_FGM": "0.4"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreScoringTeams(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});