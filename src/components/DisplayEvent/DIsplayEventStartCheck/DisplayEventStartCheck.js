import * as requester from "../../../service/requester";
import { useNavigate } from "react-router-dom";
import style from "./DisplayEventStartCheck.module.css"

export default function DisplayEventStartCheck(props) {
    let navigate = useNavigate();
    const onClick = (e) => {
        if(window.confirm("Are you sure you want to start ?")){

            requester
            .post(`http://127.0.0.1:5000/event?token=${props.token}`, {
                "": "",
            })
            .then((res) => {
                props.setRes(res);
                navigate(`?token=${props.token}`);
            });
        }
    };

    return (
        <>
            <div className = {style.startActionWhrapper}>
                <p className={style.startActionP}>{props.massage}</p>
                <button onClick={onClick}>START</button>
            </div>
        </>
    );
}
