import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ExpectedResults from "./ExpectedResults";
import ExpectedFromRoster from "./ExpectedFromRoster";

const StatMinTotals = ({}) => {
    
    const [totalStat, setTotalStat] = useState('+/-');
    const [totalMins, setTotalMins] = useState(0);

    useEffect(() => {

        const getTotals = async() => {
            
        }
    })
}