import { Link } from "react-router-dom";
import { RiddleContext } from "../../../../context/riddleContext";
import { useContext } from "react";
import style from "./AddminRiddlesItems.module.css"

export default function AdminRiddleItem({ riddle }) {
    // const { setCurrentRiddleId } = useContext(RiddleContext);
    // setCurrentRiddleId(riddle.id);
    return (
        <tr>
            <td>{riddle.id}</td>
            <td>{riddle.title}</td>
            <td>{riddle.description}</td>
            <td>{riddle.number_of_questions}</td>
            <td>${riddle.price}</td>
            <td>
                <Link to={`/admin-panel/details/${riddle.id}`}>
                    <img className={style.imgDots} src={"./menu-dots.png"} alt="img"></img>
                </Link>
            </td>
        </tr>
    );
}
