import { Link } from "react-router-dom";
import { RiddleContext } from "../../../../context/riddleContext";
import { useContext } from "react";

export default function AdminRiddleItem({ riddle }) {
    const {setCurrentRiddleId} = useContext(RiddleContext)
    setCurrentRiddleId(riddle.id)
    return (
        <tr>
            <td>{riddle.id}</td>
            <td>{riddle.title}</td>
            <td>{riddle.description}</td>
            <td>{riddle.number_of_questions}</td>
            <td>{riddle.price}</td>
            <td><Link to={`/admin-panel/details/${riddle.id}`}>Detail: {riddle.id}</Link></td>
        </tr>

    );
}
