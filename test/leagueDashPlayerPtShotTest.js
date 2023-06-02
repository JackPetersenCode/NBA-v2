const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST League Dash Player Pt Shot', () => {
    function testCreateLeagueDashPlayerPtShot (boxScore, season, status) {
        it('it should create a new league dash player pt shot row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueDashPlayerPtShot/${season}`)
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
    let boxScores = [[
        [
            201939,
            "Stephen Curry",
            1610612744,
            "GSW",
            28,
            79,
            79,
            1,
            805,
            1546,
            0.521,
            0.651,
            0.429,
            403,
            664,
            0.607,
            0.571,
            402,
            882,
            0.456
        ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueDashPlayerPtShot(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league dash player pt shot by season', () => {
    function testReadLeagueDashPlayerPtShot(season, status) {
        it(`it should READ all league dash player pt shot from "leaguedashplayerptshot${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/leagueDashPlayerPtShot/read/${season}`)
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
        testReadLeagueDashPlayerPtShot(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST League Dash Player Shot Locations', () => {
    function testCreateLeagueDashPlayerShotLocations (boxScore, season, status) {
        it('it should create a new league dash player shot locations row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueDashPlayerPtShot/leaguedashplayershotlocations/${season}`)
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
    let boxScores = [[
        [
            201166,
            "Aaron Brooks",
            1610612741,
            "CHI",
            31,
            "Aaron",
            58,
            123,
            0.472,
            34,
            84,
            0.405,
            30,
            77,
            0.39,
            1,
            6,
            0.167,
            5,
            10,
            0.5,
            60,
            165,
            0.364,
            0,
            4,
            0,
            6,
            16,
            0.375
        ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueDashPlayerShotLocations(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league dash player shot locations by season', () => {
    function testReadLeagueDashPlayerShotLocations(season, status) {
        it(`it should READ all league dash player shot locations from "leaguedashplayershotlocations${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/leagueDashPlayerPtShot/read/leaguedashplayershotlocations/${season}`)
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
        testReadLeagueDashPlayerShotLocations(seasons[i][0], seasons[i][1]);
    }
});