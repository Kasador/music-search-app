import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = false; // true or false value - if false, redirect to login page, if true, Outlet allows to view other routes. 
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;