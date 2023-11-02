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
            <img
                className={`${style.mobile} ${style.asset}`}
                src='./congratulations.svg'
                alt='page congratulation asset'></img>

            <div className={style.btnDiv}>
                <button className={style.btn} onClick={() => navigate("/")}>
                    home page
                </button>
                <button className={style.btn} onClick={() => navigate("/riddles")}>
                    buy more
                </button>
            </div>

            <img
                className={`${style.desktop} ${style.asset}`}
                src='./congratulations.svg'
                alt='page congratulation asset'></img>
        </div>
    );
};
