import { Link, useNavigate } from "react-router-dom";

import style from "./AddminRiddlesItems.module.css";

export default function AdminRiddleItem({ riddle }) {
    const navigate = useNavigate();
    return (
        <>
            <tr className={style.row}>
                <td className={style.td1}>{riddle.id}</td>
                <td className={style.td2}>{riddle.title}</td>
                <td className={`${style.desktop} ${style.td3}`}>
                    <p>{riddle.description}</p>
                </td>
                <td className={style.td4}>{riddle.number_of_questions}</td>
                <td className={style.td5}>${riddle.price}</td>
                <td className={`${style.desktop} ${style.td6}`}>
                    <Link to={`/admin-panel/details/${riddle.id}`}>
                        <img className={style.imgDots} src={"/images/menu-dots.png"} alt='img'></img>
                    </Link>
                </td>
            </tr>
            <tr
                onClick={() => navigate(`/admin-panel/details/${riddle.id}`)}
                className={` ${style.row}} ${style.mobile}`}>
                <td colSpan='4' className={style.tdDesc}>
                    <p>{riddle.description}</p>
                </td>
            </tr>
        </>
    );
}
