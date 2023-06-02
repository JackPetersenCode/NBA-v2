const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');


chai.use(chaiHttp);
/*describe('/GET official player_id by name', () => {
    function testGetPlayerId (lastName, firstName, playerid) {
        it('it should GET player_id from players last, first names', (done) => {
          chai.request(app)
              .get(`/official/players/playerid/${lastName}/${firstName}`)
              .end((err, res) => {
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(1);
                    chai.expect(res.body[0].playerid).to.be.equal(playerid);
                done();
              });
        });
    }
    let players = [['Curry', 'Stephen', '201939'], ['Tatum', 'Jayson', '1628369']];
    for(let i = 0; i < players.length; i++) {
        testGetPlayerId(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET leagueGames by season', () => {
    function testGetLeagueGames (season, len) {
        it('it should GET leagueGames from season', (done) => {
          chai.request(app)
              .get(`/local/leaguegames/${season}`)
              .end((err, res) => {
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(len);
                done();
              });
        });
    }
    let seasons = [['2015-2016', 2460], ['2016-2017', 2460], ['2017-2018', 2460], ['2018-2019', 2460], ['2019-2020', 2118], ['2020-2021', 2160], ['2021-2022', 2460]];
    for(let i = 0; i < seasons.length; i++) {
        testGetLeagueGames(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET league hustle points by season', () => {
    function testGetHustlePointsBySeason(season, len) {
        it('it should GET league hustle points from season for every qualifying player', (done) => {
          chai.request(app)
              .get(`/getLocalHustlePointsInSeason/${season}`)
              .end((err, res) => {
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(len);
                done();
              });
        });
    }
    let seasons = [['2015-2016', 476], ['2016-2017', 484], ['2017-2018', 535], ['2018-2019', 529], ['2019-2020', 527], ['2020-2021', 540], ['2021-2022', 582]];
    for(let i = 0; i < seasons.length; i++) {
        testGetHustlePointsBySeason(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET league mvp points by season', () => {
    function testGetMvpPointsBySeason(season, len) {
        it('it should GET league mvp points from season for every qualifying player', (done) => {
          chai.request(app)
              .get(`/getLocalMvpPointsInSeason/${season}`)
              .end((err, res) => {
                    //console.log(res.body.length);
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(len);
                done();
              });
        });
    }
    let seasons = [['2015-2016', 476], ['2016-2017', 486], ['2017-2018', 537], ['2018-2019', 528], ['2019-2020', 529], ['2020-2021', 540], ['2021-2022', 582]];
    for(let i = 0; i < seasons.length; i++) {
        testGetMvpPointsBySeason(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET league carmelo points by season', () => {
    function testGetCarmeloPointsBySeason(season, len) {
        it('it should GET league carmelo points from season for every qualifying player', (done) => {
          chai.request(app)
              .get(`/getLocalCarmeloPointsInSeason/${season}`)
              .end((err, res) => {
                    console.log(res.body.length);
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(len);
                done();
              });
        });
    }
    let seasons = [['2015-2016', 476], ['2016-2017', 484], ['2017-2018', 535], ['2018-2019', 529], ['2019-2020', 527], ['2020-2021', 540], ['2021-2022', 582]];
    for(let i = 0; i < seasons.length; i++) {
        testGetCarmeloPointsBySeason(seasons[i][0], seasons[i][1]);
    }
});

describe('/GET league hustle points by season', () => {
    function testGetHustlePointsBySeason(season, len) {
        it('it should GET league hustle points from season for every qualifying player', (done) => {
          chai.request(app)
              .get(`/getLocalHustlePointsInSeason/${season}`)
              .end((err, res) => {
                    console.log(res.body.length);
                    res.status.should.be.equal(200);
                    chai.expect(res.body).to.be.an('array').of.length(len);
                done();
              });
        });
    }
    let seasons = [['2015-2016', 477], ['2016-2017', 486], ['2017-2018', 535], ['2018-2019', 529], ['2019-2020', 527], ['2020-2021', 540], ['2021-2022', 582]];
    for(let i = 0; i < seasons.length; i++) {
        testGetHustlePointsBySeason(seasons[i][0], seasons[i][1]);
    }
});*/