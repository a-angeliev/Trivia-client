import style from "./EventAction.module.css";

import { useEffect, useState } from "react";

import * as requester from "../../../service/requester";
import * as eventService from "../../../service/eventService";

export default function EventAction(props) {
    let [questions, setQuestions] = useState("");
    let [answer, setAnswer] = useState("");
    let [end, setEnd] = useState(false);
    let [endMsg, setEndMsg] = useState("");

    useEffect(() => {
        let fetchData = async () => {
            let res = await requester.get(`http://127.0.0.1:5000/event?token=${props.urlToken}`);
            setQuestions(res);
        };
        fetchData().then((err) => console.log(err));
    }, []);

    const onSubmit = (e, skip) => {
        e.preventDefault();

        let data = skip ? { skip: true } : Object.fromEntries(new FormData(e.target));

        requester.post(`http://127.0.0.1:5000/event?token=${props.urlToken}`, data).then((res) => {
            if (res.massage && !res.end) {
                alert(res.massage, res.end);
            } else if (res.massage && res.end) {
                setEnd(true);
                setEndMsg(res);
            } else {
                setAnswer("");
                setQuestions(res);
            }
        });
    };

    const onClick = (e) => {
        e.preventDefault();
        let current_question = questions.current_question;
        requester
            .get(`http://127.0.0.1:5000/event/hint/${current_question}?token=${props.urlToken}`)
            .then((res) => alert(`The hint is: ${res}`));
    };

    return (
        <>
            <section className={`${style.loginSection} ${end ? style.hidden : style.show}`}>
                <form onSubmit={onSubmit} display='none' className={style.loginForm}>
                    {" "}
                    <h1 className={style.title}>Question No.{questions.current_question}</h1>
                    <p className={style.points}>
                        {questions.guessed_answer}/{questions.number_of_questions} point
                    </p>
                    <p className={style.question}>{questions.question}</p>
                    <div className={style.inputDiv}>
                        <label className={style.label} htmlFor='answer'>
                            Answer
                        </label>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            name='answer'
                            className={style.input}
                            placeholder='input'
                            id='email'></input>

                        <p className={style.hintBtn}>hint</p>
                        <p className={style.hintText}>Hint: Sone random hint</p>
                    </div>
                    <div className={style.btnDiv}>
                        <button className={style.btn}>Check</button>
                        <button className={style.btn} onClick={(e) => onSubmit(e, true)}>
                            skip
                        </button>
                    </div>
                </form>
            </section>

            <section className={end ? style.show : style.hidden}>
                <section className={style.endMsg}>
                    <p className={style.text}>Congratulations!!!</p>
                    <p className={style.text}>
                        You guess {endMsg.guessed_answer} from {endMsg.number_of_questions}
                    </p>
                    <p className={style.text}>{endMsg.massage}</p>
                </section>
            </section>
        </>
    );
}
