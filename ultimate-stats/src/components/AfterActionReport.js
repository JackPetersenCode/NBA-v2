import React, { useEffect, useState } from "react";
import '../App.css';

const AfterActionReport = ({ gameResult }) => {

    useEffect(() => {

        const getReport = async() => {
            if (gameResult === 'You Win!') {
                console.log('goof')
            }
        }
        getReport()
    }, [])
}

export default AfterActionReport;