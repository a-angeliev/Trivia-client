import { Link } from "react-router-dom";
import style from './AdminNavigation.module.css'
export default function AdminNavigation() {
    return (
        <div className={style.AdminNavDiv}>

            <ul  className={style.AdminNavUl}>
                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel"}>Riddles</Link>
                </li>
                <div className={style.devider}></div>
                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel/discount"}>Discounts</Link>
                </li>
                <div className={style.devider}></div>
        
                <li className={style.AdminNavLi}>
                    <Link className={style.AdminNavLink} to={"/admin-panel/transactions"}>Transactions</Link>
                </li>
            </ul>
        </div>
    );
}
