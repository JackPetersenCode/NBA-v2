const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST League Dash Lineups', () => {
    function testCreateLeagueDashLineups (boxScore, season, status) {
        it('it should create a new league dash lineups row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueDashLineups/${season}`)
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
    let boxScores = [
        [[
            "Lineups",
            "-101141-202694-202704-203083-203484-",
            "E. Ilyasova - M. Morris - R. Jackson - A. Drummond - Caldwell-Pope",
            1610612765,
            "DET",
            48,
            25,
            23,
            0.521,
            914.8033333333333,
            748,
            1688,
            0.443,
            155,
            440,
            0.352,
            276,
            437,
            0.632,
            279,
            609,
            888,
            360,
            249,
            149,
            60,
            95,
            308,
            393,
            1927,
            71,
            10,
            20,
            12775,
            5167,
            1,
            2,
            1,
            5931,
            3,
            2,
            3847,
            3,
            1,
            5307,
            1,
            3,
            1,
            5,
            12784,
            2,
            9,
            12786,
            12785,
            1,
            2,
            20
        ], "2015-2016", 201]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueDashLineups(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league dash lineups by season', () => {
    function testReadLeagueDashLineups(season, status) {
        it(`it should READ all league dash lineups from "leaguedashlineups${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/leagueDashLineups/read/${season}`)
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
    let seasons = [["2015-2016", 201]];
    for(let i = 0; i < seasons.length; i++) {
        testReadLeagueDashLineups(seasons[i][0], seasons[i][1]);
    }
});