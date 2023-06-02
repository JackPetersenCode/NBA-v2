import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

const ErrorMessages = ({ errorMessage, setErrorMessage, roster }) => {
    
    useEffect(() => {
        const resetError = async() => {
            setErrorMessage('');
        }
        //if (errorMessage === 'MUST DRAFT 10 PLAYERS' && roster.length === 10) {
        resetError();
        //}
    }, [roster])

    return (
        <div className="errorMessage">
            { roster ? errorMessage : '' }
        </div>
    )

}

export default ErrorMessages;