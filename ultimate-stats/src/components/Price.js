import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import RosterTable from "./RosterTable";
import hoop from "../apis/hoop";


const Price = ({ selectedSeason, 
                roster, 
                setRoster, 
                teamSalary, 
                setTeamSalary, 
                errorMessage, 
                setErrorMessage, 
                usedPlayers, 
                setUsedPlayers, 
                selectedPlayer, 
                setSelectedPlayer,
                oneDollarPlayers,
                setOneDollarPlayers,
                twoDollarPlayers,
                setTwoDollarPlayers,
                threeDollarPlayers,
                setThreeDollarPlayers,
                fourDollarPlayers,
                setFourDollarPlayers,
                fiveDollarPlayers,
                setFiveDollarPlayers,
                sixDollarPlayers,
                setSixDollarPlayers,
                sevenDollarPlayers,
                setSevenDollarPlayers
             }) => {

    const [playerData, setPlayerData] = useState([]);

    let columns = [];

    useEffect(() => {
        const getPriceAllPlayers = async() => {
            try {
                let results = await hoop.get(`/api/playersNBA/priceAllPlayers/${selectedSeason}`);
                if (results.data.length > 0) {
                    setPlayerData(results.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (selectedSeason) {
            getPriceAllPlayers();
        }
    }, [selectedSeason])
    
    useEffect(() => {
        const setPriceAllPlayers = async() => {
            let oneDollar = [];
            let twoDollars = [];
            let threeDollars = [];
            let fourDollars = [];
            let fiveDollars = [];
            let sixDollars = [];
            let sevenDollars = [];
            for (let i = 0; i < playerData.length; i++) {

                let total = parseFloat(playerData[i]['pts']) + parseFloat(playerData[i]['ast']) + parseFloat(playerData[i]['reb']);
                if (total >= 43.00) {
                    sevenDollars.push(playerData[i]);
                } else if (total >= 36.00 && total < 43.00) {
                    sixDollars.push(playerData[i]);
                } else if (total >= 29.00 && total < 36.00) {
                    fiveDollars.push(playerData[i]);
                } else if (total >= 22.00 && total < 29.00) {
                    fourDollars.push(playerData[i]);
                } else if (total >= 15.00 && total < 22.00) {
                    threeDollars.push(playerData[i]);
                } else if (total >= 8.00 && total < 15.00) {
                    twoDollars.push(playerData[i]);
                } else {
                    oneDollar.push(playerData[i]);
                }
            }
          
            setOneDollarPlayers(oneDollar);
            setTwoDollarPlayers(twoDollars);
            setThreeDollarPlayers(threeDollars);
            setFourDollarPlayers(fourDollars);
            setFiveDollarPlayers(fiveDollars);
            setSixDollarPlayers(sixDollars);
            setSevenDollarPlayers(sevenDollars);
            
        }
        if (playerData.length > 0 && selectedSeason) {
            setPriceAllPlayers();
        }
    }, [selectedSeason, playerData])

    useEffect(() => {
        const addToRoster = async() => {
            
            setRoster([
                ...roster,
                selectedPlayer
            ]);
            /*console.log(selectedPlayer)
            if (selectedPlayer.substring(0,1) === "1") {
                console.log(oneDollarPlayers[0])
                console.log(selectedPlayer)
                setOneDollarPlayers(oneDollarPlayers.filter(player => player !== selectedPlayer));
            }
            else if (selectedPlayer.substring(0,1) === "2") {
                console.log(twoDollarPlayers[0])
                console.log(selectedPlayer)
                setTwoDollarPlayers(twoDollarPlayers.filter(player => player !== selectedPlayer));
            }
            else if (selectedPlayer.substring(0,1) === "3") {
                console.log(threeDollarPlayers[0])
                console.log(selectedPlayer)
                setThreeDollarPlayers(threeDollarPlayers.filter(player => player !== selectedPlayer));
            }
            else if (selectedPlayer.substring(0,1) === "4") {
                console.log(fourDollarPlayers[0])
                console.log(selectedPlayer)
                setFourDollarPlayers(fourDollarPlayers.filter(player => player !== selectedPlayer));
            }
            else if (selectedPlayer.substring(0,1) === "5") {
                console.log(fiveDollarPlayers[0])
                console.log(selectedPlayer)
                setOneDollarPlayers(oneDollarPlayers.filter(player => player !== selectedPlayer));
            }
            */
            setTeamSalary((teamSalary) => teamSalary + parseInt(selectedPlayer.substring(0,1)))
            
            /*if (teamSalary > 35) {
                deletePlayer(-1)
                console.log('keep it under 36')
            }*/
        }
        if (roster.length < 10 && selectedPlayer && (teamSalary + parseInt(selectedPlayer.substring(0,1))) <= 35) {
            addToRoster();
        } else {
            if (selectedPlayer) {
                console.log("Release a player to sign another. Team must have 10 players with a combined salary under $36");
                setErrorMessage("RELEASE A PLAYER TO SIGN ANOTHER. TEAM MUST HAVE 10 PLAYERS WITH A COMBINED SALARY OF $35 OR LESS");
            }
        }
    }, [selectedPlayer])

    useEffect(() => {
        const loadManagementError = async() => {
            if (roster.length < 9 && selectedPlayer && (teamSalary + parseInt(selectedPlayer.substring(0,1))) === 35) {
                setErrorMessage("Must have 10 players, load management!");
            }
        }
        loadManagementError();
    }, [selectedPlayer])

    columns = [
        { label: "NAME", accessor: "name" },
        { label: "PTS", accessor: "pts" },
        { label: "REB", accessor: "reb" },
        { label: "AST", accessor: "ast" },
        { label: "TOTALS", accessor: "totals" }
    ]
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...playerData].sort((a, b) => {
            
                if (sortField !== 'name') {
                    a = a.stats;
                    b = b.stats;
                }
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                let nonNumeric = ['name','teamAbbreviation'];
                if (!nonNumeric.includes(sortField)) {
                    if (typeof a[sortField] === 'string') {
                        a[sortField] = parseFloat(a[sortField]);
                    }
                    if (typeof b[sortField] === 'string') {
                        b[sortField] = parseFloat(b[sortField]);
                    }
                  
                    a[sortField] = a[sortField].toFixed(2);
                    b[sortField] = b[sortField].toFixed(2); 
                    return (a[sortField] - b[sortField]) * (sortOrder === "desc" ? 1 : -1);           
                }

                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "desc" ? 1 : -1)
                );

            });
            setPlayerData(sorted);
        }
    };

    function handlePlayerChange(e) {
        if (usedPlayers.includes(e.target.value)) {
            console.log('player already selected');
        } else {
            
            setSelectedPlayer(e.target.value);
            setUsedPlayers([
                ...usedPlayers,
                e.target.value
            ])
            console.log(usedPlayers)
        }
    }

    return (
     <div className="price-flex">
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$7 Players</option>

          {sevenDollarPlayers.map((player, index) => (
            <option key={index} value={"7" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$6 Players</option>

          {sixDollarPlayers.map((player, index) => (
            <option key={index} value={"6" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$5 Players</option>

          {fiveDollarPlayers.map((player, index) => (
            <option key={index} value={"5" + player['player_id'] + '|' +  player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$4 Players</option>

          {fourDollarPlayers.map((player, index) => (
            <option key={index} value={"4" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$3 Players</option>

          {threeDollarPlayers.map((player, index) => (
            <option key={index} value={"3" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$2 Players</option>

          {twoDollarPlayers.map((player, index) => (
            <option key={index} value={"2" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
        <select className="priceSelect" value="0" onChange={handlePlayerChange}>
          <option value="0">$1 Players</option>

          {oneDollarPlayers.map((player, index) => (
            <option key={index} value={"1" + player['player_id'] + '|' + player['player_name']}>{player['player_name']}</option>
          ))}
          
        </select>
     </div>
    );
};

//TOTALS TABLE BELOW
/*
<table>
<caption>
 Click on a stat header to sort all players by stat
</caption>
<TableHead columns={columns} handleSorting={handleSorting}/>
<TableBody columns={columns} tableData={playerData} />
</table>
*/
/*
    useEffect(() => {

        const setPriceAllPlayers = async() => {
            
            let players10 = [];
            let players9 = [];
            let players8 = [];
            let players7 = [];
            let players6 = [];
            let players5 = [];
            let players4 = [];
            let players3 = [];
            let players2 = [];
            let players1 = [];

            for (let i = 0; i < playerData.length; i++) {

            }
            playerData
        }
    })





    if (playerData.length > 0) {
        tenDollarPlayers = playerData.map((player, index) => 

            <option key={index} value={player['name']}>{player['name']}</option>);
    } 
 
    return (
        <div>
            <select value={tenDollarSelected} onChange={handleTenChange}>
                {playerData.map((player, index) => (
                    
                    <option key={index} value={Object.values(player)}>{Object.values(player)}</option>
                ))}
            </select> 
        </div>
    )
}
*/
export default Price;