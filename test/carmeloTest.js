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
describe('/POST Carmelo pts player', () => {
    function testCreateCarmelo (boxScore, status) {
        it('it should create a new carmelo pts row, given valid authorization', (done) => {
          chai.request(app)
              .post(`/carmelo`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('carmeloPts')
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
            "player": [
                {
                    "full_name": "Draymond Green",
                    "first_name": "Draymond",
                    "last_name": "Green",
                    "is_active": "true",
                    "playerid": "203110"
                }
            ],
            "carmeloPts": "-0.32",
            "season": "2015-2016"
        }, 403]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateCarmelo(boxScores[i][0], boxScores[i][1]);
    }
});

describe('/GET all carmeloPts players ranked in given season', () => {
    function testGetCarmeloPts (season, status) {
        it(`it should GET all carmeloPts players from "carmeloPts" WHERE season = season ORDER BY carmeloPts`, (done) => {
          chai.request(app)
              .get(`/carmelo/getLocalCarmeloPointsInSeason/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array');
                        chai.expect(res.body[0]).to.be.an('object').with.property('firstname');
                        chai.expect(res.body[0]).to.be.an('object').with.property('lastname');
                        chai.expect(res.body[0]).to.be.an('object').with.property('carmelopts');
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
        testGetCarmeloPts(players[i][0], players[i][1]);
    }
});
