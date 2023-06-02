import React, {useState, useEffect} from "react";

const LeadersStatTable = ({stat, index, statLabels, selectedSeason}) => {

    console.log(statLabels[index].label)
    return (
            <>
            <div className="stat-label">
                {statLabels[index].label}
            </div>
            <div className="leaders-header-line">
            </div>
            <table>
                <tbody>
                    {stat.map((player, i) => (
                         <tr key={i}>
                            <td style={{textAlign: 'center'}}>
                                {i+1}.
                            </td>
                            <td>
                                {player.player_name} <span className="team-abbreviation">{" " + player.team_abbreviation}</span>

                            </td>
                            <td style={{textAlign: 'right'}}>
                                {statLabels[index].accessor === 'fg3m' || statLabels[index].accessor === 'plus_minus' ? player[statLabels[index].accessor]
                                : player[statLabels[index].accessor].toFixed(2)}
                            </td>
                         </tr>                       
                    ))}
                </tbody>
            </table>
            </>
    )
}

export default LeadersStatTable;