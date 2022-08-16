import style from "./AdminRiddleDetails.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as riddleService from "../../../../service/riddleService";
import { useNavigate } from "react-router-dom";
import { RiddleContext } from "../../../../context/riddleContext";

export default function AdminRiddleDetails() {
    const { riddleId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hardnes, setHardnes] = useState("");
    const [duration, setDuration] = useState("");
    const [where, setWhere] = useState("");
    const [googleMap, setGoogleMap] = useState("");

    const [inputFields, setInputFields] = useState([]);
    // const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { riddleDelete, riddles, riddleEdit } = useContext(RiddleContext);

    let questions;
    let answers;
    let hints;
    // const handlerFormChangeSelect = (e) =>{
    //     setStatus(e.target.value);
    // }

    useEffect(() => {
        (async () => {
            let a = await riddleService.getOne(riddleId);
            // setStatus(a.status);

            questions = a.questions ? a.questions.split("@") : [];
            answers = a.answers ? a.answers.split("@") : [];
            hints = a.hint ? a.hint.split("@") : [];
            let inputFieldObj = [];
            questions.map((x, i) => {
                let newfield = { question: `${x}`, answer: `${answers[i]}`, hint:`${hints[i]}` };
                inputFieldObj = [...inputFieldObj, newfield];
            });
            setInputFields(inputFieldObj);
            setTitle(a.title);
            setDescription(a.description);
            setHardnes(a.price);
            setDuration(a.duration);
            setWhere(a.where);
            setGoogleMap(a.google_map);
        })();
    }, [riddleId]);

    const handleFormChangeInput = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const handlerFromChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const handlerFromChangeDesc = (e) => {
        setDescription(e.target.value);
        // console.log(description);
    };
    const handlerFromChangeHardnes = (e) => {
        setHardnes(e.target.value);
        // console.log(hardnes);
    };
    const handlerFromChangeDuration = (e) => {
        setDuration(e.target.value);
        // console.log(duration);
    };
    const handlerFromChangeWhere = (e) => {
        setWhere(e.target.value);
        // console.log(where);
    };
    const handlerFromChangeGoogleMap = (e) => {
        setGoogleMap(e.target.value);
        // console.log(googleMap);
    };

    const deleteRiddleHandler = (e) => {
        e.preventDefault();
        riddleService.DeleteRiddle(riddleId).then((res) => {
            riddleDelete(riddleId);
            navigate("/admin-panel");
        });
    };

    const editRiddleHandler = (e) => {
        e.preventDefault();
        let questions = [];
        let answers = [];
        let hints = [];

        inputFields.map((x) => {
            questions.push(x.question);
            answers.push(x.answer);
            hints.push(x.hint);
        });

        let number_of_questions = inputFields.length;

        let data = {
            questions: questions.join("@"),
            answers: answers.join("@"),
            hint: hints.join("@"),
            title,
            description,
            // status,
            price: parseFloat(hardnes).toFixed(2),
            number_of_questions,
            duration,
            where,
            google_map: googleMap,
        };
        riddleService.EditRIddle(riddleId, data).then((res) => {
            riddleEdit(riddleId, res);
            navigate("/admin-panel");
        });
    };

    const addFields = (e) => {
        e.preventDefault();
        let newfield = { question: "", answer: "", hint: "" };
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form className={style.form}>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        onChange={(e) => handlerFromChangeTitle(e)}
                        value={title}
                        placeholder="Insert some short title!"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={(e) => handlerFromChangeDesc(e)}
                        value={description}
                        placeholder="Here you can describe shortly about what is the quiz."
                    ></textarea>

                    <label htmlFor="hardnes">Difficult</label>
                    <input
                        name="hardnes"
                        type="number"
                        id="hardnes"
                        onChange={(e) => handlerFromChangeHardnes(e)}
                        value={hardnes}
                        placeholder="0 is the easiest and 100 is the most difficult "
                    />

                    <label htmlFor="duration">Duration</label>
                    <input
                        name="duration"
                        type="text"
                        id="duration"
                        onChange={(e) => handlerFromChangeDuration(e)}
                        value={duration}
                        placeholder="What time you will need to finish the riddle"
                    />

                    <label htmlFor="where">Where</label>
                    <input
                        name="where"
                        type="text"
                        id="where"
                        onChange={(e) => handlerFromChangeWhere(e)}
                        value={where}
                        placeholder="Where you will start the riddle or riddle area"
                    />

                    <label htmlFor="google_map">Google maps link</label>
                    <input
                        name="google_map"
                        type="text"
                        id="google_map"
                        onChange={(e) => handlerFromChangeGoogleMap(e)}
                        value={googleMap}
                        placeholder="Link to google maps marked riddle area"
                    />
                    {/* <lable>Status</lable>
                    <select onChange = { handlerFormChangeSelect} id="status">
                        <option  value={status}>{status}</option>
                        <option  value={status=="available" ? "archived" :"available" }>{status=="available" ? "archived" :"available" }</option>
                    </select> */}

                    <section className={style.inputSection}>
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index} className={style.row}>
                                    <div className={style.inputDiv}>
                                        <label>Question</label>
                                        <input
                                            className={style.input}
                                            name="question"
                                            placeholder={input.question}
                                            onChange={(event) =>
                                                handleFormChangeInput(
                                                    index,
                                                    event
                                                )
                                            }
                                            value={input.question}
                                        />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Answer</label>
                                        <input
                                            className={style.input}
                                            name="answer"
                                            placeholder={input.answer}
                                            onChange={(event) =>
                                                handleFormChangeInput(
                                                    index,
                                                    event
                                                )
                                            }
                                            value={input.answer}
                                        />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Hint</label>
                                        <input
                                            className={style.input}
                                            onChange={(event) =>
                                                handleFormChangeInput(index, event)
                                            }
                                            name="hint"
                                            placeholder="Hint"
                                            value={input.hint}
                                            />
                                    </div>
                                    {/* <button  className ={style.removeBtn} onClick={() => removeFields(index)}>
                                        X
                                    </button> */}
                                    <img
                                        className={style.removeBtn}
                                        src={"../../cancel.png"}
                                        alt="trash"
                                        onClick={() => removeFields(index)}
                                    />
                                </div>
                            );
                        })}
                        <div>
                            <button onClick={addFields}>Add more</button>
                            <button onClick={editRiddleHandler}>Edit</button>
                            <button onClick={deleteRiddleHandler}>
                                Delete
                            </button>
                        </div>
                    </section>
                </form>
            </section>
        </section>
    );
}
