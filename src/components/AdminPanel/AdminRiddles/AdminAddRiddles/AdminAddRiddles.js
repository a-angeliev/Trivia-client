import style from "./AdminAddRiddles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CreateRiddle } from "../../../../service/riddleService";
export default function AdminAddRiddles() {
    let navigate = useNavigate()
    const [inputFields, setInputFields] = useState([
        { question: "", answer: "" },
    ]);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const addFields = (e) => {
        e.preventDefault();
        let newfield = { question: "", answer: "" };
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    
    const submit = (e) => {
        e.preventDefault();

        let questions=[]
        let answers = []
        inputFields.map(x=> {questions.push(x.question);answers.push(x.answer)})
        
        const {title, description, hardnes} = Object.fromEntries(new FormData(e.target))
        let number_of_questions = inputFields.length
    
        
        console.log(parseFloat(hardnes).toFixed(2));
        let data={title, description,price: parseFloat(hardnes).toFixed(2), number_of_questions, questions: questions.join("@"), answers: answers.join("@")}

        CreateRiddle(data).then(res=> navigate('/admin-panel'))
    }
    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form onSubmit={submit} className={style.form}>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" id="title" />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"></textarea>

                    <label htmlFor="hardnes">Hardnes</label>
                    <input name="hardnes" type="number" id="hardnes" />

                    <section className={style.inputSection}>
                        
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index}>
                                    <input  onChange={event => handleFormChange(index, event)} name="question" placeholder="question" value={input.question} />
                                    <input  onChange={event => handleFormChange(index, event)} name="answer" placeholder="answer" value={input.answer} />
                                    <button onClick={() => removeFields(index)}>Remove</button>
                                </div>
                            );
                        })}
                        <button onClick={addFields}>Add more</button>
                    </section>
                    <button >Submit</button>
                </form>
                
            </section>
        </section>
    );
}
