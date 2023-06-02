import '../App.css';
import React, { useEffect, useState } from "react";
import TableAdvanced from "./TableAdvanced";
import Table from "./Table";
import HustleTable from "./HustleTable";
import TableMisc from './TableMisc';


const TableDropdown = ({ tableName, setTableName, setTables, tableChoice, setTableChoice, selectedSeason, setSelectedSeason }) => {

/*
    useEffect(() => {
        
        let isSubscribed = true;
            const getTables = async() => {
                if (isSubscribed) {
                    setTables([
                        {stats: 'traditional'},
                        {stats: 'misc'},
                        {stats: 'hustle'}
                    ])
                }
            }
            if (selectedSeason) {
                getTables();
            }
            return () => isSubscribed = false;
      }, [])
*/
    const tables = [
        {stats: 'Traditional'},
        {stats: 'Miscellaneous'},
        {stats: 'Hustle'}
    ]

    useEffect(() => {

        const getTable = async() => {
            if (tableName === 'Traditional') {
                setTableChoice(<Table selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            } else if (tableName === 'Miscellaneous') {
                setTableChoice(<TableMisc selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            } else if (tableName === 'Hustle') {
                setTableChoice(<HustleTable selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            }
        }
        if (tableName) {
            getTable();
        }
    }, [selectedSeason, tableName])

    function handleTableChange(event) {
        event.preventDefault();
        if (event.target.value === "0") {
            return;
        }
        else if (event.target.value === 'Traditional') {
            //setTableChoice(<Table selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            setTableName('Traditional');
        } else if (event.target.value === 'Miscellaneous') {
            //setTableChoice(<TableMisc selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            setTableName('Miscellaneous');
        } else if (event.target.value === 'Hustle') {
            //setTableChoice(<HustleTable selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />);
            setTableName('Hustle');
        }
        console.log(selectedSeason)
    }

    return (
        <div className="season-flex">
          <div className="drop-title">
              STAT CATEGORY
          </div>
          <div className='select-wrapper'>
          <select className='season-select' value={tableName} onChange={handleTableChange}>
            <option value="0">Select Stats</option>
  
            {tables.map((option, index) => (
              <option className='season-option' key={index} value={Object.values(option)}>{Object.values(option)}</option>
            ))}
          </select>
          </div>
        </div>
    );
        
};
        
export default TableDropdown;