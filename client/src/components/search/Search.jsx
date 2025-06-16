import './Search.scss'
import { FaSpotify } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";

function Search() {
    return (
        <section className="SearchBar">
            <label name="search"><FaSpotify className="SpotifyIcon"/></label>
            <input htmlFor='search' placeholder='song, artist, track...' id="search-input" />
            <TbMusicSearch className="SearchIcon"/>
        </section>
    )
}

export default Search;