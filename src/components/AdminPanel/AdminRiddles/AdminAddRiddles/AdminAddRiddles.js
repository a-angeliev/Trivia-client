import style from "./AdminAddRiddles.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CreateRiddle } from "../../../../service/riddleService";
import { RiddleContext } from "../../../../context/riddleContext";

export default function AdminAddRiddles() {
    let { riddleAdd } = useContext(RiddleContext);

    let navigate = useNavigate();
    const [inputFields, setInputFields] = useState([
        { question: "", answer: "", hint: ""},
    ]);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const addFields = (e) => {
        e.preventDefault();
        let newfield = { question: "", answer: "", hint: ""};
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    const submit = (e) => {
        e.preventDefault();

        let questions = [];
        let answers = [];
        let hints =[]
        inputFields.map((x) => {
            questions.push(x.question);
            answers.push(x.answer);
            hints.push(x.hint)
        });

        const { title, description, hardnes, duration, where, google_map } =
            Object.fromEntries(new FormData(e.target));
        let number_of_questions = inputFields.length;

        let data = {
            title,
            description,
            price: parseFloat(hardnes).toFixed(2),
            number_of_questions,
            questions: questions.join("@"),
            answers: answers.join("@"),
            hint: hints.join("@"),
            duration,
            where,
            google_map,
        };

        CreateRiddle(data).then((res) => {
            riddleAdd(res);
            navigate("/admin-panel");
        });
    };
    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form onSubmit={submit} className={style.form}>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        placeholder="Insert some short title!"
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Here you can describe shortly about what is the quiz."
                    ></textarea>

                    <label htmlFor="hardnes">Difficalty</label>
                    <input
                        name="hardnes"
                        type="number"
                        id="hardnes"
                        placeholder="0 is the easiest and 100 is the most difficult "
                    />

                    <label htmlFor="duration">Duration</label>
                    <input
                        name="duration"
                        type="text"
                        id="duration"
                        placeholder="What time you will need to finish the riddle"
                    />

                    <label htmlFor="where">Where</label>
                    <input
                        name="where"
                        type="text"
                        id="where"
                        placeholder="Where you will start the riddle or riddle area"
                    />

                    <label htmlFor="google_map">Google maps link</label>
                    <input
                        name="google_map"
                        type="text"
                        id="google_map"
                        placeholder="Link to google maps marked riddle area"
                    />

                    <section className={style.inputSection}>
                        {inputFields.map((input, index) => {
                            return (
                                <>
                                <div key={index} className={style.row}>
                                    <div className={style.inputDiv}>
                                        <label>Question</label>
                                        <input
                                            className={style.input}
                                            onChange={(event) =>
                                                handleFormChange(index, event)
                                            }
                                            name="question"
                                            placeholder="Question"
                                            value={input.question}
                                            />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Answer</label>
                                        <input
                                            className={style.input}
                                            onChange={(event) =>
                                                handleFormChange(index, event)
                                            }
                                            name="answer"
                                            placeholder="Answer"
                                            value={input.answer}
                                            />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Hint</label>
                                        <input
                                            className={style.input}
                                            onChange={(event) =>
                                                handleFormChange(index, event)
                                            }
                                            name="hint"
                                            placeholder="Hint"
                                            value={input.hint}
                                            />
                                    </div>
                                    <img
                                        className={style.removeBtn}
                                        src={"../../cancel.png"}
                                        alt="trash"
                                        onClick={() => removeFields(index)}
                                        />
                                </div>
                                </>
                            );
                        })}
                        <div>
                            <button onClick={addFields}>Add more</button>
                            <button>Submit</button>
                        </div>
                    </section>
                </form>
                </section>
                </section>
                );
}
