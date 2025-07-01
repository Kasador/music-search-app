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
            <div style={{
                position: 'absolute',
                top: 100,
                left: 10,
                textAlign: 'left',
                width: '80vw',
                color: 'white'
            }}>
                {/* Tracks */}
                {storeData?.tracks?.items?.length > 0 && (
                    <>
                        <h3>Tracks</h3>
                        <ul>
                            {storeData.tracks.items.map((track, index) => (
                                <li key={`track-${index}`}>
                                    {track.name} by {track.artists[0]?.name} ({track.album?.release_date})
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Albums */}
                {storeData?.albums?.items?.length > 0 && (
                    <>
                        <h3>Albums</h3>
                        <ul>
                            {storeData.albums.items.map((album, index) => (
                                <li key={`album-${index}`}>
                                    {album.name} by {album.artists[0]?.name} ({album.release_date})
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Artists */}
                {storeData?.artists?.items?.length > 0 && (
                    <>
                        <h3>Artists</h3>
                        <ul>
                            {storeData.artists.items.map((artist, index) => (
                                <li key={`artist-${index}`}>
                                    {artist.name}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </section>
    )
}

export default Search;