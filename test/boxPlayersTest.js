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
describe('/GET roster by season, teamid', () => {
    function testGetRoster (season, teamid, status) {
        it(`it should GET all RosterPlayerObjects (player_name, player_id) from "boxscorestraditional${season}" WHERE team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxPlayers/getroster/${season}/${teamid}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_name');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_id');
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
        testGetRoster(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET all playerids by season', () => {
    function testGetPlayerIdList (season, teamid, status) {
        it(`it should GET all distinct PlayerIdObjects (player_id) from "boxscorestraditional${season}"`, (done) => {
          chai.request(app)
              .get(`/boxPlayers/playeridlist/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_id');
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
    let players = [['2015-2016', 200], ['', 404], ['2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testGetPlayerIdList(players[i][0], players[i][1])
    }
});

describe('/GET all playerids and player_names by season', () => {
    function testPlayerIdPlayerName (season, status) {
        it(`it should GET all player_names, player_ids from "boxscorestraditional${season}"`, (done) => {
          chai.request(app)
              .get(`/boxPlayers/playernameidlist/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_name');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_id');
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').should.be.empty
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['2015-2016', 200], ['', 404], ['2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testPlayerIdPlayerName(players[i][0], players[i][1])
    }
});

describe('/GET player_names by teamid from latest season', () => {
    function testGetPlayerNames (teamid, status) {
        it(`it should GET all PlayerNameObjects (player_name) from "boxscorestraditional2021-2022" WHERE team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxPlayers/teamplayers/${teamid}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_name');
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
    let players = [['1610612744', 200], ['161061274', 404]];
    for(let i = 0; i < players.length; i++) {
        testGetPlayerNames(players[i][0], players[i][1])
    }
});

describe('/GET previous game roster by season, teamid, gameid', () => {
    function testGetPreviousGameRoster (season, teamid, gameid, status) {
        it(`it should GET all RosterPlayerObjects (player_name, player_id) from "boxscorestraditional${season}" WHERE team_id = teamid AND game_id = gameid`, (done) => {
          chai.request(app)
              .get(`/boxPlayers/previousgame/gameid/${season}/${teamid}/${gameid}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_name');
                        chai.expect(res.body[0]).to.be.an('object').with.property('player_id');
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
    let players = [['2015-2016', '1610612744', '0021500069', 200], ['2015-2016', '161061274', '0021500069', 404], ['2015-2015', '1610612744', '0021500069', 400]];
    for(let i = 0; i < players.length; i++) {
        testGetPreviousGameRoster(players[i][0], players[i][1], players[i][2], players[i][3]);
    }
});