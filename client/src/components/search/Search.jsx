import { useState, useRef } from 'react';
import './Search.scss'
import { FaSpotify } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import axios from 'axios';

// DOCS >>> https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs

function Search() {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();

    const handleSubmit = () => {
        console.log('submitted!');
        // console.log("Input Value: ", inputValue);
        const inputText = inputRef.current.value;
        const token = localStorage.getItem('token');
        setInputValue(inputText);
        // handleInputValue();

        axios.get('http://localhost:3000/api/v1/auth', {
            headers: {
                input: inputText,
                token: token
            }
        })
    }

    // const handleInputValue = () => {
    //     // e.preventDefault();

    //     setInputValue(inputRef.current.value);
    // }
    return (
        <section className="SearchBar">
            <label name="search"><FaSpotify className="SpotifyIcon"/></label>
            <input htmlFor='search' placeholder='song, artist, track...' id="search-input" ref={inputRef} />
            <TbMusicSearch className="SearchIcon" onClick={handleSubmit}/>
            {/* <p>Current Value: {inputValue}</p> */}
            {console.log("Input Value:", inputValue)}
        </section>
    )
}

export default Search;