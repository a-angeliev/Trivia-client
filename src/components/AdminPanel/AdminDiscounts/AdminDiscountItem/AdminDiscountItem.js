import { Link, useNavigate } from "react-router-dom";

import style from "./AdminDiscountItem.module.css";

export default function AdminDiscountItem(props) {
    const navigate = useNavigate();

    return (
        <>
            <tr className={style.desktop}>
                <td>{props.discounts.id}</td>
                <td>{props.discounts.code}</td>
                <td>{props.discounts.discount}</td>
                <td>{props.discounts.started_on}</td>
                <td>{props.discounts.ended_on}</td>
                <td>
                    <Link to={`/admin-panel/discount/${props.discounts.id}`}>
                        <img className={style.imgDots} src='/images/menu-dots.png' alt='img'></img>
                    </Link>
                </td>
            </tr>

            <tr onClick={() => navigate(`/admin-panel/discount/${props.discounts.id}`)} className={style.mobile}>
                <td>{props.discounts.id}</td>
                <td>{props.discounts.code}</td>
                <td>{props.discounts.discount}</td>
                <td>{props.discounts.started_on}</td>
            </tr>
        </>
    );
}
