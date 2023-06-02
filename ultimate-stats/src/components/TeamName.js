import React, { useEffect, useState } from "react";
import '../App.css';
import { TextField } from "@mui/material";

const TeamName = ({ submitFlag, setSubmitFlag, teamName, setTeamName }) => {

    function handleChange(e) {
        setTeamName({ value: e.target.value });
    }

    function handleSubmit(e) {
        setSubmitFlag(true);
    }

    function handleEnter(e) {
      setSubmitFlag(true);
  }

    return (
        <>
          {submitFlag ? '' : 
            <>
              <div className="team-name-label">
                Enter team name to begin:
              </div>
              <div className="textfield-div">
              <TextField 
                  fullWidth
                  id="outlined-basic"
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="'Newark Prairie Dogs'"
                  size="small"
                  style={{backgroundColor: 'white', borderRadius: '5px'}}
                  value={teamName.value}
                
                />
              </div>
              <input className="team-name-submit" type="submit" value="Submit" onClick={handleSubmit} />
            </>
          }
        </>
      );
}

export default TeamName;