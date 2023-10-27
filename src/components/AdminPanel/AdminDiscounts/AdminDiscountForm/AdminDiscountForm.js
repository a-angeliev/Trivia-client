import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import style from "./AdminDiscountForm.module.css";

export const DiscountForm = (props) => {
    const [startedTime, setStartedTime] = useState();
    const [endedTime, setEndedTime] = useState();
    const [discountData, setDiscountData] = useState({
        code: "",
        discount: "",
    });

    const [isCodeValid, setIsCodeValid] = useState(false);
    const [isDiscountValid, setIsDiscountValid] = useState(false);

    useEffect(() => {
        if (props.action === "edit") {
            setStartedTime(props.startedTime);
            setEndedTime(props.endedTime);
            setDiscountData(props.discountData);

            setIsCodeValid(props.discountData.code.length > 3);
            setIsDiscountValid(props.discountData.discount > 0 && props.discountData.discount <= 100 ? true : false);
        }
    }, [props]);

    const handleCodeInput = (e) => {
        let data = { ...discountData };
        data[e.target.name] = e.target.value;
        data["code"].length > 3 ? setIsCodeValid(true) : setIsCodeValid(false);
        data["discount"] > 0 && data["discount"] < 100 ? setIsDiscountValid(true) : setIsDiscountValid(false);
        setDiscountData(data);
    };

    const submit = (e) => {
        e.preventDefault();
        let { code, discount } = discountData;
        let data = {
            code,
            discount,
            started_on: startedTime,
            ended_on: endedTime,
        };
        if (startedTime && endedTime && isCodeValid && isDiscountValid) {
            if (props.action === "edit") {
                props.editDiscountHandler(data);
            } else if (props.action === "add") {
                props.createDiscount(data);
            }
        } else {
            alert("You must fill all fields!");
        }
    };

    return (
        <section className={style.addRiddleWrapper}>
            <section className={style.addRiddleSection}>
                <form className={style.form}>
                    <div className={style.inputDiv}>
                        <label className={style.label} htmlFor='code'>
                            Code
                        </label>
                        <input
                            className={style.input}
                            name='code'
                            type='text'
                            id='code'
                            onChange={(e) => handleCodeInput(e)}
                            value={discountData.code}
                            placeholder='Random code'
                        />
                        <p className={`${style.rules} ${isCodeValid ? style.hide : null}`}>
                            Code must be longer than 3 char
                        </p>
                    </div>

                    <div className={style.inputDiv}>
                        <label className={style.label} htmlFor='discount'>
                            Discount %
                        </label>

                        <input
                            className={style.input}
                            name='discount'
                            id='discount'
                            type='number'
                            onChange={(e) => handleCodeInput(e)}
                            value={discountData.discount}
                            placeholder='Enter discount amount in % in range 1% to 99%'
                        />

                        <p className={`${style.rules} ${isDiscountValid ? style.hide : null}`}>
                            Value must be between 0% and 100%
                        </p>
                    </div>
                    <div className={style.dateInputWhapper}>
                        <div className={`${style.inputDiv}`}>
                            <label className={style.label} htmlFor='started_on'>
                                Started on
                            </label>
                            <DateTimePicker
                                className={`${style.input} ${style.dateInput}`}
                                onChange={setStartedTime}
                                value={startedTime}
                                name='started_on'
                                format='y-MM-dd H:mm:ss'
                                hourAriaLabel='Hour'
                            />
                            <p className={`${style.rules} ${startedTime ? style.hide : null}`}>Must be selected date</p>
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.label} htmlFor='ended_on'>
                                Ended on
                            </label>
                            <DateTimePicker
                                className={`${style.input} ${style.dateInput}`}
                                onChange={setEndedTime}
                                value={startedTime}
                                name='ended_on'
                                format='y-MM-dd H:mm:ss'
                                hourAriaLabel='Hour'
                            />
                            <p className={`${style.rules} ${endedTime ? style.hide : null}`}>Must be selected date</p>
                        </div>
                    </div>

                    <div className={style.btnDiv}>
                        {props.action === "add" ? (
                            <button className={style.btn} onClick={submit}>
                                Add
                            </button>
                        ) : (
                            <>
                                <button className={style.btn} onClick={submit}>
                                    Edit
                                </button>
                                <button className={style.btn} onClick={(e) => props.deleteDiscountHandler(e)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </section>
        </section>
    );
};
