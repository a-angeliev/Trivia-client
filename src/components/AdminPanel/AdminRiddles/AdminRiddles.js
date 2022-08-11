import style from "./AdminRiddles.module.css";
import AdminRiddleItem from "./AdminRiddlesItems/AdminRiddlesItems";
import { RiddleContext } from "../../../context/riddleContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AdminRiddles() {
    const { riddles } = useContext(RiddleContext);
    
    return (
        <section className={style.adminRiddleSelectionWapper}>
            <section className={style.adminRiddleSelection}>
                <section className={style.tableWrapper}>
                    <table className={style.flTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>QUESTIONS</th>
                                <th>DIFFICALTY</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {riddles.map((x) => (     
                                <AdminRiddleItem key={x.id} riddle={x} />
                                )
                            )}
                        </tbody>
                    </table>
                </section>
                <Link className={style.addNavigateBtn} to="/admin-panel/item">
                    Add riddle
                </Link>
            </section>
            <Outlet />
        </section>
    );
}
