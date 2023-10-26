import { Link } from "react-router-dom";
import { RiddleContext } from "../../../../context/riddleContext";
import { useContext } from "react";
import style from "./AddminRiddlesItems.module.css";

export default function AdminRiddleItem({ riddle }) {
    // const { setCurrentRiddleId } = useContext(RiddleContext);
    // setCurrentRiddleId(riddle.id);
    return (
        <tr className={style.row}>
            <td className={style.td1}>{riddle.id}</td>
            <td className={style.td2}>{riddle.title}</td>
            <td className={style.td3}>
                <p>{riddle.description}</p>
            </td>
            <td className={style.td4}>{riddle.number_of_questions}</td>
            <td className={style.td5}>${riddle.price}</td>
            <td className={style.td6}>
                <Link to={`/admin-panel/details/${riddle.id}`}>
                    <img className={style.imgDots} src={"./menu-dots.png"} alt='img'></img>
                </Link>
            </td>
        </tr>
    );
}
