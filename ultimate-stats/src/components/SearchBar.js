import React, {useState, useEffect, useRef} from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import "../App.css";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import SearchList from './SearchList';

const ContainerDiv = styled.div`
    position: relative;
`

const TextDiv = styled.div`
`
const DropdownStyle = styled.div`
    position: absolute;
`

const SearchBar = ({ allPlayers, inputText, setInputText, selectedPlayer, setSelectedPlayer }) => {

    let navigate = useNavigate();
    let refTwo = useRef(null);

    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    let handleEnter = (e) => {
      if (e.key === 'Enter') {
        console.log(inputText)
        //navigate(`/${inputText}`)
      }
    }

    return (
      <ContainerDiv ref={refTwo} >
        <TextDiv>
          <TextField 
            fullWidth
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Find Player"
            size="small"
            style={{backgroundColor: 'white', borderRadius: '5px'}}
            value={inputText}
            InputProps={{
                endAdornment: <InputAdornment position="start"><Link to={`/${inputText}`}><div className='search-icon'><SearchIcon  /></div></Link></InputAdornment>,
            }}
            onKeyDown={handleEnter}
          />
        </TextDiv>
        {
        <DropdownStyle>
          {allPlayers.length > 0 && inputText.length > 0 ?
            <SearchList refTwo={refTwo} inputText={inputText} setInputText={setInputText} data={allPlayers} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} /> 
            : 
          ''}
        </DropdownStyle>
        }
      </ContainerDiv>
    );
}

export default SearchBar;