import { useState, useRef } from 'react';
import './Search.scss'
import { FaSpotify } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import axios from 'axios';

// DOCS >>> https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [storeData, setStoreData] = useState(null);
    const inputRef = useRef();

    const handleSubmit = async () => {
        console.log('submitted!');
        // console.log("Input Value: ", inputValue);
        const inputText = inputRef.current.value;
        const token = localStorage.getItem('token');
        setInputValue(inputText);
        // handleInputValue();

        const search = await axios.get('http://localhost:3000/api/v1/auth', {
            headers: {
                input: inputText,
                token: token
            }
        });

        console.log("Data:", search);
        setStoreData(search.data.data);
        inputRef.current.value = '';
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
            <div style={{ // change this to the ul buddy... oh hunter...
                position: 'absolute',
                top: 100,
                left: 10,
                textAlign: 'left',
                width: '80vw'
            }}>
                {storeData && 
                    storeData.items.map(item => {
                        return (
                                <ul style={{ // just test data, change this and obviously this is rendering out individual ul > li on each item. dumbbb.. lol 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 5,
                                    margin: 5,
                                    // padding: "10px",
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    <li style={{
                                        padding: 5,
                                        margin: 5,
                                        listStyleType: 'none'
                                    }}>{item.name} by {item.artists[0].name} ({item.album.release_date})</li>
                                </ul>
                        );
                    })
                }
            </div>
        </section>
    )
}

export default Search;