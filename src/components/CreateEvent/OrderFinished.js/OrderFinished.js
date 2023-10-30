import { useNavigate } from "react-router-dom";

import style from "./OrderFinished.module.css";

export const OrderFinished = () => {
    const navigate = useNavigate();

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Congratulations!</h1>
            <p className={style.text}>
                You are ready to play in few easy steps. Check your email and find the link for the quiz. Wish you luck!
            </p>
            <div className={style.inputDiv}>
                <button className={style.btn} onClick={() => navigate("/")}>
                    home page
                </button>
                <button className={style.btn} onClick={() => navigate("/riddles")}>
                    buy more
                </button>
            </div>

            <img className={style.asset} src='./congratulations.svg' alt='page congratulation asset'></img>
        </div>
    );
};
