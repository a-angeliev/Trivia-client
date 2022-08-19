import style from "./AdminDiscounts.module.css";
import { useContext, useEffect, useState } from "react";
import * as requester from "../../../service/requester";
import { Outlet, Link } from "react-router-dom";
import AdminDiscountItem from "./AdminDiscountItem/AdminDiscountItem";
import { DiscountContext } from "../../../context/discountContext";

export default function AdminDiscounts() {
    const { discounts } = useContext(DiscountContext);
    
    // let [discounts, setDiscounts] = useState()
    // console.log(discounts);
    // useEffect(()=>{
    //     requester.get("http://127.0.0.1:5000/discounts").then(res=> setDiscounts(JSON.parse(res)))
    // },[])

    return (
        <section className={style.adminRiddleSelectionWapper}>
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
                                )
                            )}
                        </tbody>
                    </table>
                </section>
                <Link className='' to="/admin-panel/discount/add">
                    <button className=''>Add Discount</button>
                </Link>
            </section>
            <Outlet />
            <section className={style.space}></section>
        </section>
    );
}
