const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST League Dash Player Clutch', () => {
    function testCreateLeagueDashPlayerClutch (boxScore, season, status) {
        it('it should create a new league dash player clutch row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueDashPlayerClutch/${season}`)
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
        [                [
            "Players",
            203932,
            "Aaron Gordon",
            "Aaron",
            1610612753,
            "ORL",
            20,
            27,
            9,
            18,
            0.333,
            79.23,
            6,
            15,
            0.4,
            1,
            3,
            0.333,
            10,
            15,
            0.667,
            8,
            28,
            36,
            3,
            2,
            4,
            1,
            2,
            11,
            10,
            23,
            -33,
            83.7,
            5,
            0,
            73,
            131,
            182,
            361,
            330,
            139,
            164,
            163,
            186,
            137,
            188,
            88,
            99,
            92,
            211,
            41,
            18,
            22,
            143,
            152,
            42,
            126,
            314,
            323,
            98,
            151,
            397,
            98,
            70,
            13,
            111,
            1,
            "203932,1610612753"
        ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueDashPlayerClutch(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league dash player clutch by season', () => {
    function testReadLeagueDashPlayerClutch(season, status) {
        it(`it should READ all league dash player clutch from "leaguedashplayerclutch${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/leagueDashPlayerClutch/read/${season}`)
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
        testReadLeagueDashPlayerClutch(seasons[i][0], seasons[i][1]);
    }
});