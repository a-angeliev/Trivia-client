import { Link } from "react-router-dom";
import style from "./AdminNavigation.module.css";
export default function AdminNavigation() {
    return (
        <div className={style.AdminNavDiv}>
            <ul className={style.AdminNavUl}>
                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel"}>
                        riddles
                    </Link>
                </li>
                <div className={style.devider}></div>
                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel/discount"}>
                        discounts
                    </Link>
                </li>
                <div className={style.devider}></div>

                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel/transactions"}>
                        transactions
                    </Link>
                </li>
            </ul>
        </div>
    );
}
