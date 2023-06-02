const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST Shots', () => {
    function testCreateShots (boxScore, season, status) {
        it('it should create a new shots row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/shots/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.a('string').equal('Shot Chart Detail')
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
            "Shot Chart Detail",
            "0021500001",
            2,
            203083,
            "Andre Drummond",
            1610612765,
            "Detroit Pistons",
            1,
            11,
            41,
            "Missed Shot",
            "Driving Layup Shot",
            "2PT Field Goal",
            "Restricted Area",
            "Center(C)",
            "Less than 8 ft.",
            1,
            -17,
            -6,
            1,
            0,
            20151027,
            "ATL",
            "DET"
          ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateShots(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ SHOTS FROM JSON by season', () => {
    function testReadShots(season, status) {
        it(`it should READ all shots from "${season}.json"`, (done) => {
          chai.request(app)
              .get(`/shots/${season}`)
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
        testReadShots(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET box shots by player, season', () => {
    function testShotsByPlayerSeason(player, season, status) {
        it(`it should GET all shots from "${season}" WHERE player_name = ${player}`, (done) => {
          chai.request(app)
              .get(`/shots/${player}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]['grid_type']).to.be.a('string').equal('Shot Chart Detail');
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
        testShotsByPlayerSeason(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET box shots by player, season, gameid', () => {
    function testShotsByPlayerSeasonGameId(player, season, gameid, status) {
        it(`it should GET all shots from "${season}" WHERE player_name = ${player} AND game_id = ${gameid}`, (done) => {
          chai.request(app)
              .get(`/shots/${player}/${season}/${gameid}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]['grid_type']).to.be.a('string').equal('Shot Chart Detail');
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
    let players = [['Draymond Green', '2015-2016', '0021500003', 200], ['Draymond Gree', '2015-2016', '0021500003', 404], ['Draymond Green', '2015-2015', '0021500003', 400]];
    for(let i = 0; i < players.length; i++) {
        testShotsByPlayerSeasonGameId(players[i][0], players[i][1], players[i][2], players[i][3]);
    }
});
