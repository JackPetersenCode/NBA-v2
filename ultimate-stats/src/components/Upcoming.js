import '../App.css';
import React, { useEffect, useState } from "react";

import ExpectedResults from "./ExpectedResults";
import hoop from "../apis/hoop";


const Upcoming = ({homeExpectedResults, 
                    setHomeExpectedResults, 
                    visitorExpectedResults, 
                    setVisitorExpectedResults }) => {

    const [upcomingGames, setUpcomingGames] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('2023-2024')

    useEffect(() => {
        const getUpcoming = async() => {
            const results = await hoop.get(`/api/gambling/upcominggames/${selectedSeason}`)
            setUpcomingGames(results.data);
            setSelectedSeason('2023-2024')
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