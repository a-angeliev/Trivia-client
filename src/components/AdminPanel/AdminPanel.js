import { Outlet } from "react-router-dom";

import AdminNavigation from "./AdminNavigation/AdminNavigation";

export default function AdminPanel() {
    return (
        <>
            <AdminNavigation />
            <Outlet />
        </>
    );
}
