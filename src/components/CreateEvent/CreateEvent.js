import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as requester from "../../service/requester";
import style from "./CreateEvent.module.css";
import * as riddleService from "../../service/riddleService";
import { AuthContext } from "../../context/authContext";
export default function CreateEvent() {
    // let [guessedQuestions, setGuessedQuestions] = useState(0)
    let [questions, setQuestions] = useState("");
    let [answer, setAnswer] = useState("");
    let [end, setEnd] = useState(false);
    let [endMsg, setEndMsg] = useState("");
    let [url, setUrl] = useState("");

    let { riddleId } = useParams();
    
    useEffect(() => {
        riddleService.createEvent(riddleId).then((res) => {
            setUrl(res.url);
            console.log(res.url);

            requester.post(res.url, { "": "" }).then((res) => {
                console.log(res);
                setQuestions(res);
            });
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        requester.post(url, data).then((res) => {
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

    const onSkip =(e)=>{
        e.preventDefault()
        const data = {"skip": true}
        requester.post(url, data).then((res) => {
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
    }
    return (
        <>
            <section className={end ? style.hidden : style.show}>
                <section className={style.loginSection}>
                    <form
                        onSubmit={onSubmit}
                        display="none"
                        className={style.loginForm}
                    >   <p>{questions.guessed_answer}/{questions.number_of_questions}</p>
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
                    <button onClick={onSkip}>SKIP</button>
                </section>
            </section>

            <section className={end ? style.show : style.hidden}>
                <section className={style.endMsg}>
                    <p>Congratulations!!!</p>
                    <p>You guess {endMsg.guessed_answer} from {endMsg.number_of_questions}</p>
                    <p>{endMsg.massage}</p>
                </section>
            </section>
        </>
    );
}
