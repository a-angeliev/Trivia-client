import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const {isAdmin} = useContext(AuthContext)

    if(!isAdmin){
        return <Navigate to="/" replace/>
    }

    return children ? children : <Outlet/>
}