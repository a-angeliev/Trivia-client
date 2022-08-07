import style from "./RiddleItem.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export default function RiddleItem({ riddle }) {
    let { user } = useContext(AuthContext);

    return (
        <section className={style.riddleItemWrapper}>
            <section className={style.riddleItem}>
                <section className={style.imgSpan}>
                    <img className={style.img} src={"./ideas.png"} alt="img" />
                </section>

                <section className={style.devider}></section>

                <section className={style.desc}>
                    <h2>{riddle.title}</h2>
                    <p>{riddle.description}</p>
                </section>

                <section className={style.devider}></section>

                <section className={style.score}>
                    <img
                        className={style.scoreImg}
                        src={"./speedometer.png"}
                        alt="img"
                    />
                    <p>{riddle.price}</p>
                </section>
                <section className={style.devider}></section>
                {user.token ? (
                    <section className={style.playSpan}>
                        <Link to={`/riddles/${riddle.id}/event`}>
                            <img
                                className={style.playBtn}
                                src={"./video-play.png"}
                                alt="play btn"
                            />
                        </Link>
                    </section>
                ) : (
                    <></>
                )}
            </section>
        </section>
    );
}
