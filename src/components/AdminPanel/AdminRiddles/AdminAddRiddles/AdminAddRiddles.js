import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RiddleContext } from "../../../../context/riddleContext";
import { RiddleForm } from "../AdminRiddlesForm/AdminRiddlesForm";
import { CreateRiddle } from "../../../../service/riddleService";

export default function AdminAddRiddles() {
    const { riddleAdd } = useContext(RiddleContext);

    const navigate = useNavigate();

    const createRiddle = (data) => {
        CreateRiddle(data)
            .then((res) => {
                riddleAdd(res);
                navigate("/admin-panel");
            })
            .catch((err) => console.log(err));
    };

    return <RiddleForm createRiddle={(data) => createRiddle(data)} action={"add"}></RiddleForm>;
    // const { riddleAdd } = useContext(RiddleContext);
    // const [riddleInfo, setRiddleInfo] = useState({
    //     title: "",
    //     description: "",
    //     price: 0.0,
    //     duration: "",
    //     where: "",
    //     google_map: "",
    // });
    // const [isTitleValid, setIsTitleValid] = useState(false);
    // const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    // const [isPriceValid, setIsPriceValid] = useState(false);
    // const [isDurationValid, setIsDurationValid] = useState(false);
    // const [isWhereValid, setIsWhereValid] = useState(false);
    // const [isGoogleValid, setIsGoogleValid] = useState(false);

    // const navigate = useNavigate();
    // const [inputFields, setInputFields] = useState([
    //     {
    //         question: "",
    //         answer: "",
    //         hint: "",
    //         isQuestionValid: false,
    //         isAnswerValid: false,
    //         isHintValid: false,
    //     },
    // ]);

    // const handlerFormChangeRiddleInfo = (e) => {
    //     let data = { ...riddleInfo };
    //     data[e.target.name] = e.target.value;

    //     data["title"].length > 5 ? setIsTitleValid(true) : setIsTitleValid(false);
    //     data["description"].length > 10 ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
    //     data["price"] > 0 ? setIsPriceValid(true) : setIsPriceValid(false);
    //     data["duration"].length > 2 ? setIsDurationValid(true) : setIsDurationValid(false);
    //     data["where"].length > 2 ? setIsWhereValid(true) : setIsWhereValid(false);
    //     data["google_map"].length > 5 ? setIsGoogleValid(true) : setIsGoogleValid(false);

    //     setRiddleInfo(data);
    // };

    // const handleFormChange = (index, event) => {
    //     let data = [...inputFields];
    //     data[index][event.target.name] = event.target.value;

    //     data[index]["question"].length > 5
    //         ? (data[index]["isQuestionValid"] = true)
    //         : (data[index]["isQuestionValid"] = false);

    //     data[index]["answer"].length > 5
    //         ? (data[index]["isAnswerValid"] = true)
    //         : (data[index]["isAnswerValid"] = false);
    //     data[index]["hint"].length > 5 ? (data[index]["isHintValid"] = true) : (data[index]["isHintValid"] = false);
    //     setInputFields(data);
    // };

    // const addFields = (e) => {
    //     e.preventDefault();
    //     let newfield = {
    //         question: "",
    //         answer: "",
    //         hint: "",
    //         isQuestionValid: false,
    //         isAnswerValid: false,
    //         isHintValid: false,
    //     };
    //     setInputFields([...inputFields, newfield]);
    // };

    // const removeFields = (index) => {
    //     let data = [...inputFields];
    //     data.splice(index, 1);
    //     setInputFields(data);
    // };

    // const submit = (e) => {
    //     e.preventDefault();

    //     let questions = [];
    //     let answers = [];
    //     let hints = [];

    //     let isAllQuestionsValid = inputFields.filter((x) => x.isQuestionValid === false).length !== 0 ? false : true;
    //     let isAllAnswersValid = inputFields.filter((x) => x.isAnswerValid === false).length !== 0 ? false : true;
    //     let isAllHintsValid = inputFields.filter((x) => x.isHintValid === false).length !== 0 ? false : true;

    //     if (
    //         isAllQuestionsValid &&
    //         isAllAnswersValid &&
    //         isAllHintsValid &&
    //         isTitleValid &&
    //         isDescriptionValid &&
    //         isPriceValid &&
    //         isDurationValid &&
    //         isWhereValid &&
    //         isGoogleValid
    //     ) {
    //         inputFields.map((x) => {
    //             questions.push(x.question);
    //             answers.push(x.answer);
    //             hints.push(x.hint);
    //         });

    //         let number_of_questions = inputFields.length;

    //         let data = {
    //             title: riddleInfo.title,
    //             description: riddleInfo.description,
    //             price: parseFloat(riddleInfo.price).toFixed(2),
    //             number_of_questions,
    //             questions: questions.join("@"),
    //             answers: answers.join("@"),
    //             hint: hints.join("@"),
    //             duration: riddleInfo.duration,
    //             where: riddleInfo.where,
    //             google_map: riddleInfo.google_map,
    //         };

    //         CreateRiddle(data).then((res) => {
    //             riddleAdd(res);
    //             navigate("/admin-panel");
    //         });
    //     } else {
    //         alert("You must fill all fields! ");
    //     }
    // };

    // const inputRow = (input, index) => {
    //     return (
    //         <>
    //             <div key={index} className={style.row}>
    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='question'>
    //                         Question
    //                     </label>
    //                     <input
    //                         className={`${style.input}`}
    //                         onChange={(event) => handleFormChange(index, event)}
    //                         name='question'
    //                         placeholder='Question'
    //                         value={input.question}
    //                     />
    //                     <p className={`${style.rules} ${input.isQuestionValid ? style.hide : null}`}>
    //                         Question must be atl east 5 char
    //                     </p>
    //                 </div>
    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='answer'>
    //                         Answer
    //                     </label>

    //                     <input
    //                         className={style.input}
    //                         onChange={(event) => handleFormChange(index, event)}
    //                         name='answer'
    //                         placeholder='Answer'
    //                         value={input.answer}
    //                     />
    //                     <p className={`${style.rules} ${input.isAnswerValid ? style.hide : null}`}>
    //                         Answer must be at least 5 char
    //                     </p>
    //                 </div>
    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='hint'>
    //                         Hint
    //                     </label>

    //                     <input
    //                         className={style.input}
    //                         onChange={(event) => handleFormChange(index, event)}
    //                         name='hint'
    //                         placeholder='Hint'
    //                         value={input.hint}
    //                     />
    //                     <p className={`${style.rules} ${input.isHintValid ? style.hide : null}`}>
    //                         Hint must be at least 5 char
    //                     </p>
    //                 </div>

    //                 <img
    //                     className={style.removeBtn}
    //                     src={"../../cancel.png"}
    //                     alt='trash'
    //                     onClick={() => removeFields(index)}
    //                 />
    //             </div>
    //         </>
    //     );
    // };

    // return (
    //     <section className={style.addRiddleWrapper}>
    //         <section className={style.addRiddleSection}>
    //             <form onSubmit={submit} className={style.form}>
    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='as'>
    //                         Title
    //                     </label>

    //                     <input
    //                         className={`${style.input}`}
    //                         name='title'
    //                         type='text'
    //                         id='title'
    //                         value={riddleInfo["title"]}
    //                         onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                         placeholder='Insert some short title!'
    //                     />
    //                     <p className={`${isTitleValid ? style.hide : ""} ${style.rules}`}>
    //                         Title must be atleast 5 char
    //                     </p>
    //                 </div>

    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='description'>
    //                         Description
    //                     </label>

    //                     <textarea
    //                         className={`${style.input} ${style.textarea}`}
    //                         name='description'
    //                         id='description'
    //                         value={riddleInfo["description"]}
    //                         onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                         placeholder='Here you can describe shortly about what is the quiz.'></textarea>
    //                     <p className={`${isDescriptionValid ? style.hide : null} ${style.rules}`}>
    //                         Description must be at least 10 char
    //                     </p>
    //                 </div>

    //                 <div className={style.gameInfo}>
    //                     <div className={style.inputDiv}>
    //                         <label className={style.label} htmlFor='price'>
    //                             Price
    //                         </label>
    //                         <input
    //                             className={style.input}
    //                             name='price'
    //                             type='number'
    //                             id='price'
    //                             value={riddleInfo["price"]}
    //                             onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                             placeholder='Price'
    //                         />
    //                         <p className={`${style.rules} ${isPriceValid ? style.hide : null}`}>
    //                             {" "}
    //                             Price must be positive number
    //                         </p>
    //                     </div>
    //                     <div className={style.inputDiv}>
    //                         <label className={style.label} htmlFor='duration'>
    //                             Duration
    //                         </label>
    //                         <input
    //                             className={style.input}
    //                             name='duration'
    //                             type='text'
    //                             id='duration'
    //                             value={riddleInfo["duration"]}
    //                             onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                             placeholder='What time you will need to finish the riddle'
    //                         />
    //                         <p className={`${style.rules} ${isDurationValid ? style.hide : null}`}>
    //                             Duration must be at least 2 char
    //                         </p>
    //                     </div>
    //                 </div>

    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='where'>
    //                         Where
    //                     </label>

    //                     <input
    //                         className={style.input}
    //                         name='where'
    //                         type='text'
    //                         id='where'
    //                         value={riddleInfo["where"]}
    //                         onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                         placeholder='Where you will start the riddle or riddle area'
    //                     />
    //                     <p className={`${style.rules} ${isWhereValid ? style.hide : null}`}>
    //                         Where must be at least 2 char
    //                     </p>
    //                 </div>

    //                 <div className={style.inputDiv}>
    //                     <label className={style.label} htmlFor='google_map'>
    //                         Google maps link
    //                     </label>

    //                     <input
    //                         className={style.input}
    //                         name='google_map'
    //                         type='text'
    //                         id='google_map'
    //                         value={riddleInfo["google_map"]}
    //                         onChange={(e) => handlerFormChangeRiddleInfo(e)}
    //                         placeholder='Link to google maps marked riddle area'
    //                     />
    //                     <p className={`${style.rules} ${isGoogleValid ? style.hide : null}`}>
    //                         Link must be at least 5 char
    //                     </p>
    //                 </div>

    //                 <section className={style.inputSection}>
    //                     {inputFields.map((input, index) => inputRow(input, index))}

    //                     <div className={style.btnDiv}>
    //                         <button className={style.btn} onClick={addFields}>
    //                             Add more
    //                         </button>
    //                         <button className={style.btn}>Submit</button>
    //                     </div>
    //                 </section>
    //             </form>
    //         </section>
    //     </section>
    // );
}
