import React, {useState, useEffect} from "react";
import hoop from "../apis/hoop";
import Table from "./Table";

const CareerStats = ({player_id, selectedPlayer}) => {

    const [statlines, setStatlines] = useState([]);
    const [thisSeasonLine, setThisSeasonLine] = useState([]);

    console.log(player_id)
    let columns = [
        { label: "SEASON", accessor: "season_id" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "PTS", accessor: "pts" },
        { label: "FGM", accessor: "fgm" },
        { label: "FGA", accessor: "fga" },
        { label: "FG PCT", accessor: "fg_pct" },
        { label: "FG3M", accessor: "fg3m" },
        { label: "FG3A", accessor: "fg3a" },
        { label: "FG3 PCT", accessor: "fg3_pct" },
        { label: "FTM", accessor: "ftm" },
        { label: "FTA", accessor: "fta" },
        { label: "FT PCT", accessor: "ft_pct" },
        { label: "OREB", accessor: "oreb" },
        { label: "DREB", accessor: "dreb" },
        { label: "REB", accessor: "reb" },
        { label: "AST", accessor: "ast" },
        { label: "STL", accessor: "stl" },
        { label: "BLK", accessor: "blk" },
        { label: "TOV", accessor: "tov" },

    ];

    useEffect(() => {

        const getCareerStats = async() => {
            let seasons = [
                {season: '2015-2016'},
                {season: '2016-2017'},
                {season: '2017-2018'},
                {season: '2018-2019'},
                {season: '2019-2020'},
                {season: '2020-2021'},
                {season: '2021-2022'},
                {season: '2022-2023'}
            ]
/*
            let statlines = seasons.map(async(season, index) => {
                console.log(season)
                console.log(player_id)
                let results = await hoop.get(`/api/statranked/career/${season.season}/${player_id.player_id}`)
                console.log(results.data)
                return results.data;
            })
           */ 
            let results = await hoop.get(`/api/regularSeasonStats/getregularseasonstatlines/${typeof player_id === 'string' ? player_id : player_id.player_id}`)
            console.log(results.data)
            setStatlines(results.data)
            let season = '2022-2023';
            let results2 = await hoop.get(`/api/statranked/career/${season}/${typeof player_id === 'string' ? player_id : player_id.player_id}`)
            console.log(results2.data)

            setThisSeasonLine(results2.data.map((element, index) => {
                console.log(element)
                return {...element, season_id: '2022-23'};
             }));
        }
        if (player_id) {
            getCareerStats();
        }
    }, [player_id])

    return (
        <div className="career-div">
            <h2 style={{textAlign: 'left'}}>
                {selectedPlayer !== '0' ? selectedPlayer : ''}
            </h2>
            {player_id && selectedPlayer ?
            <table className="career-table">
                <thead>
                  <tr>
                  {columns.map(({ label, accessor }) => {
                   return (
                    <th key={accessor} className="header-item">
                     {label}
                    </th>
                   );
                  })}
                  </tr>
                </thead>
                <tbody>
                  {statlines.map((data, index) => {
                    return (
                      <tr key={index}>
                        {columns.map(({ accessor }) => {
                          let tData;
                          if (accessor === 'player_name' ) {
                            tData = data[accessor] ? data[accessor] : "——";
                          }
                          else if (accessor === 'totals') {
                            tData = parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) ? 
                                    parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) : "——";
                          } else if (accessor === 'fg_pct' || accessor === 'fg3_pct' || accessor === 'ft_pct' || accessor === 'team_abbreviation' || accessor === 'season_id') {
                              tData = data[accessor] ? data[accessor] : "——";
                          } else { 
                            tData = data[accessor] ? data[accessor] / parseInt(data['gp']) : "——";
                          }
                          if (typeof tData === 'number') {
                            tData = tData.toFixed(2);
                          }
     
                          return <td key={accessor}>{tData}</td>;
                        })}
                      </tr>
                    );
                 })}
                 {thisSeasonLine ? thisSeasonLine.map((data, index) => {
                    console.log(thisSeasonLine)
                    return (
                      <tr key={index}>
                        {columns.map(({ accessor }) => {
                          let tData;
                          if (accessor === 'player_name' ) {
                            tData = data[accessor] ? data[accessor] : "——";
                          }
                          else if (accessor === 'totals') {
                            tData = parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) ? 
                                    parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) : "——";
                          } else if (accessor === 'fg_pct' || accessor === 'fg3_pct' || accessor === 'ft_pct' || accessor === 'team_abbreviation' || accessor === 'season_id') {
                            tData = data[accessor] ? data[accessor] : "——";
                          } else {  
                            tData = data[accessor] ? data[accessor] : "——";
                          }
                          if (typeof tData === 'number') {
                            tData = tData.toFixed(2);
                          }
    
                          return <td key={accessor}>{tData}</td>;
                        })}
                      </tr>
                    );
                 }) 
                :
                ''}
                </tbody>
            </table>
            :
            ''}
        </div>
    )
}

export default CareerStats;