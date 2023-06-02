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
describe('/POST Hustle stats player', () => {
    function testCreateHustle (boxScore, status) {
        it('it should create a new hustle stats row, given valid authorization', (done) => {
          chai.request(app)
              .post(`/hustleStats`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('hustlePts')
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
    let boxScores = [[{
        "player": [
            {
                "full_name": "Draymond Green",
                "first_name": "Draymond",
                "last_name": "Green",
                "is_active": "true",
                "playerid": "203110"
            }
        ],
        "hustlePts": "3.81",
        "season": "2015-2016"
    }, 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateHustle(boxScores[i][0], boxScores[i][1]);
    }
});

describe('/GET all hustlePts players ranked in given season', () => {
    function testGetHustlePts (season, status) {
        it(`it should GET all hustlePts players from "hustleFactor" WHERE season = season ORDER BY hustlePts`, (done) => {
          chai.request(app)
              .get(`/hustleStats/getLocalHustlePointsInSeason/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('firstname');
                        chai.expect(res.body[0]).to.be.an('object').with.property('lastname');
                        chai.expect(res.body[0]).to.be.an('object').with.property('hustlepts');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').should.be.empty;
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 200], ['2015-2015', 404]];
    for(let i = 0; i < players.length; i++) {
        testGetHustlePts(players[i][0], players[i][1]);
    }
});

describe('/POST League Hustle stats player', () => {
    function testCreateLeagueHustle (boxScore, season, status) {
        it('it should create a new league hustle stats row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/hustleStats/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array').of.length(28);
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
        [[
        "201143",
        "Al Horford",
        "1610612737",
        "ATL",
        "30",
        "82",
        "2631",
        "25",
        "22",
        "3",
        "3",
        "0",
        "6",
        "12",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0"
    ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueHustle(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league hustle stats by season', () => {
    function testReadLeagueHustleStats(season, status) {
        it(`it should READ all league hustle stats from "leaguehustlestatsplayer${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/hustleStats/leaguehustlestats/${season}`)
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
        testReadLeagueHustleStats(seasons[i][0], seasons[i][1]);
    }
});