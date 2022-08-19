import AdminRiddles from "./AdminRiddles/AdminRiddles";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminDiscounts from "./AdminDiscounts/AdminDiscounts";
import AdminNavigation from "./AdminNavigation/AdminNavigation";
import AdminRiddleDetails from "./AdminRiddles/AdminRiddleDetails/AdminRiddleDetails";
import AdminAddRiddles from "./AdminRiddles/AdminAddRiddles/AdminAddRiddles";
import AdminFaq from "./AdminFaq/AdminFaq";
export default function AdminPanel() {
    return (
        <>
            {" "}
            <AdminNavigation />
            <Outlet/>
            {/* <AdminRiddles/> */}
        </>
    );
}
