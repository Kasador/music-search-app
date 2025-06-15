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
        window.location.href = 'https://424c-2600-8801-3888-1c00-9170-478a-53a4-b1a6.ngrok-free.app/api/v1/login';
    }

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