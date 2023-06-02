+efg_pct +fta_rate -tm_tov_pct +oreb_pct -opp_efg_pct -opp_fta_rate +opp_tov_pct -opp_oreb_pct


const postFourFactorPtsByPlayerBySeason = async(obj) => {

    const url = `/boxscorefourfactors`;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('error!');
        console.log(error);
    }
}

const writeFourFactorPtsToDatabase = async() => {
    let seasons = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    for (let j = 0; j < seasons.length; j++) {
        let boxscores = await getJsonResponseJackarithm(`/boxscorefourfactors/${seasons[j]}/${playerid}`)

        let seasonTotal = 0;
        for (let i = 0; i < boxscores.length; i++) {
            let total = boxscores[i].efg_pct + boxscores[i].fta_rate - boxscores[i].tm_tov_pct + boxscores[i].oreb_pct - boxscores[i].opp_efg_pct - boxscores[i].opp_fta_rate + boxscores[i].opp_tov_pct - boxscores[i].opp_oreb_pct;
            seasonTotal += total;
        }
        fourFactorPts = seasonTotal / boxscores.length;
        let objToPost = {team_id: boxscores[0].team_id, player_id: boxscores[0].player_id, fourFactorPts: fourFactorPts, season: seasons[j]}
        let results = await postFourFactorPtsByPlayerBySeason(objToPost)
        console.log(results);
    }
}