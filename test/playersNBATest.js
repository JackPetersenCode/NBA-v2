const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST PlayersNBA', () => {
    function testCreatePlayersNBA(boxScore, status) {
        it('it should create a new playersNBA row, given valid authorization', (done) => {
          chai.request(app)
              .post(`/playersNBA`)
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
        [{
            "full_name": "Draymond Green",
            "first_name": "Draymond",
            "last_name": "Green",
            "is_active": "true",
            "player_id": "203110"
          }, "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreatePlayersNBA(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ PLAYERSNBA FROM JSON', () => {
    function testReadPlayersNBA(status) {
        it(`it should READ all playersNBA from "playersNBA.json"`, (done) => {
          chai.request(app)
              .get(`/playersNBA`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('array');
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
    let seasons = [[403]];
    for(let i = 0; i < seasons.length; i++) {
        testReadPlayersNBA(seasons[i][0]);
    }
});


describe('/GET player_id using full name from PlayersNBA', () => {
    function testPlayerIdFromFullName(player, status) {
        it(`it should GET playerid from "playersNBA" WHERE player_name = player`, (done) => {
          chai.request(app)
              .get(`/playersNBA/${player}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('playerid');
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
    let players = [['Draymond Green', 200], ['Draymond Gree', 404]];
    for(let i = 0; i < players.length; i++) {
        testPlayerIdFromFullName(players[i][0], players[i][1]);
    }
});

describe('/GET playerid using last, first names from PlayersNBA', () => {
    function testPlayerIdFromLastFirst(lastName, firstName, status) {
        it(`it should GET playerid from "playersNBA" WHERE last_name = lastName AND first_name = firstName`, (done) => {
          chai.request(app)
              .get(`/playersNBA/official/players/playerid/${lastName}/${firstName}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('playerid');
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
    let players = [['Green', 'Draymond', 200], ['Green', 'Draymon', 404], ['Green', 400]];
    for(let i = 0; i < players.length; i++) {
        testPlayerIdFromLastFirst(players[i][0], players[i][1], players[i][2]);
    }
});

describe('/GET player using playerid from PlayersNBA', () => {
    function testPlayerFromPlayerId(playerid, status) {
        it(`it should GET player from "playersNBA" WHERE playerid = playerid`, (done) => {
          chai.request(app)
              .get(`/playersNBA/playerNBA/${playerid}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('playerid');
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
    let players = [['203110', 200], ['20311', 404], [400]];
    for(let i = 0; i < players.length; i++) {
        testPlayerFromPlayerId(players[i][0], players[i][1], players[i][2]);
    }
});