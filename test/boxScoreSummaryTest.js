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
describe('/GET *READ FROM CSV box scores summary by season', () => {
    function testReadBoxScoreSummary (season, status) {
        it(`it should READ all game box score summary from "boxscoresummary${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/boxScoreSummary/read/${season}`)
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
        testReadBoxScoreSummary(seasons[i][0], seasons[i][1]);
    }
});

describe('/POST Box Score Summary', () => {
    function testCreateBoxScoreSummary (boxScore, season, status) {
        it('it should create a new box score summary, given valid season/authorization', (done) => {
          chai.request(app)
              .post(`/boxScoreSummary/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('GAME_DATE_EST')
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
                "GAME_DATE_EST": "2015-10-27T00:00:00",
                "GAME_SEQUENCE": "3",
                "GAME_ID": "0021500003",
                "GAME_STATUS_ID": "3",
                "GAME_STATUS_TEXT": "Final---TESTTESTTESTTESTTEST",
                "GAMECODE": "20151027/NOPGSW",
                "HOME_TEAM_ID": "1610612744",
                "VISITOR_TEAM_ID": "1610612740",
                "SEASON": "2015",
                "LIVE_PERIOD": "4",
                "LIVE_PC_TIME": "",
                "NATL_TV_BROADCASTER_ABBREVIATION": "TNT",
                "LIVE_PERIOD_TIME_BCAST": "Q4  - TNT",
                "WH_STATUS": "1"
            }, "2015-2016", 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreSummary(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET array of home game_ids of team in given season', () => {
    function testHomeGameIds (season, teamid, status) {
        it(`it should GET all game box scores from "boxscoresummary${season}" WHERE home_team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxScoreSummary/home/gameids/${season}/${teamid}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_id');
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
        testHomeGameIds(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET array of visitor game_ids of team in given season', () => {
    function testVisitorGameIds(season, teamid, status) {
        it(`it should GET all game box scores from "boxscoresummary${season}" WHERE visitor_team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxScoreSummary/visitor/gameids/${season}/${teamid}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('game_id');
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
        testVisitorGameIds(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET array of length 1 of object containing count of distinct home or visitor game_ids of team in given season', () => {
    function testLengthOfSeason(season, teamid, H_or_V, status) {
        it(`it should GET count of distinct game_ids from "boxscoresummary${season}" WHERE ${H_or_V}_team_id = teamid`, (done) => {
          chai.request(app)
              .get(`/boxScoreSummary/lengthofseason/${season}/${teamid}/${H_or_V}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(1);
                        chai.expect(res.body[0]).to.be.an('object').with.property('count');
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
    let players = [['2015-2016', '1610612744', 'home', 200], ['2015-2016', '161061274', 'home', 404], ['2015-2015', '1610612744', 'home', 400]];
    for(let i = 0; i < players.length; i++) {
        testLengthOfSeason(players[i][0], players[i][1], players[i][2], players[i][3]);
    }
});