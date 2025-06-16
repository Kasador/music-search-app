import { useState } from 'react';
import './Logout.scss';
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa6";

/* DOCS/REF >>> 
    1) https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
    2) https://www.geeksforgeeks.org/reactjs/react-events-reference/
    3) https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
*/

function Logout() {
    const [closed, setIsClosed] = useState(true);

    const handleMouseOver = () => {
        // console.log('Mouse In');
        setIsClosed(false)
    }

    const handleMouseOut = () => {
        // console.log('Mouse Out');
        setIsClosed(true)
    }

    const handleClick = () => {
        console.log('Logged out!');
        localStorage.clear(); // clear localStorage
        window.location.reload(); // refresh window, which would enable protected routes, redirecting user to login screen
    }

    return (
        <section className='Logout' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
            {closed /* return open or closed based on state */
                ? <FaDoorClosed className='LogoutIcons' id="Logout_closed"/>
                : <FaDoorOpen className='LogoutIcons' id="Logout_open"/>
            }
            <span>Logout</span>
        </section>
    )
}

export default Logout;