import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

/* DEV NOTES/DOCS >>>
    1) https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    2) https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    3) https://reactrouter.com/start/declarative/navigating
    4) https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set

    -----> This is a the best way I found to actually unlock my protected routes, otherwise...
    I could save the token but the route would still be locked, bad redirect, or unlocked without storing.
*/

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // check if there is token in localStorage
        const params = new URLSearchParams(window.location.search);
        const URLtoken = params.get('token');

        if (URLtoken) { // if there is a token in the URL string when logged, we get that token and then save it to localStorage
            localStorage.setItem('token', URLtoken);
            console.log('Token has been stored!');
            setIsAuth(true);

            navigate('/'); // redirect to main page
        } else { // if not in URL, then we will assume there is ALREADY one in localStorage.
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuth(true);
            } else {
                console.error('No token stored.');
                setIsAuth(false);
            }
        }

        setLoading(false); // after it runs the checks, then change to false, which would cancel out the null and return my protected routes.
        // if (localStorage.getItem('token') !== null) { // https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
        //     setIsAuth(true);
        // } else {
    },[navigate]); // if state change in the useNavigate hook, which are redirects, then run the effect again.

    if (loading) return null; // prevents react from rendering a route that is in progress

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;