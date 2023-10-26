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

    const [riddleInfo, setRiddleInfo] = useState({
        title: "",
        description: "",
        price: 0.0,
        duration: "",
        where: "",
        google_map: "",
    });

    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [isPriceValid, setIsPriceValid] = useState(false);
    const [isDurationValid, setIsDurationValid] = useState(false);
    const [isWhereValid, setIsWhereValid] = useState(false);
    const [isGoogleValid, setIsGoogleValid] = useState(false);

    const [inputFields, setInputFields] = useState([]);
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
                let newfield = {
                    question: `${x}`,
                    answer: `${answers[i]}`,
                    hint: `${hints[i]}`,
                    isQuestionValid: x.length > 5,
                    isAnswerValid: answers[i].length > 5,
                    isHintValid: hints[i].length > 5,
                };
                inputFieldObj = [...inputFieldObj, newfield];
            });
            setInputFields(inputFieldObj);
            // a.map(x => riddleInfo[`${x}`] = x)
            let title = a.title ? a.title : "";
            let description = a.description ? a.description : "";
            let price = a.price ? a.price : 0.0;
            let duration = a.duration ? a.duration : "";
            let where = a.where ? a.where : "";
            let google_map = a.google_map ? a.google_map : "";

            setIsTitleValid(title.length > 5);
            setIsDescriptionValid(description.length > 10);
            setIsPriceValid(price > 0);
            setIsDurationValid(duration.length > 2);
            setIsWhereValid(where.length > 2);
            setIsGoogleValid(google_map.length > 5);

            setRiddleInfo({
                title,
                description,
                price,
                duration,
                where,
                google_map,
            });
            // console.log(title);
            // console.log(riddleInfo.title);
            // console.log(riddleInfo.description);
            // setTitle(a.title);
            // setDescription(a.description);
            // setHardnes(a.price);
            // setDuration(a.duration);
            // setWhere(a.where);
            // setGoogleMap(a.google_map);
        })();
    }, [riddleId]);

    const handleFormChangeInput = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        data[index]["question"].length > 5
            ? (data[index]["isQuestionValid"] = true)
            : (data[index]["isQuestionValid"] = false);

        data[index]["answer"].length > 5
            ? (data[index]["isAnswerValid"] = true)
            : (data[index]["isAnswerValid"] = false);
        data[index]["hint"].length > 5 ? (data[index]["isHintValid"] = true) : (data[index]["isHintValid"] = false);
        setInputFields(data);
    };

    const handlerFormChangeRiddleInfo = (e) => {
        let data = { ...riddleInfo };
        data[e.target.name] = e.target.value;
        data["title"].length > 5 ? setIsTitleValid(true) : setIsTitleValid(false);
        data["description"].length > 10 ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
        data["price"] > 0 ? setIsPriceValid(true) : setIsPriceValid(false);
        data["duration"].length > 2 ? setIsDurationValid(true) : setIsDurationValid(false);
        data["where"].length > 2 ? setIsWhereValid(true) : setIsWhereValid(false);
        data["google_map"].length > 5 ? setIsGoogleValid(true) : setIsGoogleValid(false);

        setRiddleInfo(data);
    };

    // const handlerFromChangeTitle = (e) => {
    //     setTitle(e.target.value);
    // };
    // const handlerFromChangeDesc = (e) => {
    //     setDescription(e.target.value);
    //     // console.log(description);
    // };
    // const handlerFromChangeHardnes = (e) => {
    //     setHardnes(e.target.value);
    //     // console.log(hardnes);
    // };
    // const handlerFromChangeDuration = (e) => {
    //     setDuration(e.target.value);
    //     // console.log(duration);
    // };
    // const handlerFromChangeWhere = (e) => {
    //     setWhere(e.target.value);
    //     // console.log(where);
    // };
    // const handlerFromChangeGoogleMap = (e) => {
    //     setGoogleMap(e.target.value);
    //     // console.log(googleMap);
    // };

    const deleteRiddleHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this ?")) {
            riddleService.DeleteRiddle(riddleId).then((res) => {
                riddleDelete(riddleId);
                navigate("/admin-panel");
            });
        }
    };

    const editRiddleHandler = (e) => {
        e.preventDefault();
        let questions = [];
        let answers = [];
        let hints = [];

        let isAllQuestionsValid = inputFields.filter((x) => x.isQuestionValid === false).length !== 0 ? false : true;
        let isAllAnswersValid = inputFields.filter((x) => x.isAnswerValid === false).length !== 0 ? false : true;
        let isAllHintsValid = inputFields.filter((x) => x.isHintValid === false).length !== 0 ? false : true;

        if (
            isAllQuestionsValid &&
            isAllAnswersValid &&
            isAllHintsValid &&
            isTitleValid &&
            isDescriptionValid &&
            isPriceValid &&
            isDurationValid &&
            isWhereValid &&
            isGoogleValid
        ) {
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
                title: riddleInfo.title,
                description: riddleInfo.description,
                // status,
                price: parseFloat(riddleInfo.price).toFixed(2),
                number_of_questions,
                duration: riddleInfo.duration,
                where: riddleInfo.where,
                google_map: riddleInfo.google_map,
            };
            if (window.confirm("Are you sure you want to edit this?")) {
                riddleService.EditRIddle(riddleId, data).then((res) => {
                    riddleEdit(riddleId, res);
                    navigate("/admin-panel");
                });
            }
        } else {
            alert("You must fill all fields correctly");
        }
    };

    const addFields = (e) => {
        e.preventDefault();
        let newfield = {
            question: "",
            answer: "",
            hint: "",
            isQuestionValid: false,
            isAnswerValid: false,
            isHintValid: false,
        };
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
                    <div className={style.inputDiv}>
                        <label className={style.label} htmlFor='title'>
                            Title
                        </label>
                        <p hidden className={isTitleValid ? style.hide : style.validationMsg}>
                            Title must be atleast 5 char
                        </p>
                        <input
                            className={`${isTitleValid ? style.correct : style.incorrect} ${style.input}`}
                            name='title'
                            type='text'
                            id='title'
                            onChange={(e) => handlerFormChangeRiddleInfo(e)}
                            value={riddleInfo.title}
                            placeholder='Insert some short title!'
                        />
                    </div>
                    <label htmlFor='description'>Description</label>
                    <p className={isDescriptionValid ? style.hide : null}>Description must be atleast 10 char</p>
                    <textarea
                        className={isDescriptionValid ? style.correct : style.incorrect}
                        name='description'
                        id='description'
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        value={riddleInfo.description}
                        placeholder='Here you can describe shortly about what is the quiz.'></textarea>

                    <label htmlFor='price'>Difficult</label>
                    <p className={isPriceValid ? style.hide : null}> Price must be positive number</p>
                    <input
                        className={isPriceValid ? style.correct : style.incorrect}
                        name='price'
                        type='number'
                        id='price'
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        value={riddleInfo.price}
                        placeholder='0 is the easiest and 100 is the most difficult '
                    />

                    <label htmlFor='duration'>Duration</label>
                    <p className={isDurationValid ? style.hide : null}>Duration must be atleast 2 char</p>
                    <input
                        className={isDurationValid ? style.correct : style.incorrect}
                        name='duration'
                        type='text'
                        id='duration'
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        value={riddleInfo.duration}
                        placeholder='What time you will need to finish the riddle'
                    />

                    <label htmlFor='where'>Where</label>
                    <p className={isWhereValid ? style.hide : null}>Where must be atleast 2 char</p>

                    <input
                        className={isWhereValid ? style.correct : style.incorrect}
                        name='where'
                        type='text'
                        id='where'
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        value={riddleInfo.where}
                        placeholder='Where you will start the riddle or riddle area'
                    />

                    <label htmlFor='google_map'>Google maps link</label>
                    <p className={isGoogleValid ? style.hide : null}>Link must be atleast 5 char</p>

                    <input
                        className={isGoogleValid ? style.correct : style.incorrect}
                        name='google_map'
                        type='text'
                        id='google_map'
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        value={riddleInfo.google_map}
                        placeholder='Link to google maps marked riddle area'
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
                                        <p className={input.isQuestionValid ? style.hide : style.validationMsg}>
                                            Question must be atleast 5 char
                                        </p>
                                        <input
                                            className={`${style.input} ${
                                                input.isQuestionValid ? style.correct : style.incorrect
                                            }`}
                                            name='question'
                                            placeholder={input.question}
                                            onChange={(event) => handleFormChangeInput(index, event)}
                                            value={input.question}
                                        />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Answer</label>
                                        <p className={input.isAnswerValid ? style.hide : style.validationMsg}>
                                            Answer must be atleast 5 char
                                        </p>

                                        <input
                                            className={`${style.input} ${
                                                input.isAnswerValid ? style.correct : style.incorrect
                                            }`}
                                            name='answer'
                                            placeholder={input.answer}
                                            onChange={(event) => handleFormChangeInput(index, event)}
                                            value={input.answer}
                                        />
                                    </div>
                                    <div className={style.inputDiv}>
                                        <label>Hint</label>
                                        <p className={input.isHintValid ? style.hide : style.validationMsg}>
                                            Hint must be atleast 5 char
                                        </p>

                                        <input
                                            className={`${style.input} ${
                                                input.isHintValid ? style.correct : style.incorrect
                                            }`}
                                            onChange={(event) => handleFormChangeInput(index, event)}
                                            name='hint'
                                            placeholder='Hint'
                                            value={input.hint}
                                        />
                                    </div>
                                    {/* <button  className ={style.removeBtn} onClick={() => removeFields(index)}>
                                        X
                                    </button> */}
                                    <img
                                        className={style.removeBtn}
                                        src={"../../cancel.png"}
                                        alt='trash'
                                        onClick={() => removeFields(index)}
                                    />
                                </div>
                            );
                        })}
                        <div>
                            <button onClick={addFields}>Add more</button>
                            <button onClick={editRiddleHandler}>Edit</button>
                            <button onClick={deleteRiddleHandler}>Delete</button>
                        </div>
                    </section>
                </form>
            </section>
        </section>
    );
}
