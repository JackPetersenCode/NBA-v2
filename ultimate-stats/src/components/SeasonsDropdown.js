import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";

const SeasonsDropdown = ({ setSeasonsData, selectedSeason, setSelectedSeason, predictions }) => {

/*
    useEffect(() => {
        
        let isSubscribed = true;
            const getSeasons = async() => {
                if (isSubscribed) {
                    setSeasonsData([
                        {season: '2015-2016'},
                        {season: '2016-2017'},
                        {season: '2017-2018'},
                        {season: '2018-2019'},
                        {season: '2019-2020'},
                        {season: '2020-2021'},
                        {season: '2021-2022'},
                        {season: '2022-2023'}
                    ])
                }
            }
            getSeasons();
            return () => isSubscribed = false;
      }, [])
*/  let seasonsData;
    if(predictions) {
        seasonsData = [
            {season: '2016-2017'},
            {season: '2017-2018'},
            {season: '2018-2019'},
            {season: '2019-2020'},
            {season: '2020-2021'},
            {season: '2021-2022'},
            {season: '2022-2023'}
        ]
    } else {
        seasonsData = [
            {season: '2015-2016'},
            {season: '2016-2017'},
            {season: '2017-2018'},
            {season: '2018-2019'},
            {season: '2019-2020'},
            {season: '2020-2021'},
            {season: '2021-2022'},
            {season: '2022-2023'}
        ]
    }
    function handleSeasonChange(event) {
        event.preventDefault();
        if (event.target.value === "0") {
            return;
        }
        setSelectedSeason(event.target.value);
        console.log(selectedSeason)
    }

    return (
        <div className="season-flex">
          <div className="drop-title">
              SEASON
          </div>
          <div className='select-wrapper'>
            <select  className='season-select' value={selectedSeason} onChange={handleSeasonChange}>
              <option className='season-option' value="0">Select Season</option>
    
              {seasonsData.map((option, index) => (
                <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
              ))}
              
            </select>
          </div>
        </div>
    );
        
};
        
export default SeasonsDropdown;