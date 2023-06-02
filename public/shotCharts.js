const shotsPlayer = document.getElementById("shots_player");
const shotsSeason = document.getElementById("shots_season");
const shotsGameId = document.getElementById("shots_gameId");
//const submitShots = document.getElementById("submit_shots");
const teamChosenShots = document.getElementById("teamsshots");
const shotsUnavailable = document.getElementById("shots-unavailable");

const getJsonResponseShotCharts = async (url) => {
  console.log(url);
  const response = await fetch(url);
  try{
      if (response.ok){
          const jsonResponse = await response.json();
          return jsonResponse;
      }
  } catch(err){
      console.log(err);
  }
}


// Set Dimensions
const xSize = 600; 
const ySize = 570;
const xHalf = -350;
const xPosHalf = 350;
const xMargin = 100;
const yMargin = 100;
const width = xSize - xMargin
const height = ySize - yMargin
const halfWidth = xHalf + xMargin;
const halfPosWidth = xPosHalf - xMargin;

const letsGo = async(url, game_id) => {
    const data = [];
    const dataMadeShots = [];
    const dataMissedShots = [];
//    let season = {"season":"2015-2016"};

    let totalShotsArray = await getJsonResponseShotCharts(url);
    /*console.log(totalShotsArray.resultSets[0].rowSet);
    console.log([totalShotsArray.resultSets[0].rowSet[0]])
    console.log(totalShotsArray.resultSets.length)
    let length = totalShotsArray.resultSets[0].rowSet[0].length*/
    for (let i = 0; i < totalShotsArray.length; i++) {
      //data.push([totalShotsArray.resultSets[0].rowSet[i][17], totalShotsArray.resultSets[0].rowSet[i][18]]);
      if (totalShotsArray[i].shot_made_flag === "1") {
        dataMadeShots.push([totalShotsArray[i].loc_x, totalShotsArray[i].loc_y])
      } else {
        dataMissedShots.push([totalShotsArray[i].loc_x, totalShotsArray[i].loc_y]);
      }
    }
    let myPlot;
    let playerId
    let year
    let points
    let min
    let fga
    let fgm
    let fgp
    let fta
    let ftm
    let ftp
    let tpp
    let tpa
    let tpm
    let totreb
    let assists
    let steals
    let turnovers
    let blocks
    let plusminus
    let league = "standard";
    //HERES WHERE YOU FIX THE 'KEVIN DURANT DIDNT PLAY THAT SEASON SO THE GAMES CHART APPEARS' BUG
    
    /**
     * GOTTA FIX THIS, SHOTS LENGTH < 40 COULD BE SEASON CHART
     * 
     * 
     * 
     * 
     * 
     * 
     /////////////////////////////
     //////////////////////////////
     //////////////////////////////
     */
    if (game_id === 'season chart') {
      myPlot = "myPlot";
      chartTitle = "SEASON SHOT CHART";
      player_name = totalShotsArray[0].player_name;
      splitName = player_name.split(" ");
      //let playerId = await getJsonResponseShotCharts(`/local/players/playerid/${splitName[1]}/${splitName[0]}`);
      let playerId = await getJsonResponseShotCharts(`/api/playersNBA/official/players/playerid/${splitName[1]}/${splitName[0]}`);
      playerId = playerId[0].playerid.toString();
      
      year = shotsSeason.value;
      console.log(year);
      let splitYear = year.split('-');
      let realYear = splitYear[0] + '-' + splitYear[1].substring(2, 4);
      let statlines = await getJsonResponseShotCharts(`/api/regularSeasonStats/getregularseasonstatlines/${realYear}/${playerId}`);
      console.log(statlines);

      /*for (let j = 0; j < statlines.length; j++) {
        for (let k = 0; k < 28; k++) {
            let values = Object.values(statlines[j]);
            let totals = [9, 10, 11, 13, 14, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            if (totals.includes(k)) {
                let average = values[k] / values[7];
                values[k] = average;
            }
        }
      }*/


      points = statlines[0].pts / statlines[0].gp;
      min = statlines[0].min / statlines[0].gp;
      fga = statlines[0].fga / statlines[0].gp;
      fgm = statlines[0].fgm / statlines[0].gp;
      fgp = statlines[0].fg_pct;

      tpa = statlines[0].fg3a / statlines[0].gp;
      tpm = statlines[0].fg3m / statlines[0].gp;
      tpp = statlines[0].fg3_pct;

      fta = statlines[0].fta / statlines[0].gp;
      ftm = statlines[0].ftm / statlines[0].gp;
      ftp = statlines[0].ft_pct;

      totreb = statlines[0].reb / statlines[0].gp;
      assists = statlines[0].ast / statlines[0].gp;
      steals = statlines[0].stl / statlines[0].gp;
      turnovers = statlines[0].tov / statlines[0].gp;
      blocks = statlines[0].blk / statlines[0].gp;
      plusminus = 'currently unavailable';
      pfouls = statlines[0].pf / statlines[0].gp;
/*
      points = await getSeasonStatAvgLocal('pts', year, playerId)
      min = await getSeasonStatAvgLocal('min', year, playerId)
      fgp = await getSeasonStatAvgLocal('fg_pct', year, playerId)
      fga = await getSeasonStatAvgLocal('fga', year, playerId)
      fgm = await getSeasonStatAvgLocal('fgm', year, playerId)
      ftp = await getSeasonStatAvgLocal('ft_pct', year, playerId)
      fta = await getSeasonStatAvgLocal('fta', year, playerId);
      ftm = await getSeasonStatAvgLocal('ftm', year, playerId);
      tpp = await getSeasonStatAvgLocal('fg3_pct', year, playerId)
      tpa = await getSeasonStatAvgLocal('fg3a', year, playerId)
      tpm = await getSeasonStatAvgLocal('fg3m', year, playerId)
      totreb = await getSeasonStatAvgLocal('reb', year, playerId)
      assists = await getSeasonStatAvgLocal('ast', year, playerId)
      steals = await getSeasonStatAvgLocal('stl', year, playerId);
      turnovers = await getSeasonStatAvgLocal('turnovers', year, playerId);
      blocks = await getSeasonStatAvgLocal('blk', year, playerId);
      plusminus = await getSeasonStatAvgLocal('plus_minus', year, playerId);
*/      
    } else {
      myPlot = "myPlot2";
      chartTitle = "GAME SHOT CHART";
      player_name = totalShotsArray[0].player_name;
      splitName = player_name.split(" ");

      let playerId = await getJsonResponseShotCharts(`/api/playersNBA/official/players/playerid/${splitName[1]}/${splitName[0]}`);
      console.log(playerId);
      let playerid = playerId[0].playerid.toString();
      let season = shotsSeason.value;
      let league = "standard";
     
      //let seasonyear = year.substring(0, 4);
      let shotsgameid = shotsGameId.value.substring(0, 10);
      //MAKE ENDPOINT TO GET ONE GAME
 /*
      let games = await getJsonResponseShotCharts(`/games/${playerid}`)

      let gameid;
      let gameidArray = [];
      for (let i = 0; i < games.length; i++) {
        gameid = games[i].gameid;
        
        let gameinfo = await getJsonResponseShotCharts(`/gameinfo/${gameid}`)
       
        if (gameinfo[0].vteam.shortName + ' vs. ' + gameinfo[0].hteam.shortName === shotsGameId.value.substring(11, 20) || gameinfo[0].vteam.shortName + ' @ ' + gameinfo[0].hteam.shortName === shotsGameId.value.substring(11, 20)) {
          let game_date = shotsGameId.value.substring(0, 10);

          //GET GAMEID WHERE VTEAM SHORTNAME HTEAM SHORTNAME === 
          if (gameinfo[0].starttimeutc.substring(0, 7) === game_date.substring(0, 7)) {
            console.log('kdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            gameid = gameinfo[0].gameid;
            break;
          }
        
          gameidArray.push(gameid);
        }
      }
   */   
      

      //GET GAME
      /*let vteamhteam = await getJsonResponseShotCharts(`/games/vteamhteam/${playerid}`);
      console.log(`/games/vteamhteam/${playerid}`);
      console.log(vteamhteam);
      for (let j = 0; j < vteamhteam.length; j++) {
        if (vteamhteam[j].vteam.shortName + ' vs. ' + vteamhteam[j].hteam.shortName === shotsGameId.value.substring(11, -1) || vteamhteam[j].vteam.shortName + ' @ ' + vteamhteam[j].hteam.shortName === shotsGameId.value.substring(11, -1)) {
          let game_date = shotsGameId.value.substring(0, 10);
          //GET GAMEID WHERE VTEAM SHORTNAME HTEAM SHORTNAME === 
          let gameid = await getJsonResponseShotCharts(`/games/gameid/${playerid}/${league}/${year}/${shotsgameid}`);
        }
      }*/
      //await getJsonResponseShotCharts(`/gameid/vshortname/hshortname`)
      console.log('KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
      //CATCH THE ERROR HERE IF THE PLAYER DIDNT PLAY IN THE GAME
      //let boxScore = await getJsonResponseShotCharts(`/games/${gameid}/${playerid}`);
      let boxScore = await getJsonResponseShotCharts(`/api/boxScoresTraditional/${season}/${game_id}/${playerid}`);


      console.log(boxScore);
      boxScore = boxScore[0];
      points = boxScore.pts;
      min = boxScore.min;
      fga = boxScore.fga;
      fgm = boxScore.fgm;
      fgp = boxScore.fg_pct;

      tpa = boxScore.fg3a;
      tpm = boxScore.fg3m;
      tpp = boxScore.fg3_pct;

      fta = boxScore.fta;
      ftm = boxScore.ftm;
      ftp = boxScore.ft_pct;

      totreb = boxScore.reb;
      assists = boxScore.ast;
      steals = boxScore.stl;
      turnovers = boxScore.turnovers;
      blocks = boxScore.blk;
      plusminus = boxScore.plus_minus;
      pfouls = boxScore.pf;



    }
    //GET THE STATS YOU WANT IN A TEXT CHUNK
    //season fg% season 3pt% season eFG% ast, blk, stl, threes, 
    //game box score; 4-12, ast, blk, stl, three pt. 2-3, 


    // Append SVG Object to the Page
    const svg = d3.select(`#${myPlot}`)
      .append("svg")
      .append("g")
      .attr("transform","translate(" + halfPosWidth + ", " + yMargin + ")");
    
    d3.select(`#${myPlot}`).selectAll("text").remove()
      // X Axis
    const x = d3.scaleLinear()
      .domain([-250, 250])
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(-250, -52.5)")
      .call(d3.axisBottom(x));

    svg.append("text")
      .attr("x", 0)
      .attr("y", -65)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 0)
      .attr("y", -65)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')
    
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 70)
      .text(`PPG: ${parseFloat(points).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 90)
      .text(`MIN: ${parseFloat(min).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 110)
      .text(`FGA: ${parseFloat(fga).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 130)
      .text(`FGM: ${parseFloat(fgm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')  

    svg.append("text")
      .attr("x", 260)
      .attr("y", 150)
      .text(`FGP: ${parseFloat(fgp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
      
    svg.append("text")
      .attr("x", 260)
      .attr("y", 170)
      .text(`FTA: ${parseFloat(fta).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 190)
      .text(`FTM: ${parseFloat(ftm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')    
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 210)
      .text(`FTP: ${parseFloat(ftp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 230)
      .text(`TPA: ${parseFloat(tpa).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 250)
      .text(`TPM: ${parseFloat(tpm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 270)
      .text(`TPP: ${parseFloat(tpp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 290)
      .text(`REB: ${parseFloat(totreb).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 310)
      .text(`AST: ${parseFloat(assists).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 330)
      .text(`STL: ${parseFloat(steals).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 350)
      .text(`TO: ${parseFloat(turnovers).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 370)
      .text(`BLK: ${parseFloat(blocks).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 390)
      .text(`P-M: ${parseFloat(plusminus).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 0)
      .attr("y", -65)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')

    svg.append("line")
      .attr("x1", 60)
      .attr("x2", 60)
      .attr("y1", -52.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -250)
      .attr("x2", 250)
      .attr("y1", 418)
      .attr("y2", 418)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -60)
      .attr("x2", -60)
      .attr("y1", -52.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -80)
      .attr("x2", 80)
      .attr("y1", 137.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -80)
      .attr("y1", -52.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 80)
      .attr("y1", -52.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -219)
      .attr("x2", -221)
      .attr("y1", -52.5)
      .attr("y2", 87.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", 219)
      .attr("x2", 221)
      .attr("y1", -52.5)
      .attr("y2", 87.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      
    svg.append("line")
      .attr("x1", -30)
      .attr("x2", 30)
      .attr("y1", -8.25)
      .attr("y2", -8.25)
      .attr("stroke", "orange")
      .attr("stroke-width", "5")

    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 87)
      .attr("y1", 100)
      .attr("y2", 100)
      .attr("stroke", "white")
      .attr("stroke-width", "4")
      
    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -87)
      .attr("y1", 100)
      .attr("y2", 100)
      .attr("stroke", "white")
      .attr("stroke-width", "4")

    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 87)
      .attr("y1", 70)
      .attr("y2", 70)
      .attr("stroke", "white")
      .attr("stroke-width", "4")
    
    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -87)
      .attr("y1", 70)
      .attr("y2", 70)
      .attr("stroke", "white")
      .attr("stroke-width", "4")

    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 87)
      .attr("y1", 40)
      .attr("y2", 40)
      .attr("stroke", "white")
      .attr("stroke-width", "4")
    
    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -87)
      .attr("y1", 40)
      .attr("y2", 40)
      .attr("stroke", "white")
      .attr("stroke-width", "4")


    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 87)
      .attr("y1", 30)
      .attr("y2", 30)
      .attr("stroke", "white")
      .attr("stroke-width", "4")
    
    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -87)
      .attr("y1", 30)
      .attr("y2", 30)
      .attr("stroke", "white")
      .attr("stroke-width", "4")

    svg.append("line")
      .attr("x1", -250)
      .attr("x2", -250)
      .attr("y1", -52)
      .attr("y2", 418)
      .attr("stroke", "chartreuse")
      .attr("stroke-width", "2")

    // Y Axis
    const y = d3.scaleLinear()
      .domain([-52.5, 418])
      .range([ -52.5, 418]);

    svg.append("g")
      .attr("transform", "translate(250, 0)")
      .call(d3.axisLeft(y));

    // Dots
    d3.select(`#${myPlot}`).selectAll("circle").remove()

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 7.5)
      .attr("stroke", "orange")
      .style("stroke-width", 2)
      .style("fill", "none");

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 137.5)
      .attr("r", 60)
      .style("opacity", .2)
      .attr("stroke", "white")
      .style("fill", "#33FFEC");
    
    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 418)
      .attr("r", 60)
      .style("opacity", .1)
      .attr("stroke", "white")
      .style("fill", "#33FFEC");

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 418)
      .attr("r", 20)
      .attr("stroke", "white")
      .style("fill", "none");

    
    const arcGenerator2 = d3.arc()
      .outerRadius(61)
      .innerRadius(59)
      .startAngle(0)
      .endAngle(2*Math.PI);
    
    const halfCourtCircle = svg.append("path")
      .attr("transform", "translate(0, 418)")
      .attr("fill","white")
      .attr("d", arcGenerator2());

    const freeThrowCircle = svg.append("path")
      .attr("transform", "translate(0, 137.5)")
      .attr("fill","white")
      .attr("d", arcGenerator2());
    
    /*svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 235)
      .attr("stroke", "white")
      .style("fill", "none");
*/
    const arcGenerator = d3.arc()
      .outerRadius(238.5)
      .innerRadius(236.5)
      .startAngle(Math.PI / 2 + 0.37855)
      .endAngle(Math.PI*3/2 - 0.37855);
    
    const threeLine = svg.append("path")
      .attr("transform", "translate(0, 0)")
      .attr("fill","white")
      .attr("d", arcGenerator())
      
    
    svg.append('g')
      .selectAll("dot")
      .data(dataMissedShots).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0] } )
      .attr("cy", function (d) { return d[1] } )
      .attr("r", 2)
      .style("opacity", .7)
      .style("fill", "seagreen");

    svg.append('g')
      .selectAll("dot")
      .data(dataMadeShots).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0] } )
      .attr("cy", function (d) { return d[1] } )
      .style("opacity", .8)
      .attr("r", 2)
      .style("fill", "yellow");
}


const getGameIdGameDateMatchupBySeason = async(player, season) => {
  console.log(player);
  console.log(season);
  let matchupArray = await getJsonResponseShotCharts(`/api/leagueGames/gameidgamedatematchup/${player}/${season}`);
  return matchupArray;
}

let gameIdArray = [{ game_id: "dummyGame", game_date: "initializeArray", matchup: "dogs vs. cats" }];
const gameDropDown = async() => {

  let games = await getGameIdGameDateMatchupBySeason(shotsPlayer.value, shotsSeason.value);
  var str = '<option value="none" selected disabled hidden>Select an Option</option>';
  document.getElementById("shots_gameId").innerHTML = str;
    try {
      for (var game of games) {
        str += "<option>" + game.game_date + " " + game.matchup + "</option>";
        gameIdArray.push({ game_id: game.game_id, game_date: game.game_date, matchup: game.matchup })
      }
      document.getElementById("shots_gameId").innerHTML = str;
    } catch(error) {
      console.log(error);
    }
}


const submitShots = async() => {
  //FIND ONE IN NEW GAMEID ARRAY WHERE SHOTSGAMEID.VALUE === 
  
  for (var game of gameIdArray) {
    let shotsgameid = shotsGameId.value;
    if (game.game_date + ' ' + game.matchup === shotsgameid) {
      let url = `/shots/${shotsPlayer.value}/${shotsSeason.value}/${game.game_id}`
      await letsGo(url, game.game_id);
      break;
    }
  }
}

const showForm = async() => {
  await gameDropDown();
  let url = `/api/shots/${shotsPlayer.value}/${shotsSeason.value}`;
  await letsGo(url, 'season chart');
  document.getElementById("f1").style.display = "block";
}

let teamArray = [];
const teamsShotsDropDown = async() => {

  let teams = await getJsonResponseShotCharts('/api/teamnames');
  var str = '<option value="none" selected disabled hidden>Select an Option</option>';
  document.getElementById("teamsshots").innerHTML = str;

    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      document.getElementById("teamsshots").innerHTML = str;
    } catch(error) {
      console.log(error);
    }
}
/* Start up function, provides functionality for submit buttons. */
let teamPlayersArray = [];
const teamPlayersShotsDropDown = async() => {

    let teamId = await getJsonResponseShotCharts(`/api/leagueGames/teamid/${teamChosenShots.value}`)
    let teamPlayers = await getJsonResponseShotCharts(`/api/boxPlayers/teamplayers/${teamId[0].team_id}`);
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("shots_player").innerHTML = str;
    try {
        for (var player of teamPlayers) {
            str += "<option>" + player.player_name + "</option>";
            teamPlayersArray.push(player.player_name);
        }
        document.getElementById("shots_player").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}

const appendStatsUnavailable = async(table, message) => {
    table.innerHTML = '';
    table.innerHTML = message;
}

let playerShotsSeasonArray = [];
const getShotSeasons = async() => {
    let player = shotsPlayer.value;

    let playerid = await getJsonResponseShotCharts(`/api/playersNBA/${player}`)
    
    if (!playerid) {
        await appendStatsUnavailable(shotsUnavailable, 'Stats Unavailable');
        return;
    }
    let results = await getJsonResponseShotCharts(`/api/regularSeasonStats/shotseasons/${playerid[0].playerid}`);
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("shots_season").innerHTML = str;
    let seasonsArr = ['2015-2016', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    realSeasonArray = [];
    for (var result of results) {
        let splitSeason = result.season_id.split('-');
        realSeason = splitSeason[0] + '-20' + splitSeason[1];
        if (seasonsArr.includes(realSeason)) {
            realSeasonArray.push(realSeason);
        }
    }
    try {
        for (var season of realSeasonArray) {
            str += "<option>" + season + "</option>";
            playerShotsSeasonArray.push(season);
        }
        document.getElementById("shots_season").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
}

teamChosenShots.onchange = async() => {
    shotsUnavailable.innerHTML = '';
    await teamPlayersShotsDropDown();
}

shotsPlayer.onchange = async() => {
    shotsUnavailable.innerHTML = '';
    await getShotSeasons();
}

shotsSeason.onchange = async() => {
    shotsUnavailable.innerHTML = '';
    await showForm();
}

shotsGameId.onchange = async() => {
    await submitShots();
}

teamsShotsDropDown();