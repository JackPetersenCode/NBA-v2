import React, {useState} from 'react';
import '../App.css';
import SeasonsDropdown from '../components/SeasonsDropdown';

import CarmeloFactor from '../components/CarmeloFactor';

const Home = () => {

    const [selectedSeason, setSelectedSeason] = useState('2022-2023');
    const [seasonsData, setSeasonsData] = useState([]);

    return (
        <div>
            <div className="cumStats">
            <h1>CUMULATIVE STATS</h1>
            CARMELO FACTOR: Player's hustle stats per minute * 100 + efg% - 100
            <br></br>
            MVP POINTS: sum of custom weights of player's traditional stats (MVP rankings)
            <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
            <br></br>
            <CarmeloFactor selectedSeason={selectedSeason} />
            </div>
        </div>
    );
};

export default Home;