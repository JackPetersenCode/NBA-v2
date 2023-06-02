import '../App.css';
import React, { useEffect, useState } from "react";

import hoop from "../apis/hoop";


const Odds = ({selectedSeason, game, homeTeamId, visitorTeamId, H_or_V}) => {

    const [moneyLine, setMoneyLine] = useState('');
    const [teamName, setTeamName] = useState('');
    const [gameDate, setGameDate] = useState('');

    useEffect(() => {
        const getTeamName = async() => {
            if (H_or_V === 'home') {
                let results = await hoop.get(`/api/boxScoreSummary/teamname/${homeTeamId}`);
                let name = results.data[0].team_name;
                if (name === 'Los Angeles Lakers') {
                    name = 'LALakers'
                } 
                else if ( name === 'LA Clippers') {
                    name = 'LAClippers';
                }
                else if (name === 'Portland Trail Blazers') {
                    name = 'Portland';
                } else {
                    let namesplit = name.split(' ');
                    if (namesplit.length === 3) {
                        name = namesplit[0] + namesplit[1];
                    } else {
                        name = namesplit[0];
                    }
                }
                setTeamName(name);
            } else {
                let results = await hoop.get(`/api/boxScoreSummary/teamname/${visitorTeamId}`);
                let name = results.data[0].team_name;
                if (name === 'Los Angeles Lakers') {
                    name = 'LALakers'
                } 
                else if ( name === 'LA Clippers') {
                    name = 'LAClippers';
                }
                else if (name === 'Portland Trail Blazers') {
                    name = 'Portland';
                } else {
                    let namesplit = name.split(' ');
                    if (namesplit.length === 3) {
                        name = namesplit[0] + namesplit[1];
                    } else {
                        name = namesplit[0];
                    }
                }
                setTeamName(name);
            }
        }
        if (homeTeamId && visitorTeamId) {
            getTeamName();
        }
    }, [game, homeTeamId, visitorTeamId, H_or_V])

    useEffect(() => {
        const fixTheDate = async() => {
            let date = game.game_date;
            let splitDate = date.split('-');
            
            if (splitDate[1].substring(0, 1) === '0') {
                setGameDate((splitDate[1] + splitDate[2]).substring(1))
            } else {
                setGameDate(splitDate[1] + splitDate[2]);
            }
        }
        if (homeTeamId && visitorTeamId) {
            fixTheDate();
        }
    }, [game, homeTeamId, visitorTeamId, H_or_V])

    useEffect(() => {
        const getMoneyLine = async() => {

            let results = await hoop.get(`/api/gambling/moneyline/home/${selectedSeason}/${teamName}/${gameDate}`);
            console.log(results.data);
            setMoneyLine(results.data[0].ml);
        }
        if(teamName) {
            getMoneyLine();
        }
    }, [game, teamName])

    return (
        <div>
            {moneyLine}
        </div>
    )
}

export default Odds;