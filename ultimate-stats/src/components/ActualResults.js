import '../App.css';
import React, { useEffect, useState } from "react";


const ActualResults = ({ game, H_or_V }) => {

    const [actual, setActual] = useState(0);


    useEffect(() => {
        const getResults = async() => {
            if (H_or_V === 'home') {
                setActual(parseFloat(game.pts).toFixed(0))
            } else {
                setActual((parseFloat(game.pts) - parseFloat(game.plus_minus)).toFixed(0))
            }
        }
        if (game) {
            getResults();
        }
    }, [game, H_or_V])

    return (
        <>
            {actual}
        </>
    )
}

export default ActualResults;