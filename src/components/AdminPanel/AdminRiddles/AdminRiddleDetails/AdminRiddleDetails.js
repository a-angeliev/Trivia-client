import style from "./AdminRiddleDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as riddleService from "../../../../service/riddleService";
export default function AdminRiddleDetails() {
    const { riddleId } = useParams();
    const [title, setTitle] = useState("");
    const [description,  setDescription] = useState('');
    const [hardnes,  setHardnes] = useState('');
    const [inputFields, setInputFields] = useState([]);
    let questions;
    let answers;


    const handleFormChangeInput = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };
   
    const handlerFromChangeTitle = (e) => {
        setTitle(e.target.value)
        console.log(title);
    }
    const handlerFromChangeDesc = (e) => {
        setDescription(e.target.value)
        console.log(description);
    }
    const handlerFromChangeHardnes = (e) => {
        setHardnes(e.target.value)
        console.log(hardnes);
    }
    useEffect(() => {
        (async () => {
   
            let a = await riddleService.getOne(riddleId);
            questions = a ? a.questions.split("@") : [];
            answers = a ? a.answers.split("@") : [];
            let inputFieldObj = []
            questions.map((x,i) => {

                    let newfield = { question: `${x}`, answer: `${answers[i]}` };
                    inputFieldObj = [...inputFieldObj, newfield]
                })
            setInputFields(inputFieldObj)
            setTitle(a.title);
            setDescription(a.description)
            setHardnes(a.price)

        })();
    }, [riddleId]);
  


    return (
        <section>
            <section>
                <form>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" id="title" onChange= {e => handlerFromChangeTitle(e)} value={title} />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"onChange= {e => handlerFromChangeDesc(e)} value={description}></textarea>

                    <label htmlFor="hardnes">Hardnes</label>
                    <input name="hardnes" type="number" id="hardnes" onChange= {e => handlerFromChangeHardnes(e)} value={hardnes} />
                    <section>
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index}>
                                    <input
                                        name="question"
                                        placeholder={input.question}
                                        onChange={event => handleFormChangeInput(index, event)}
                                        value={input.question}
                                    />
                                    <input
                                        name="answer"
                                        placeholder={input.answer}
                                        onChange={event => handleFormChangeInput(index, event)}
                                        value={input.answer}
                                    />
                                </div>
                            );
                        })}
                        <button>Edit</button>
                        <button>Delete</button>
                    </section>
                </form>
            </section>
        </section>
    );
}
