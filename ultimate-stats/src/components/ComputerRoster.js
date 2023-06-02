import React, { useEffect, useState } from "react";
import '../App.css';
import CpuTableBody from "./CpuTableBody";
import { orderBy } from "lodash";

const ComputerRoster = ({ selectedSeason, 
                            usedPlayer,
                            setUsedPlayer,
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
                            setSevenDollarPlayers,
                            roster,
                            cpuRoster,
                            setCpuRoster,
                            lockFlag,
                            setLockFlag
                         }) => {

    const [priceArray, setPriceArray] = useState([]);

    useEffect(() => {
        const getComputerPriceArray = async() => {
            console.log('triggered')

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
            }
            
            while (true) {
                let array = [
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8),
                    getRandomInt(1, 8)
                ]
                console.log(array)
                let sumWithInitial = array.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
                if (sumWithInitial === 35) {
                    setPriceArray(array);
                    break;
                }
            }
            //setLockFlag(false)
        }
        if (lockFlag) {
            console.log(lockFlag)
            getComputerPriceArray();
        }
    }, [lockFlag])

    useEffect(() => {
        const getComputerRoster = async() => {
            let compRoster = [];
            let compNameRoster = [];

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
            }

            for (let i = 0; i < 10; i++) {
                let player;
                if (priceArray[i] === 1) {
                    player = { player: oneDollarPlayers[getRandomInt(0, oneDollarPlayers.length)], salary: 1 };

                    while (roster.includes("1" + player.player.player_id + '|' + player.player.player_name || compNameRoster.includes(player.player.player_id))) {
                        console.log('chicken')

                        player = { player: oneDollarPlayers[getRandomInt(0, oneDollarPlayers.length)], salary: 1 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id)
                }
                if (priceArray[i] === 2) {
                    player = { player: twoDollarPlayers[getRandomInt(0, twoDollarPlayers.length)], salary: 2 };
                    while (roster.includes("2" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')

                        player = { player: twoDollarPlayers[getRandomInt(0, twoDollarPlayers.length)], salary: 2 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id)
                }
                if (priceArray[i] === 3) {
                    player = { player: threeDollarPlayers[getRandomInt(0, threeDollarPlayers.length)], salary: 3 };

                    while (roster.includes("3" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')

                        player = { player: threeDollarPlayers[getRandomInt(0, threeDollarPlayers.length)], salary: 3 };
                    }
                    compRoster.push(player);
                    compNameRoster.push(player.player.player_id); 
                }
                if (priceArray[i] === 4) {
                    player = { player: fourDollarPlayers[getRandomInt(0, fourDollarPlayers.length)], salary: 4 };
                    while (roster.includes("4" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')

                        player = { player: fourDollarPlayers[getRandomInt(0, fourDollarPlayers.length)], salary: 4 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id)
                }
                if (priceArray[i] === 5) {
                    player = { player: fiveDollarPlayers[getRandomInt(0, fiveDollarPlayers.length)], salary: 5 };

                    while (roster.includes("5" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')

                        player = { player: fiveDollarPlayers[getRandomInt(0, fiveDollarPlayers.length)], salary: 5 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id) 
                }
                if (priceArray[i] === 6) {
                    player = { player: sixDollarPlayers[getRandomInt(0, sixDollarPlayers.length)], salary: 6};

                    while (roster.includes("6" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')

                        player = { player: sixDollarPlayers[getRandomInt(0, sixDollarPlayers.length)], salary: 6 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id) 
                }
                if (priceArray[i] === 7) {
                    player = { player: sevenDollarPlayers[getRandomInt(0, sevenDollarPlayers.length)], salary: 7 };

                    while (roster.includes("7" + player.player.player_id + '|' + player.player.player_name) || compNameRoster.includes(player.player.player_id)) {
                        console.log('chicken')
                        player = { player: sevenDollarPlayers[getRandomInt(0, sevenDollarPlayers.length)], salary: 7 };
                    }
                    compRoster.push(player)
                    compNameRoster.push(player.player.player_id)
                    console.log(player.player.player_id)
                }
            }
            console.log(roster)
            console.log(compRoster)
            console.log(compNameRoster)
            let orderedCpu = orderBy(compRoster, "salary", "desc");

            setCpuRoster(orderedCpu);
        }
        if (priceArray.length === 10 && roster.length === 10) {
            getComputerRoster();
        }
    }, [priceArray])
    
    let columns = [
        {label: 'CPU Roster', accessor: 'player_name'}
    ];
    
    return (
        <>
            <div className="center">
                <CpuTableBody columns={columns} tableData={cpuRoster} />
            </div>
        </>
    )
}

export default ComputerRoster;