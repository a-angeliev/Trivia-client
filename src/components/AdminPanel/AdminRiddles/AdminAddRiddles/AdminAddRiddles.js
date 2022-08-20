import style from "./AdminAddRiddles.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CreateRiddle } from "../../../../service/riddleService";
import { RiddleContext } from "../../../../context/riddleContext";

export default function AdminAddRiddles() {
    const { riddleAdd } = useContext(RiddleContext);
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

    const navigate = useNavigate();
    const [inputFields, setInputFields] = useState([
        {
            question: "",
            answer: "",
            hint: "",
            isQuestionValid: false,
            isAnswerValid: false,
            isHintValid: false,
        },
    ]);

    const handlerFormChangeRiddleInfo = (e) => {
        let data = { ...riddleInfo };
        data[e.target.name] = e.target.value;

        data["title"].length > 5
            ? setIsTitleValid(true)
            : setIsTitleValid(false);
        data["description"].length > 10
            ? setIsDescriptionValid(true)
            : setIsDescriptionValid(false);
        data["price"] > 0 ? setIsPriceValid(true) : setIsPriceValid(false);
        data["duration"].length > 2
            ? setIsDurationValid(true)
            : setIsDurationValid(false);
        data["where"].length > 2
            ? setIsWhereValid(true)
            : setIsWhereValid(false);
        data["google_map"].length > 5
            ? setIsGoogleValid(true)
            : setIsGoogleValid(false);

        setRiddleInfo(data);
    };

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;

        data[index]["question"].length > 5
            ? (data[index]["isQuestionValid"] = true)
            : (data[index]["isQuestionValid"] = false);

        data[index]["answer"].length > 5
            ? (data[index]["isAnswerValid"] = true)
            : (data[index]["isAnswerValid"] = false);
        data[index]["hint"].length > 5
            ? (data[index]["isHintValid"] = true)
            : (data[index]["isHintValid"] = false);
        setInputFields(data);
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

    const submit = (e) => {
        e.preventDefault();

        let questions = [];
        let answers = [];
        let hints = [];

        let isAllQuestionsValid =
            inputFields.filter((x) => x.isQuestionValid === false).length !== 0
                ? false
                : true;
        let isAllAnswersValid =
            inputFields.filter((x) => x.isAnswerValid === false).length !== 0
                ? false
                : true;
        let isAllHintsValid =
            inputFields.filter((x) => x.isHintValid === false).length !== 0
                ? false
                : true;

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
        ){

            inputFields.map((x) => {
                questions.push(x.question);
                answers.push(x.answer);
                hints.push(x.hint);
            });
    
            let number_of_questions = inputFields.length;
    
            let data = {
                title: riddleInfo.title,
                description: riddleInfo.description,
                price: parseFloat(riddleInfo.price).toFixed(2),
                number_of_questions,
                questions: questions.join("@"),
                answers: answers.join("@"),
                hint: hints.join("@"),
                duration: riddleInfo.duration,
                where: riddleInfo.where,
                google_map: riddleInfo.google_map,
            };
    
            CreateRiddle(data).then((res) => {
                riddleAdd(res);
                navigate("/admin-panel");
            });
        }else{
            alert('You must fill all fields! ')
        }
        
    };
    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form onSubmit={submit} className={style.form}>
                    <label htmlFor="title">Title</label>
                    <p
                        className={
                            isTitleValid ? style.hide : style.validationMsg
                        }
                    >
                        Title must be atleast 5 char
                    </p>
                    <input
                        className={
                            isTitleValid ? style.correct : style.incorrect
                        }
                        name="title"
                        type="text"
                        id="title"
                        value={riddleInfo["title"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="Insert some short title!"
                    />
                    <label htmlFor="description">Description</label>
                    <p className={isDescriptionValid ? style.hide : null}>
                        Description must be atleast 10 char
                    </p>
                    <textarea
                        className={
                            isDescriptionValid ? style.correct : style.incorrect
                        }
                        name="description"
                        id="description"
                        value={riddleInfo["description"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="Here you can describe shortly about what is the quiz."
                    ></textarea>

                    <label htmlFor="price">Price</label>
                    <p className={isPriceValid ? style.hide : null}>
                        {" "}
                        Price must be positive number
                    </p>
                    <input
                        className={
                            isPriceValid ? style.correct : style.incorrect
                        }
                        name="price"
                        type="number"
                        id="price"
                        value={riddleInfo["price"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="Price"
                    />

                    <label htmlFor="duration">Duration</label>
                    <p className={isDurationValid ? style.hide : null}>
                        Duration must be atleast 2 char
                    </p>
                    <input
                        className={
                            isDurationValid ? style.correct : style.incorrect
                        }
                        name="duration"
                        type="text"
                        id="duration"
                        value={riddleInfo["duration"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="What time you will need to finish the riddle"
                    />

                    <label htmlFor="where">Where</label>
                    <p className={isWhereValid ? style.hide : null}>
                        Where must be atleast 2 char
                    </p>

                    <input
                        className={
                            isWhereValid ? style.correct : style.incorrect
                        }
                        name="where"
                        type="text"
                        id="where"
                        value={riddleInfo["where"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="Where you will start the riddle or riddle area"
                    />

                    <label htmlFor="google_map">Google maps link</label>
                    <p className={isGoogleValid ? style.hide : null}>
                        Link must be atleast 5 char
                    </p>

                    <input
                        className={
                            isGoogleValid ? style.correct : style.incorrect
                        }
                        name="google_map"
                        type="text"
                        id="google_map"
                        value={riddleInfo["google_map"]}
                        onChange={(e) => handlerFormChangeRiddleInfo(e)}
                        placeholder="Link to google maps marked riddle area"
                    />

                    <section className={style.inputSection}>
                        {inputFields.map((input, index) => {
                            return (
                                <>
                                    <div key={index} className={style.row}>
                                        <div className={style.inputDiv}>
                                            <label>Question</label>
                                            <p
                                                className={
                                                    input.isQuestionValid
                                                        ? style.hide
                                                        : style.validationMsg
                                                }
                                            >
                                                Question must be atleast 5 char
                                            </p>
                                            <input
                                                className={`${style.input} ${
                                                    input.isQuestionValid
                                                        ? style.correct
                                                        : style.incorrect
                                                }`}
                                                onChange={(event) =>
                                                    handleFormChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                                name="question"
                                                placeholder="Question"
                                                value={input.question}
                                            />
                                        </div>
                                        <div className={style.inputDiv}>
                                            <label>Answer</label>
                                            <p
                                                className={
                                                    input.isAnswerValid
                                                        ? style.hide
                                                        : style.validationMsg
                                                }
                                            >
                                                Answer must be atleast 5 char
                                            </p>

                                            <input
                                                className={`${style.input} ${
                                                    input.isAnswerValid
                                                        ? style.correct
                                                        : style.incorrect
                                                }`}
                                                onChange={(event) =>
                                                    handleFormChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                                name="answer"
                                                placeholder="Answer"
                                                value={input.answer}
                                            />
                                        </div>
                                        <div className={style.inputDiv}>
                                            <label>Hint</label>
                                            <p
                                                className={
                                                    input.isHintValid
                                                        ? style.hide
                                                        : style.validationMsg
                                                }
                                            >
                                                Hint must be atleast 5 char
                                            </p>

                                            <input
                                                className={`${style.input} ${
                                                    input.isHintValid
                                                        ? style.correct
                                                        : style.incorrect
                                                }`}
                                                onChange={(event) =>
                                                    handleFormChange(
                                                        index,
                                                        event
                                                    )
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
