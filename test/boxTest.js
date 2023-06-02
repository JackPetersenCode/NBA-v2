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
describe('/POST Box Score Advanced', () => {
    function testCreateBoxScoreAdvanced (boxScore, season, status) {
        it('it should create a new box score advanced, given valid season/authorization', (done) => {
            
          chai.request(app)
              .post(`/box/${season}`)
              .send(boxScore)
              .end((err, res) => {
                    if (status === 201) {
                        res.status.should.be.equal(201);
                        chai.expect(res.body).to.be.an('object').with.property('game_id')
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
                'game_id': '0021500003',
                'team_id': '1610612744',
                'team_abbreviation': 'GSW',
                'team_city': 'Golden State',
                'player_id': '203110',
                'player_name': 'Draymond Green',
                'nickname': 'Draymond',
                'start_position': 'F',
                'comment': 'something about player health usually',
                'min': '29:26',
                'e_off_rating': '119.5',
                'off_rating': '120.6',
                'e_def_rating': '85.9',
                'def_rating': '88.9',
                'e_net_rating': '33.6',
                'net_rating': '31.7',
                'ast_pct': '0.08',
                'ast_tov': '2.0',
                'ast_ratio': '12.5',
                'oreb_pct': '0.086',
                'dreb_pct': '0.192',
                'reb_pct': '0.131',
                'tm_tov_pct': '6.3',
                'efg_pct': '0.333',
                'ts_pct': '0.388',
                'usg_pct': '0.182',
                'e_usg_pct': '0.18',
                'e_pace': '104.99',
                'pace': '102.74',
                'pace_per40': '85.62',
                'poss': '63',
                'pie': '0.046'
            }, '2015-2016', 403    
        ]
    ];
    for(let i = 0; i < boxScores.length; i++) {
        testCreateBoxScoreAdvanced(boxScores[i][0], boxScores[i][1], boxScores[i][2]);
    }
});

describe('/GET *READ FROM CSV box scores advanced by season', () => {
    function testReadBoxScoreAdvanced (season, status) {
        it(`it should READ all game box score advanced from "boxscores${season}.csv"`, (done) => {
          chai.request(app)
              .get(`/box/read/${season}`)
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
        testReadBoxScoreAdvanced(seasons[i][0], seasons[i][1]);
    }
});