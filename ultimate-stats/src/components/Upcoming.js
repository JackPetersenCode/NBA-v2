import '../App.css';
import React, { useEffect, useState } from "react";

import ExpectedResults from "./ExpectedResults";
import hoop from "../apis/hoop";


const Upcoming = ({homeExpectedResults, 
                    setHomeExpectedResults, 
                    visitorExpectedResults, 
                    setVisitorExpectedResults }) => {

    const [upcomingGames, setUpcomingGames] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('2022-2023')

    useEffect(() => {
        const getUpcoming = async() => {
            const results = await hoop.get(`/api/gambling/upcominggames/${selectedSeason}`)
            setUpcomingGames(results.data);
            setSelectedSeason('2022-2023')
        }
        if (selectedSeason) {
            getUpcoming();
        }
    }, [selectedSeason])
    return (
        <div>
        {upcomingGames.map((game, index) => (
            <div key={index}>{<ExpectedResults homeExpectedResults={homeExpectedResults}
                                                                    setHomeExpectedResults={setHomeExpectedResults}
                                                                    visitorExpectedResults={visitorExpectedResults}
                                                                    setVisitorExpectedResults={setVisitorExpectedResults}
                                                                    game={game} 
                                                                    selectedSeason={selectedSeason} 
                                                                    setSelectedSeason={setSelectedSeason} />}</div>
        ))}
        </div>
    )
}           


export default Upcoming;