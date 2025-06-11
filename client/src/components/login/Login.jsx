// image for bg of login
import axios from 'axios';
import LoginBG from '../../assets/images/login_img.png'
// import SCSS
import './Login.scss'
// React Icons for SVG Spotify Icon
import { FaSpotify } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";

function Login() {

        const loginUser = async () => {
            try {
                const getdata = await axios.get('http://localhost:3000/api/v1/login')
                console.log(getdata)
            } catch (error) {
                throw new Error(error)
            }
        };

    return (
        <section className="LoginPage">
            <img src={LoginBG} alt="Background image for the login page." />
            <div className='LoginWrapper'>
                <FaSpotify className="SpotifyIcon"/>
                <h1>Please Login</h1>
                <p>In order to seach for artists or songs, you must login to your Spotify account.</p>
                <button onClick={loginUser}>
                    <span>Login <FaArrowRightToBracket /></span>  
                </button>
            </div>
        </section>
    )
}

export default Login;