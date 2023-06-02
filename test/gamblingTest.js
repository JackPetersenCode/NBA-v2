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
describe('/GET *READ FROM CSV gambling odds by season', () => {
    function testReadGamblingOdds (season, status) {
        it(`it should READ all gambling odds from "odds${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/gambling/odds/${season}`)
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
        testReadGamblingOdds(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET array of length 1 containing object with property moneyline of home team in given season', () => {
    function testHomeMoneyline (season, homeTeam, gamedate, status) {
        it(`it should GET home team moneyline from "odds${season}" WHERE team = homeTeam`, (done) => {
          chai.request(app)
              .get(`/gambling/moneyline/home/${season}/${homeTeam}/${gamedate}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('ml');
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
    let players = [['2015-2016', 'GoldenState', '619', 200], ['2015-2016', 'GoldenState', '61', 404], ['2015-2015', 'GoldenState', '619', 400]];
    for(let i = 0; i < players.length; i++) {
        testHomeMoneyline(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET array of length 1 containing object with property moneyline of visitor team in given season', () => {
    function testVisitorMoneyline (season, visitorTeam, gamedate, status) {
        it(`it should GET visitor team moneyline from "odds${season}" WHERE team = visitorTeam`, (done) => {
          chai.request(app)
              .get(`/gambling/moneyline/visitor/${season}/${visitorTeam}/${gamedate}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array')
                        chai.expect(res.body[0]).to.be.an('object').with.property('ml');
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
    let players = [['2015-2016', 'Cleveland', '619', 200], ['2015-2016', 'Cleveland', '61', 404], ['2015-2015', 'Cleveland', '619', 400]];
    for(let i = 0; i < players.length; i++) {
        testVisitorMoneyline(players[i][0], players[i][1], players[i][2])
    }
});