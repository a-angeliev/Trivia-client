import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../context/authContext";

import style from "./RiddleItem.module.css";

export default function RiddleItem({ riddle, id }) {
    const { user } = useContext(AuthContext);

    return (
        <section className={style.riddleItemWrapper}>
            <section className={style.riddleItem}>
                <section className={style.numeration}>
                    <h1>No.{id}</h1>
                </section>

                <section className={style.riddleBody}>
                    <section className={style.riddleDescription}>
                        <h2 className={style.riddleTitle}>{riddle.title}</h2>
                        <p>{riddle.description}</p>
                    </section>
                    <section className={style.bottomRow}>
                        <section className={style.additionalInfo}>
                            <p>
                                Questions: <span className={style.bold}>{riddle.number_of_questions}</span>
                            </p>
                            <p>
                                Price: <span className={style.bold}>${riddle.price}</span>
                            </p>
                        </section>

                        {user.token ? (
                            <Link className={style.btn} to={`/riddles/${riddle.id}/event`}>
                                Buy
                            </Link>
                        ) : (
                            <Link className={style.btn} to={`/login`}>
                                Buy
                            </Link>
                        )}
                    </section>
                </section>
            </section>
        </section>
    );
}
