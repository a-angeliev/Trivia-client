import style from "./EventAction.module.css";

import { useEffect, useState } from "react";

import * as eventService from "../../../service/eventService";

export default function EventAction(props) {
    let [questions, setQuestions] = useState("");
    let [answer, setAnswer] = useState("");
    let [end, setEnd] = useState(false);
    let [endMsg, setEndMsg] = useState("");
    const [hint, setHint] = useState("");
    const [wrong, setWrong] = useState(false);

    useEffect(() => {
        eventService
            .eventState(props.urlToken)
            .then((res) => setQuestions(res))
            .catch((err) => console.log(err));
    }, []);

    const onSubmit = (e, skip) => {
        e.preventDefault();

        let data = skip ? { skip: true } : Object.fromEntries(new FormData(e.target));

        eventService.validateAnswer(props.urlToken, data).then((res) => {
            if (res.massage && !res.end) {
                setWrong(true);
                setAnswer("");
            } else if (res.massage && res.end) {
                setEnd(true);
                setEndMsg(res);
            } else {
                setAnswer("");
                setQuestions(res);
            }
        });
    };

    const getHint = () => {
        eventService
            .getHint(questions.current_question, props.urlToken)
            .then((res) => setHint(res))
            .catch((err) => console.log(err));
    };

    const removeStyle = () => {
        setWrong(false);
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
                        <label className={`${style.label} ${wrong ? style.wrongLabel : ""}`} htmlFor='answer'>
                            Answer
                        </label>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            name='answer'
                            className={`${style.input} ${wrong === true ? style.wrongInput : ""}`}
                            onSelect={removeStyle}
                            placeholder='input'
                            id='email'></input>

                        <p className={style.hintBtn} onClick={getHint}>
                            hint
                        </p>
                        <p className={`${style.wrongLabel} ${wrong ? style.show : style.hidden}`}>
                            There is a mistake! Try again.
                        </p>
                        {hint !== "" ? <p className={style.hintText}>Hint: {hint}</p> : ""}
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
                    <h1 className={style.finalTitle}>Congratulations!</h1>
                    <p className={style.text}>
                        You answered {endMsg.guessed_answer} out of {endMsg.number_of_questions} questions.
                    </p>
                    <p className={style.text}>{endMsg.massage}</p>
                    <img className={style.endAsset} src='./end.svg' alt='end asset'></img>
                </section>
            </section>
        </>
    );
}
