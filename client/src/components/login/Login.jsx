// image for bg of login
import LoginBG from '../../assets/images/login_img.png'
// import SCSS
import './Login.scss'
// React Icons for SVG Spotify Icon
import { FaSpotify } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";

function Login() {
    const handleClickEvent = () => {
        console.log('redirected')
        window.location.href = `${import.meta.env.VITE_API_URL}/login`;
    }

    const api = import.meta.env.VITE_API_URL;
    console.log(api);

    return (
        <section className="LoginPage">
            <img src={LoginBG} alt="Background image for the login page." />
            <div className='LoginWrapper'>
                <FaSpotify className="SpotifyIcon"/>
                <h1>Please Login</h1>
                <p>In order to seach for artists or songs, you must login to your Spotify account.</p>
                <button onClick={handleClickEvent}>
                    <span>Login <FaArrowRightToBracket /></span>  
                </button>
            </div>
        </section>
    )
}

export default Login;