import React, { useEffect, useState } from "react";
import '../App.css';
import { orderBy } from "lodash";

import hoop from "../apis/hoop";


const MatchupResults = ({ lockFlag, 
                          setLockFlag, 
                          dragRoster, 
                          selectedSeason, 
                          roster, 
                          cpuRoster, 
                          setCpuRoster, 
                          gameResultsUser,
                          setGameResultsUser, 
                          gameResultsCpu, 
                          setGameResultsCpu,
                          totalRatingUser, 
                          setTotalRatingUser,
                          totalRatingCpu,
                          setTotalRatingCpu }) => {

    const [winLoss, setWinLoss] = useState('');

    /*useEffect(() => {
        const setDragRosterAfterDrag = async() => {
            console.log('drag reset')
            let orderedCpu = orderBy(cpuRoster, "salary", "desc");
            let arr = dragRoster.map(player => player.rosterPlayer.substring(1, player.rosterPlayer.indexOf('|')));
            let playerString = arr.join(',');
            let arrCpu = orderedCpu.map(player => player.player.player_id);
            let cpuString = arrCpu.join(',');
            setPlayerIdString(playerString);
            setCpuIdString(cpuString);
        }
        if (dragRoster.length === 10) {
            setDragRosterAfterDrag();
        }
    }, [dragRoster])
*/

    useEffect(() => {
        const getUserExpected = async() => {
            /**
             * 3 PT SHOOTING, EFG SHOOTING
             * 
             * PAINT POINTS/SHOOTING
             * 
             * DEFENSE
             * 
             * TRACK FGA AND CONTESTED FGA
             * 
             * FTA AND FT PCT
             * -FTA RATE
             * -POINTS PTS PAINT
             * 
             * DREB %, OREB %
             * 
             * TURNOVERS
             */

            //let shooting = await hoop.get(`/shooting/${selectedSeason}/${playerIdString}`);
            //console.log(shooting.data.players)

            //let defense = await hoop.get(`/defense/${selectedSeason}/${playerIdString}`);
            //console.log(defense.data.players)

            let arr = dragRoster.map(player => player.rosterPlayer.substring(1, player.rosterPlayer.indexOf('|')));
            let startersUser = arr.slice(0, 5);
            let benchUser = arr.slice(5);
            let startersIdStringUser = startersUser.join(',');
            let benchIdStringUser = benchUser.join(',');

            let orderedCpu = orderBy(cpuRoster, "salary", "desc");
            let arrCpu = orderedCpu.map(player => player.player.player_id);
            let startersCpu = arrCpu.slice(0, 5);
            let benchCpu = arrCpu.slice(5);
            let startersIdStringCpu = startersCpu.join(',');
            let benchIdStringCpu = benchCpu.join(',');

            const getFinishing = async(idString) => {
                let finishing = await hoop.get(`/api/shots/finishing/${selectedSeason}/${idString}`)
                return finishing.data;
            }

            const getShooting = async(idString) => {
                let shooting = await hoop.get(`/api/shots/shooting/${selectedSeason}/${idString}`)
                return shooting.data;
            }

            const getReboundingDefense = async(idString) => {
                let reboundingDefense = await hoop.get(`/api/shots/reboundingdefense/${selectedSeason}/${idString}`)
                return reboundingDefense.data;
            }

            const getPlaymaking = async(idString) => {
                let playmaking = await hoop.get(`/api/shots/playmaking/${selectedSeason}/${idString}`)
                return playmaking.data;
            }

            //Finishing
            
            let finishingStartersUser = await getFinishing(startersIdStringUser);
            let finishingStartersCpu = await getFinishing(startersIdStringCpu);
            let finishingBenchUser = await getFinishing(benchIdStringUser);
            let finishingBenchCpu = await getFinishing(benchIdStringCpu);
            //Shooting

            let shootingStartersUser = await getShooting(startersIdStringUser);
            let shootingStartersCpu = await getShooting(startersIdStringCpu);
            let shootingBenchUser = await getShooting(benchIdStringUser);
            let shootingBenchCpu = await getShooting(benchIdStringCpu);
            //Rebounding/defense
            
            let reboundingDefenseStartersUser = await getReboundingDefense(startersIdStringUser);
            let reboundingDefenseStartersCpu = await getReboundingDefense(startersIdStringCpu);
            let reboundingDefenseBenchUser = await getReboundingDefense(benchIdStringUser);
            let reboundingDefenseBenchCpu = await getReboundingDefense(benchIdStringCpu);


            //Playmaking
            let playmakingStartersUser = await getPlaymaking(startersIdStringUser);
            let playmakingStartersCpu = await getPlaymaking(startersIdStringCpu);
            let playmakingBenchUser = await getPlaymaking(benchIdStringUser);
            let playmakingBenchCpu = await getPlaymaking(benchIdStringCpu);

            //FINISHING
            
            const initialFinishing = 0;
            const sumFinishingStartersUser = finishingStartersUser.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue.count),
              initialFinishing
            );
            console.log(sumFinishingStartersUser);

            const sumFinishingStartersCpu = finishingStartersCpu.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue.count),
              initialFinishing
            );

            const sumFinishingBenchUser = finishingBenchUser.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue.count),
              initialFinishing
            );

            const sumFinishingBenchCpu = finishingBenchCpu.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue.count),
              initialFinishing
            );

            const initialShooting = 0;
            const sumShootingStartersUser = shootingStartersUser.reduce(
                (accumulator, currentValue, currentIndex) => 
                    accumulator + (currentValue.efg ? parseFloat(currentValue.efg) : 0) + (parseFloat(currentValue.pts) * 100)
                    + (parseFloat(currentValue.fga) * 100) + (parseFloat(currentValue.fg3a) * 200),
              initialShooting
            );

            const sumShootingStartersCpu = shootingStartersCpu.reduce(
              (accumulator, currentValue) => accumulator + (currentValue.efg ? parseFloat(currentValue.efg) : 0) + (parseFloat(currentValue.pts) * 100)
                + (parseFloat(currentValue.fga) * 100) + (parseFloat(currentValue.fg3a) * 200),
              initialShooting
            );

            const sumShootingBenchUser = shootingBenchUser.reduce(
              (accumulator, currentValue, currentIndex) =>
                  accumulator + (currentValue.efg ? parseFloat(currentValue.efg) : 0) + (parseFloat(currentValue.pts) * 100)
                  + (parseFloat(currentValue.fga) * 100) + (parseFloat(currentValue.fg3a) * 200),
              initialShooting
            );
              
            const sumShootingBenchCpu = shootingBenchCpu.reduce(
              (accumulator, currentValue) => accumulator + (currentValue.efg ? parseFloat(currentValue.efg) : 0) + (parseFloat(currentValue.pts) * 100)
                + (parseFloat(currentValue.fga) * 100) + (parseFloat(currentValue.fg3a) * 200),
              initialShooting
            );
            console.log(sumShootingBenchCpu);

            const initialReboundingDefense = 0;
            const sumReboundingDefenseStartersUser = reboundingDefenseStartersUser.reduce(
              (accumulator, currentValue) => accumulator + (parseFloat(currentValue.blk) * 2000)
                + (parseFloat(currentValue.dreb) * 200) + (parseFloat(currentValue.hustle_factor) * 100)
                + (parseFloat(currentValue.oreb) * 200) + (parseFloat(currentValue.stl) * 1000),
              initialReboundingDefense
            );
            console.log(sumReboundingDefenseStartersUser);

            const sumReboundingDefenseStartersCpu = reboundingDefenseStartersCpu.reduce(
                (accumulator, currentValue) => accumulator + (parseFloat(currentValue.blk) * 2000)
                + (parseFloat(currentValue.dreb) * 200) + (parseFloat(currentValue.hustle_factor) * 100)
                + (parseFloat(currentValue.oreb) * 200) + (parseFloat(currentValue.stl) * 1000),
              initialReboundingDefense
            );

            console.log(sumReboundingDefenseStartersCpu);

            const sumReboundingDefenseBenchUser = reboundingDefenseBenchUser.reduce(
              (accumulator, currentValue) => accumulator + (parseFloat(currentValue.blk) * 2000)
                + (parseFloat(currentValue.dreb) * 200) + (parseFloat(currentValue.hustle_factor) * 100)
                + (parseFloat(currentValue.oreb) * 200) + (parseFloat(currentValue.stl) * 1000),
              initialReboundingDefense
            );
            console.log(sumReboundingDefenseBenchUser);

            const sumReboundingDefenseBenchCpu = reboundingDefenseBenchCpu.reduce(
                (accumulator, currentValue) => accumulator + (parseFloat(currentValue.blk) * 2000)
                + (parseFloat(currentValue.dreb) * 200) + (parseFloat(currentValue.hustle_factor) * 100)
                + (parseFloat(currentValue.oreb) * 200) + (parseFloat(currentValue.stl) * 1000),
              initialReboundingDefense
            );
            console.log(sumReboundingDefenseBenchCpu);

            const initialPlaymaking = 0;
            const sumPlaymakingStartersUser = playmakingStartersUser.reduce(
              (accumulator, currentValue) => accumulator + (parseFloat(currentValue.ast) * 100)
                + (parseFloat(currentValue.pts_2nd_chance) * 100) + (parseFloat(currentValue.pts_fb) * 100)
                + (parseFloat(currentValue.pts_off_tov) * 100),
              initialPlaymaking
            );
            console.log(sumPlaymakingStartersUser);

            const sumPlaymakingStartersCpu = playmakingStartersCpu.reduce(
                (accumulator, currentValue) => accumulator + (parseFloat(currentValue.ast) * 100)
                + (parseFloat(currentValue.pts_2nd_chance) * 100) + (parseFloat(currentValue.pts_fb) * 100)
                + (parseFloat(currentValue.pts_off_tov) * 100),
              initialPlaymaking
            );
            console.log(sumPlaymakingStartersCpu);

            const sumPlaymakingBenchUser = playmakingBenchUser.reduce(
              (accumulator, currentValue) => accumulator + (parseFloat(currentValue.ast) * 100)
                + (parseFloat(currentValue.pts_2nd_chance) * 100) + (parseFloat(currentValue.pts_fb) * 100)
                + (parseFloat(currentValue.pts_off_tov) * 100),
              initialPlaymaking
            );
            console.log(sumPlaymakingBenchUser);

            const sumPlaymakingBenchCpu = playmakingBenchCpu.reduce(
                (accumulator, currentValue) => accumulator + (parseFloat(currentValue.ast) * 100)
                + (parseFloat(currentValue.pts_2nd_chance) * 100) + (parseFloat(currentValue.pts_fb) * 100)
                + (parseFloat(currentValue.pts_off_tov) * 100),
              initialPlaymaking
            );
            console.log(sumPlaymakingBenchCpu);

         /* let sumFinishingUser = 0;
            let sumFinishingCpu = 0;
            let sumShootingUser = 0;
            let sumShootingCpu = 0;
            let sumReboundingDefenseUser = 0;
            let sumReboundingDefenseCpu = 0;
            let sumPlaymakingUser = 0;
            let sumPlaymakingCpu = 0;

            for(let i = 0; i < 10; i++) {
                if (i < 5) {
                    sumFinishingUser += parseFloat(finishingUser[i].count);
                    sumFinishingCpu += parseFloat(finishingCpu[i].count);
                    sumShootingUser += ((shootingUser[i].efg ? parseFloat(shootingUser[i].efg) : 0) + (parseFloat(shootingUser[i].pts) * 100)
                    + (parseFloat(shootingUser[i].fga) * 100) + (parseFloat(shootingUser[i].fg3a) * 200));
                    sumShootingCpu += ((shootingCpu[i].efg ? parseFloat(shootingCpu[i].efg) : 0) + (parseFloat(shootingCpu[i].pts) * 100)
                    + (parseFloat(shootingCpu[i].fga) * 100) + (parseFloat(shootingCpu[i].fg3a) * 200));
                    sumReboundingDefenseUser += ((parseFloat(reboundingDefenseUser[i].blk) * 1000)
                    + (parseFloat(reboundingDefenseUser[i].dreb) * 200) + (parseFloat(reboundingDefenseUser[i].hustle_factor) * 100)
                    + (parseFloat(reboundingDefenseUser[i].oreb) * 200) + (parseFloat(reboundingDefenseUser[i].stl) * 1000));
                    sumReboundingDefenseCpu += ((parseFloat(reboundingDefenseCpu[i].blk) * 1000)
                    + (parseFloat(reboundingDefenseCpu[i].dreb) * 200) + (parseFloat(reboundingDefenseCpu[i].hustle_factor) * 100)
                    + (parseFloat(reboundingDefenseCpu[i].oreb) * 200) + (parseFloat(reboundingDefenseCpu[i].stl) * 1000));
                    sumPlaymakingUser += ((parseFloat(playmakingUser[i].ast) * 100)
                    + (parseFloat(playmakingUser[i].pts_2nd_chance) * 100) + (parseFloat(playmakingUser[i].pts_fb) * 100)
                    + (parseFloat(playmakingUser[i].pts_off_tov) * 100));
                    sumPlaymakingCpu += ((parseFloat(playmakingCpu[i].ast) * 100)
                    + (parseFloat(playmakingCpu[i].pts_2nd_chance) * 100) + (parseFloat(playmakingCpu[i].pts_fb) * 100)
                    + (parseFloat(playmakingCpu[i].pts_off_tov) * 100));
                } else {
                    sumFinishingUser += (finishingUser[i] ? parseFloat(finishingUser[i].count) * 0.5 : 0);                    
                    sumFinishingCpu += (finishingCpu[i] ? parseFloat(finishingCpu[i].count) * 0.5 : 0);
                    sumShootingUser += (shootingUser[i] ? ((shootingUser[i].efg ? parseFloat(shootingUser[i].efg) : 0) + (parseFloat(shootingUser[i].pts) * 100)
                    + (parseFloat(shootingUser[i].fga) * 100) + (parseFloat(shootingUser[i].fg3a) * 200)) * 0.5 : 0);
                    sumShootingCpu += (shootingCpu[i] ? ((shootingCpu[i].efg ? parseFloat(shootingCpu[i].efg) : 0) + (parseFloat(shootingCpu[i].pts) * 100)
                    + (parseFloat(shootingCpu[i].fga) * 100) + (parseFloat(shootingCpu[i].fg3a) * 200)) * 0.5 : 0);
                    sumReboundingDefenseUser += (reboundingDefenseUser[i] ? ((parseFloat(reboundingDefenseUser[i].blk) * 1000)
                    + (parseFloat(reboundingDefenseUser[i].dreb) * 200) + (parseFloat(reboundingDefenseUser[i].hustle_factor) * 100)
                    + (parseFloat(reboundingDefenseUser[i].oreb) * 200) + (parseFloat(reboundingDefenseUser[i].stl) * 1000)) * 0.5 : 0);
                    sumReboundingDefenseCpu += (reboundingDefenseCpu[i] ? ((parseFloat(reboundingDefenseCpu[i].blk) * 1000)
                    + (parseFloat(reboundingDefenseCpu[i].dreb) * 200) + (parseFloat(reboundingDefenseCpu[i].hustle_factor) * 100)
                    + (parseFloat(reboundingDefenseCpu[i].oreb) * 200) + (parseFloat(reboundingDefenseCpu[i].stl) * 1000)) * 0.5 : 0);
                    sumPlaymakingUser += (playmakingUser[i] ? ((parseFloat(playmakingUser[i].ast) * 100)
                    + (parseFloat(playmakingUser[i].pts_2nd_chance) * 100) + (parseFloat(playmakingUser[i].pts_fb) * 100)
                    + (parseFloat(playmakingUser[i].pts_off_tov) * 100)) * 0.5 : 0);
                    sumPlaymakingCpu += (playmakingCpu[i] ? ((parseFloat(playmakingCpu[i].ast) * 100)
                    + (parseFloat(playmakingCpu[i].pts_2nd_chance) * 100) + (parseFloat(playmakingCpu[i].pts_fb) * 100)
                    + (parseFloat(playmakingCpu[i].pts_off_tov) * 100)) * 0.5 : 0);
                }
            }*/
            //FINISHING 100% === 2100
            //SHOOTING 100% === 1900
            //REBOUNDING-DEFENSE 100% === 2100
            //PLAYMAKING 100% === 400

            let finishingRatingUser = (((sumFinishingStartersUser * 100 + sumFinishingBenchUser * 50) / 1600) > 100 ? 100 : ((sumFinishingStartersUser * 100 + sumFinishingBenchUser * 50) / 1600));
            console.log(finishingRatingUser)
            let finishingRatingCpu = (((sumFinishingStartersCpu * 100 + sumFinishingBenchCpu * 50) / 1600) > 100 ? 100 : ((sumFinishingStartersCpu * 100 + sumFinishingBenchCpu * 50) / 1600));
            console.log(finishingRatingCpu)

            let shootingRatingUser = (((sumShootingStartersUser * 100 + sumShootingBenchUser * 50) / 1600) > 100 ? 100 : ((sumShootingStartersUser * 100 + sumShootingBenchUser * 50) / 1600));
            console.log(shootingRatingUser)
            let shootingRatingCpu = (((sumShootingStartersCpu * 100 + sumShootingBenchCpu * 50) / 1600) > 100 ? 100 : ((sumShootingStartersCpu * 100 + sumShootingBenchCpu * 50) / 1600));
            console.log(shootingRatingCpu)

            let reboundingDefenseRatingUser = (((sumReboundingDefenseStartersUser * 100 + sumReboundingDefenseBenchUser * 50) / 1600) > 100 ? 100 : ((sumReboundingDefenseStartersUser * 100 + sumReboundingDefenseBenchUser * 50) / 1600));
            console.log(reboundingDefenseRatingUser)
            let reboundingDefenseRatingCpu = (((sumReboundingDefenseStartersCpu * 100 + sumReboundingDefenseBenchCpu * 50) / 1600) > 100 ? 100 : ((sumReboundingDefenseStartersCpu * 100 + sumReboundingDefenseBenchCpu * 50) / 1600));
            console.log(reboundingDefenseRatingCpu)

            let playmakingRatingUser = (((sumPlaymakingStartersUser * 100 + sumPlaymakingBenchUser * 50) / 300) > 100 ? 100 : ((sumPlaymakingStartersUser * 100 + sumPlaymakingBenchUser * 50) / 300));
            console.log(playmakingRatingUser)
            let playmakingRatingCpu = (((sumPlaymakingStartersCpu * 100 + sumPlaymakingBenchCpu * 50) / 300) > 100 ? 100 : ((sumPlaymakingStartersCpu * 100 + sumPlaymakingBenchCpu * 50) / 300));
            console.log(playmakingRatingCpu)

            let resultsArrayUser = [finishingRatingUser.toFixed(2), shootingRatingUser.toFixed(2), reboundingDefenseRatingUser.toFixed(2), playmakingRatingUser.toFixed(2)];
            let resultsArrayCpu = [finishingRatingCpu.toFixed(2), shootingRatingCpu.toFixed(2), reboundingDefenseRatingCpu.toFixed(2), playmakingRatingCpu.toFixed(2)];
            setGameResultsUser(resultsArrayUser);
            setGameResultsCpu(resultsArrayCpu);
        }
        if (cpuRoster.length === 10 && roster.length === 10) {
            getUserExpected();
        }
    }, [cpuRoster])

    let columns = ['Finishing', 'Shooting', 'Rebounding/Defense', 'Playmaking'];

    useEffect(() => {
        const getTotalResult = async() => {

            const initialTotal = 0;
            let totalUser = gameResultsUser.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue),
              initialTotal
            )
            console.log(totalUser)
            
            let totalCpu = gameResultsCpu.reduce(
              (accumulator, currentValue) => accumulator + parseFloat(currentValue),
              initialTotal
            )
            console.log(totalCpu)

            //setTotalRatingUser(parseInt(totalUser / 3));
            //setTotalRatingCpu(parseInt(totalCpu / 3));
            let user = Math.round(totalUser / 3);
            let cpu = Math.round(totalCpu / 3);

            if (user > cpu) {
                setWinLoss('YOU WIN');
                setTotalRatingUser(user);
                setTotalRatingCpu(cpu);
            } else if (user === cpu) {
                setWinLoss('YOU WIN');
                setTotalRatingUser(user + 1);
                setTotalRatingCpu(cpu);
            } else {
                setWinLoss('GO BACK TO THE G-LEAGUE');
                setTotalRatingUser(user);
                setTotalRatingCpu(cpu);
            }
        }
        if (gameResultsUser.length > 0 && gameResultsCpu.length > 0) {
            getTotalResult();
            setLockFlag(false);
        }
    }, [gameResultsCpu])

    
    return (
      <h2 className="matchupResults">
        {winLoss ? winLoss : ''}
        <br>
        </br>
        {winLoss ? totalRatingUser.toString() + ' - ' + totalRatingCpu.toString() : ''}
      </h2>
    );
}

export default MatchupResults;