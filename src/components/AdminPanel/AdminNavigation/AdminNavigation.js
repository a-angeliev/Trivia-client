import { Link } from "react-router-dom";
import style from "./AdminNavigation.module.css";
export default function AdminNavigation() {
    return (
        <div className={style.adminNavDiv}>
            <ul className={style.adminNavUl}>
                <li className={style.adminNavLi}>
                    <Link className={style.adminNavLink} to={"/admin-panel"}>
                        riddles
                    </Link>
                </li>
                <div className={style.divider}></div>
                <li className={style.adminNavLi}>
                    <Link className={style.adminNavLink} to={"/admin-panel/discount"}>
                        discounts
                    </Link>
                </li>
                <div className={style.divider}></div>

                <li className={style.adminNavLi}>
                    <Link className={style.adminNavLink} to={"/admin-panel/transactions"}>
                        transactions
                    </Link>
                </li>
            </ul>
        </div>
    );
}
