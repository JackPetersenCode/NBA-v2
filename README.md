# NBA MVP App

Node/Express API and scripts with front end initially just utiziling the NBA's public api, but now have accumulated a massive Postgres database and developed my own API. Users can access any stat for any player within the years of available data provided by the database. Stats are grouped; Users also can access shot chart visualizations equipped with box scores for any player in any season/game. The 'deep stats are custom, weighted, accumulative stats for any player for any of the given years. 

$35 Fantasy Baller: 
- Assigned every player from chosen season (current season is default) a dollar value, $1, $2, $3, $4, $5, $6 or $7, seven being the most valuable players. Used the total of the season averages of pts, reb, and ast to determine dollar amount, and created 7 dropdown menus containing all players in the NBA organized by dollar amount assigned. 
- User, with stat tables at bottom of screen for reference, selects 10 players for his or her team, while not going over the $35 salary cap limit. User roster is displayed dynamically as a drag and drop component, top 5 rows are starters, bottom 5 rows are bench players. 
- Once the user has finished drafting a 10-man roster and the 'Lock in Roster' button is clicked, the computer takes its turn. An array of 10 random integers, each within the range of 1 to 7, and adding up to exactly 35 is created. The integers in the array represent random dollar amounts for players. For each integer in the array, a random player is selected from the corresponding player drop down menu; if the integer is 2, then a random player will be chosen from the $2 player dropdown set, etc. Top 5-dollar value players are set as starters.  
- Once the "Lock in Roster" button is hit, the computer drafts its players, and the game is simulated using a multitude of stats (mostly efficiency or per-minute based). The stats are split into four video-game-like categories and displayed to the user to inform them of the strengths and weaknesses of his or her roster.  
- Make sure to add your score to the ‘$35 Ballers’ high score list!

Shot Charts: 
- User selects any player on any team in the given 8 seasons from the drop-down menus, and season/game shot charts are displayed. Once the player is selected, the ‘games’ drop-down menu is activated, and the user has the option to view a shot chart from any specific game the player played in. Made shots are green, missed shots are red. 
 
Cumulative Stats: 
CARMELO FACTOR: Player's hustle stats per minute * 100 + efg% - 100 
MVP POINTS: sum of custom weights of player's traditional stats
let mvpPoints = (.15 * parseFloat(ppg)) + (.07 * parseFloat(totReb)) + (.06 * parseFloat(assists)) + (.125 * parseFloat(steals)) - (.125 * parseFloat(turnovers)) + (.3 * parseFloat(plusMinus)) + (.02 * parseFloat(fgp));  
let hustleFactor = (.25 * parseFloat(offRebPg)) + (.35 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))  
let carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor); 
 
Predictions:
- Displays historical and future expected/actual results for every game in the last 8 seasons. Success rate in the 60's.


## Dependencies: {
    "angular": "^1.8.3",
    "axios": "^0.24.0",
    "babel": "^6.23.0",
    "babel-cli": "^6.26.0",
    "bcrypt": "^5.1.0",
    "chai": "^4.3.6",
    "chai-http": "^4.3.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "csv-parse": "^5.3.0",
    "csv-writer": "^1.6.0",
    "d3": "^7.6.1",
    "dotenv": "^10.0.0",
    "ejs": "^3.1.8",
    "expect": "^29.0.3",
    "express": "^4.17.2",
    "express-flash": "^0.0.2",
    "express-session": "^1.17.3",
    "helmet": "^6.0.0",
    "heroku": "^7.59.2",
    "ioredis": "^5.2.4",
    "jquery": "^3.6.1",
    "jquery-csv": "^1.0.21",
    "jsdom": "^19.0.0",
    "lodash": "^4.17.21",
    "minimist": "*",
    "mocha": "^10.0.0",
    "passport": "^0.5.3",
    "passport-local": "^1.0.0",
    "path": "^0.12.7",
    "pg": "^8.8.0",
    "pg-hstore": "^2.3.4",
    "react": "^18.2.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-icons": "^4.7.1",
    "redis": "^4.0.3",
    "sequelize": "^6.25.5",
    "should": "^13.2.3",
    "swagger-jsdoc": "^6.2.5",
    "swagger-node-express": "~2.0",
    "swagger-ui-express": "^4.5.0",
    "zlib": "^1.0.5"
},
## devDependencies": {
    "assert": "^2.0.0",
    "buffer": "^6.0.3",
    "concurrently": "^7.6.0",
    "crypto-browserify": "^3.12.0",
    "https-browserify": "^1.0.0",
    "os-browserify": "^0.3.0",
    "process": "^0.11.10",
    "stream-browserify": "^3.0.0",
    "stream-http": "^3.2.0",
    "supertest": "^6.2.4",
    "url": "^0.11.0"
},
## Testing with Swagger
Swagger documentation and testing available at https://www.thehoopscoop.org/api-docs

## Resources
- https://www.codecademy.com
- https://swagger.io.docs
- Third party api, https://rapidapi.com/api-sports/api/api-nba

## Options for extension
- Keep enriching front end features, make predictions page more interactive.
