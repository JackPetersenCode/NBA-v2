const express = require('express');
const cors = require('cors');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const initializePassport = require('./config/passport');
initializePassport(passport);

const app = express();
const bodyParser = require('body-parser')
const db = require('./queries');
//const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
//const { sequelize } = require('./models');
/*app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' http://d3js.org");
    return next();
});*/
const { errorLogger, errorResponder, invalidPathHandler } = require(`./middleware/errorMiddleware`);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'The Hoop Scoop API',
            description: "NBA Statistics API",
            contact: {
                name: "Jack Petersen"
            },
            servers: ["http://localhost:3001/", "http://app-146e2b0b-abe6-4e5f-b8c2-89d39a573bfa.cleverapps.io"]
        }
    },
    apis: ["server.js", "./routes/boxPlayersRoutes.js", "./routes/boxRoutes.js", "./routes/boxScoreMiscRoutes.js",
            "./routes/boxScoreScoringRoutes.js", "./routes/boxScoresTraditionalRoutes.js",
            "./routes/boxScoreSummaryRoutes.js", "./routes/carmeloRoutes.js", "./routes/fourFactorsRoutes.js",
            "./routes/gamblingRoutes.js", "./routes/hustleStatsRoutes.js", "./routes/leagueDashLineupsRoutes.js",
            "./routes/leagueDashOppShotRoutes.js","./routes/leagueDashPlayerClutchRoutes.js",
            "./routes/leagueDashPlayerPtShotRoutes.js", "./routes/leagueGamesRoutes.js", "./routes/mvpPointsRoutes.js",
            "./routes/playersNBARoutes.js", "./routes/playerTrackerRoutes.js", "./routes/publicApiPlayersRoutes.js",
            "./routes/publicGamesRoutes", "./routes/regularSeasonStatsRoutes.js", "./routes/shotsRoutes.js", "./models/user.js",
            "./routes/userRouter.js", "./routes/statRankedRouter.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use(cors());
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

app.use(flash());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser('secret'))
app.use(passport.initialize())
app.use(passport.session())

//app.use(express.static('public'));
if (process.env.NODE_ENV === "production") {

    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("ultimate-stats/build"));
  
    // index.html for all page routes  html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "./ultimate-stats", "build", "index.html"));
    });
} else {
    app.use(express.static('public'));
}

app.set('view engine', 'ejs');

app.use(cors());
/*app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}))*/
//const helmet = require('helmet')
/*app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "https://d3js.org/d3.v6.min.js"],
      },
    })
  );*/
app.use(cookieParser());

const boxPlayersRouter = require('./routes/boxPlayersRoutes');
const boxRouter = require('./routes/boxRoutes');
const boxScoreMiscRouter = require('./routes/boxScoreMiscRoutes');
const boxScoreScoringRouter = require('./routes/boxScoreScoringRoutes');
const boxScoresTraditionalRouter = require('./routes/boxScoresTraditionalRoutes');
const boxScoreSummaryRouter = require('./routes/boxScoreSummaryRoutes');
const carmeloRouter = require('./routes/carmeloRoutes');
const fourFactorsRouter = require('./routes/fourFactorsRoutes');
const gamblingRouter = require('./routes/gamblingRoutes');
const hustleStatsRouter = require('./routes/hustleStatsRoutes');
const leagueDashLineupsRouter = require('./routes/leagueDashLineupsRoutes');
const leagueDashOppPtShotRouter = require('./routes/leagueDashOppShotRoutes');
const leagueDashPlayerClutchRouter = require('./routes/leagueDashPlayerClutchRoutes');
const leagueDashPlayerPtShotRouter = require('./routes/leagueDashPlayerPtShotRoutes');
const leagueGamesRouter = require('./routes/leagueGamesRoutes');
const mvpPointsRouter = require('./routes/mvpPointsRoutes');
const playersNBARouter = require('./routes/playersNBARoutes');
const playerTrackerRouter = require('./routes/playerTrackerRoutes');
const publicApiPlayersRouter = require('./routes/publicApiPlayersRoutes');
const publicGamesRouter = require('./routes/publicGamesRoutes');
const regularSeasonStatsRouter = require('./routes/regularSeasonStatsRoutes');
const shotsRouter = require('./routes/shotsRoutes');
const userRouter = require("./routes/userRouter");
const statRankedRouter = require("./routes/statRankedRoutes");

const apiRouter = express.Router()
app.use("/api", apiRouter);

apiRouter.use("/boxPlayers", boxPlayersRouter);
apiRouter.use("/box", boxRouter);
apiRouter.use("/boxScoreMisc", boxScoreMiscRouter);
apiRouter.use("/boxScoreScoring", boxScoreScoringRouter);
apiRouter.use("/boxScoresTraditional", boxScoresTraditionalRouter);
apiRouter.use("/boxScoreSummary", boxScoreSummaryRouter);
apiRouter.use("/carmelo", carmeloRouter);
apiRouter.use("/fourFactors", fourFactorsRouter);
apiRouter.use("/gambling", gamblingRouter);
apiRouter.use("/hustleStats", hustleStatsRouter);
apiRouter.use("/leagueDashLineups", leagueDashLineupsRouter);
apiRouter.use("/leagueDashOppPtShot", leagueDashOppPtShotRouter);
apiRouter.use("/leagueDashPlayerClutch", leagueDashPlayerClutchRouter);
apiRouter.use("/leagueDashPlayerPtShot", leagueDashPlayerPtShotRouter);
apiRouter.use("/leagueGames", leagueGamesRouter);
apiRouter.use("/mvpPoints", mvpPointsRouter);
apiRouter.use("/playersNBA", playersNBARouter);
apiRouter.use("/playerTracker", playerTrackerRouter);
apiRouter.use("/publicApiPlayers", publicApiPlayersRouter);
apiRouter.use("/publicGames", publicGamesRouter);
apiRouter.use("/regularSeasonStats", regularSeasonStatsRouter);
apiRouter.use("/shots", shotsRouter);
apiRouter.use("/users", userRouter.router);
apiRouter.use("/statranked", statRankedRouter)


app.get('/front', (req, res, next) => {
    res.sendFile(__dirname + "/public/front.html");
});
/*
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/scripts.js");
});
*/
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/styles.css");
});
/*
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/script2.js");
});
*/
app.get('/deepStats', (req, res, next) => {
    res.sendFile(__dirname + "/public/deepStats.html");
});

app.get('/shotCharts', (req, res, next) => {
    res.sendFile(__dirname + "/public/shotCharts.html");
});

app.get('/jackarithm', (req, res, next) => {
    res.sendFile(__dirname + "/public/jackarithm.html");
});

app.delete('/api/database/delete', db.deleteDatabase);


app.get(`/api/statsheaders/:table`, db.getStatsHeadersFromTable);

app.get('/api/teamnames', db.getTeamNames);

app.get(`/api/tablelength/:table`, db.getTableLength);

app.get(`/api/tablelengthbox/:table`, db.getTableLengthBox);


app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

/*async function main() {
    await sequelize.sync();
}
main();*/

app.listen(port, async() => {
    //await sequelize.authenticate();
    console.log(`App running on port ${port}.`)
})
module.exports = app;