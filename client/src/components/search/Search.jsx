import { useState, useRef } from 'react';
import './Search.scss'
import { FaSpotify } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import axios from 'axios';

// DOCS >>> https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs

function Search() {
    // const [inputValue, setInputValue] = useState('');
    const [storeData, setStoreData] = useState(null);
    const inputRef = useRef();

    const handleSubmit = async () => {
        console.log('submitted!');
        // console.log("Input Value: ", inputValue);
        const inputText = inputRef.current.value;
        const token = localStorage.getItem('token');
        // setInputValue(inputText);
        // handleInputValue();

        const search = await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
            headers: {
                input: inputText,
                token: token
            }
        });

        console.log("Data:", search);
        setStoreData(search.data.data);
        inputRef.current.value = '';
    }

    const millisToMinutes = (ms) => { // https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    return (
        <>
            <div className="SearchBar">
                <label htmlFor="search"><FaSpotify className="SpotifyIcon" /></label>
                <input placeholder="artist, album, song..." id="search-input" ref={inputRef} />
                <TbMusicSearch className="SearchIcon" onClick={handleSubmit} />
            </div>

            {/* Scrollable Table Below */}
            <div className="spotify-table-container">
           {storeData && storeData.tracks?.items?.length > 0 && (
            <table className="spotify-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Release</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tbody>
                {storeData.tracks.items.map((track, index) => (
                    <tr key={track.id}>
                    <td>{index + 1}</td>
                    <td className="title-cell">
                        <img src={track.album.images[2]?.url} alt="album" />
                        <div>
                        <div className="track-name">{track.name}</div>
                        <div className="artist-name">
                            {track.artists.map(a => a.name).join(', ')}
                        </div>
                        </div>
                    </td>
                    <td>{track.album.name}</td>
                    <td>{track.album.release_date}</td>
                    <td>{millisToMinutes(track.duration_ms)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            </div>
        </>
    )
}

export default Search;