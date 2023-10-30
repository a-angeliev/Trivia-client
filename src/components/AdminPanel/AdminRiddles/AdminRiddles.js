import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { RiddleContext } from "../../../context/riddleContext";
import AdminRiddleItem from "./AdminRiddlesItems/AdminRiddlesItems";

import style from "./AdminRiddles.module.css";

export default function AdminRiddles() {
    const { riddles } = useContext(RiddleContext);

    return (
        <section className={style.adminRiddleSelectionWrapper}>
            <section className={style.adminRiddleSelection}>
                <section className={style.tableWrapper}>
                    <table className={style.flTable}>
                        <thead className={style.tHead}>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Questions</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {riddles.map((x) => (
                                <AdminRiddleItem key={x.id} riddle={x} />
                            ))}
                        </tbody>
                    </table>
                </section>
                <Link className='' to='/admin-panel/item'>
                    <button className={style.btn}>Add Riddle</button>
                </Link>
            </section>
            <Outlet />
            <section className={style.space}></section>
        </section>
    );
}
