import { Link } from "react-router-dom";
export default function AdminRiddleItem({ riddle }) {
    console.log(riddle, riddle.title);
    return (
        <tr>
            <td>{riddle.id}</td>
            <td>{riddle.title}</td>
            <td>{riddle.description}</td>
            <td>{riddle.number_of_questions}</td>
            <td>{riddle.price}</td>
            <td><Link to="/admin-panel/item">go</Link></td>
        </tr>

    );
}
