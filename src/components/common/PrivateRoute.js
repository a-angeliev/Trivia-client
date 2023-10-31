import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";

export default function PrivateRoute({ children }) {
    const { isAdmin } = useContext(AuthContext);

    if (!isAdmin) {
        return <Navigate to='/' replace />;
    }

    return children ? children : <Outlet />;
}
