import { useNavigate } from "react-router-dom";

import * as eventService from "../../../service/eventService";

import style from "./DisplayEventStartCheck.module.css";

export default function DisplayEventStartCheck(props) {
    let navigate = useNavigate();

    const onClick = () => {
        if (window.confirm("Are you sure you want to start ?")) {
            eventService.startEvent(props.token, { "": "" }).then((res) => {
                props.setRes(res);
                navigate(`?token=${props.token}`);
            });
        }
    };

    return (
        <>
            <div className={style.startActionWrapper}>
                <h1 className={style.title}>You are about to start the quiz</h1>
                <p className={style.startActionP}>{props.massage}</p>
                <div className={style.btnDiv}>
                    <button className={style.btn} onClick={onClick}>
                        start
                    </button>
                    <button className={style.btn} onClick={() => navigate("/")}>
                        go back
                    </button>
                </div>
            </div>
        </>
    );
}
