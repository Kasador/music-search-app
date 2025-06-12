// image for bg of login
import axios from 'axios';
import LoginBG from '../../assets/images/login_img.png'
// import SCSS
import './Login.scss'
// React Icons for SVG Spotify Icon
import { FaSpotify } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";

function Login() {

        // const loginUser = async () => {
        //     try {
        //         await axios.get('https://fb32-2600-8801-3888-1c00-bdc6-c040-13a2-e585.ngrok-free.app/api/v1/login');
        //         // console.log(getdata);
        //         // console.log("Auth URL: ", getdata.data.authSpotifyURI);
        //         // const authURL = getdata.data.authSpotifyURI;
                // window.location.href = authURL;
        //     } catch (error) {
        //         throw new Error(error)
        //     }
        // };

        const handleClickEvent = () => {
            console.log('redirected')
            window.location.href = ' https://525b-2600-8801-3888-1c00-bdc6-c040-13a2-e585.ngrok-free.app/api/v1/login';
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