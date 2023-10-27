import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { DiscountContext } from "../../../context/discountContext";
import AdminDiscountItem from "./AdminDiscountItem/AdminDiscountItem";

import style from "./AdminDiscounts.module.css";

export default function AdminDiscounts() {
    const { discounts } = useContext(DiscountContext);

    return (
        <section className={style.adminRiddleSelectionWrapper}>
            <section className={style.adminRiddleSelection}>
                <section className={style.tableWrapper}>
                    <table className={style.flTable}>
                        <thead className={style.tHead}>
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Discount "%"</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((x) => (
                                <AdminDiscountItem key={x.id} discounts={x} />
                            ))}
                        </tbody>
                    </table>
                </section>
                <Link className='' to='/admin-panel/discount/add'>
                    <button className={style.btn}>Add Discount</button>
                </Link>
            </section>
            <Outlet />
            <section className={style.space}></section>
        </section>
    );
}
