import style from "./EventAction.module.css";

import { useEffect, useState } from "react";

import * as requester from "../../../service/requester";

export default function EventAction(props) {
    let [questions, setQuestions] = useState("");
    let [answer, setAnswer] = useState("");
    let [end, setEnd] = useState(false);
    let [endMsg, setEndMsg] = useState("");

    useEffect(() => {
        let fetchData = async () => {
            let res = await requester.get(
                `http://127.0.0.1:5000/event?token=${props.urlToken}`
            );
            setQuestions(res);
        };
        fetchData().then((err) => console.log(err));
    }, []);

    const onSubmit = (e, skip) => {
        e.preventDefault();

        let data = skip
            ? { skip: true }
            : Object.fromEntries(new FormData(e.target));

        requester
            .post(`http://127.0.0.1:5000/event?token=${props.urlToken}`, data)
            .then((res) => {
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
    
    const onClick = (e)=>{
        e.preventDefault()
        let current_question = questions.current_question
        requester
            .get(`http://127.0.0.1:5000/event/hint/${current_question}?token=${props.urlToken}`).then(res=> alert(`The hint is: ${res}`))
    }

    return (
        <>
            <section className={end ? style.hidden : style.show}>
                <section className={style.loginSection}>
                    <button onClick={onClick}>Hint</button>
                    <form
                        onSubmit={onSubmit}
                        display="none"
                        className={style.loginForm}
                    >   
                        {" "}
                        <p>
                            {questions.guessed_answer}/
                            {questions.number_of_questions}
                        </p>
                        <p>Question {questions.current_question}:</p>
                        <p>{questions.question}</p>
                        <label className={style.loginLables} htmlFor="email">
                            Answer
                        </label>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            name="answer"
                            className={style.loginInputs}
                            id="email"
                        ></input>
                        <button className={style.logBtn}>Check</button>
                    </form>
                    <button onClick={(e) => onSubmit(e, true)}>SKIP</button>
                </section>
            </section>

            <section className={end ? style.show : style.hidden}>
                <section className={style.endMsg}>
                    <p>Congratulations!!!</p>
                    <p>
                        You guess {endMsg.guessed_answer} from{" "}
                        {endMsg.number_of_questions}
                    </p>
                    <p>{endMsg.massage}</p>
                </section>
            </section>
        </>
    );
}
