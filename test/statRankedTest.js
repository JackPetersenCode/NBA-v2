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
describe('/GET any stat ranked by player, season', () => {
    function testStatRanked(stat, season, status) {
        console.log(stat)
        console.log(season)
        it(`it shoud GET "boxscorestraditional${season}".${stat}, "boxscorestraditional${season}".player_id, "${season}".player_name
            FROM "boxscorestraditional${season}" INNER JOIN "${season}"
            ON "boxscorestraditional${season}".player_id = "${season}".player_id
            ORDER BY CAST("boxscorestraditional${season}".${stat} AS FLOAT) ASC`, (done) => {
          chai.request(app)
              .get(`/statranked/${stat}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
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
    let players = [['reb', '2015-2016', 200]];
    for(let i = 0; i < players.length; i++) {
        testStatRanked(players[i][0], players[i][1], players[i][2])
    }
});