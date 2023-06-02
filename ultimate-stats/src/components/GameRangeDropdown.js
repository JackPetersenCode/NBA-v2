import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";

const GameRangeDropdown = ({ gameRange, setGameRange, selectedGameRange, setSelectedGameRange }) => {


    useEffect(() => {
        
        let isSubscribed = true;
            const getGameRange = async() => {
                setGameRange([{range: 2}])
            }
            getGameRange();
            return () => isSubscribed = false;
      }, [setGameRange])

    function handleGameRangeChange(event) {
        setSelectedGameRange(event.target.value);
        console.log(selectedGameRange)
    }

    return (
        <div>
        <select value={selectedGameRange} onChange={handleGameRangeChange}>
          <option value="0">Select Game Range</option>

          {gameRange.map((option, index) => (
            <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        </div>
    );
        
};
        
export default GameRangeDropdown;