import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    
    // extract the token query param and store in var
    const paramsString = window.location.search;
    const seachParams = new URLSearchParams(paramsString);
    const token = seachParams.get('token');

    const [isAuth, setIsAuth] = useState(false);
    // store the extracted token into localStorage
    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token);
            setIsAuth(true);
        }
    },[token])

    if (token) {
        return <Navigate to="/" replace />; // if we got a token, then we redirect to home page. 
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;