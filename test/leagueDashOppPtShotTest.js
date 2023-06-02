const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

describe('/POST League Dash Opp Pt Shot', () => {
    function testCreateLeagueDashOppPtShot (boxScore, season, status) {
        it('it should create a new league dash opp pt shot row, given valid authorization/season', (done) => {
          chai.request(app)
              .post(`/leagueDashOppPtShot/${season}`)
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
            1610612741,
            "Chicago Bulls",
            "CHI",
            82,
            82,
            1,
            3233,
            6862,
            0.471,
            0.519,
            0.728,
            2583,
            4995,
            0.517,
            0.272,
            650,
            1867,
            0.348
        ], "2015-2016", 403]];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateLeagueDashOppPtShot(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV league dash opp pt shot by season', () => {
    function testReadLeagueDashOppPtShot(season, status) {
        it(`it should READ all league dash opp pt shot from "leaguedashoppptshot${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/leagueDashOppPtShot/read/${season}`)
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
        testReadLeagueDashOppPtShot(seasons[i][0], seasons[i][1]);
    }
});