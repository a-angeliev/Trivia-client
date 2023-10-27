import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

import { DiscountContext } from "../../../../context/discountContext";
import * as requester from "../../../../service/requester";

import style from "./AdminAddDiscount.module.css";

export default function AdminAddDiscount() {
    const [startedTime, setStartedTime] = useState();
    const [endedTime, setendedTime] = useState();
    const [codeInfo, setCodeInfo] = useState({ code: "", discount: "" });

    const [isCodeValid, setIsCodeValid] = useState(false);
    const [isDiscountValid, setIsDiscountValid] = useState(false);

    const navigation = useNavigate();
    const { addDiscount } = useContext(DiscountContext);

    const handleCodeInput = (e) => {
        let data = { ...codeInfo };
        data[e.target.name] = e.target.value;
        data["code"].length > 3 ? setIsCodeValid(true) : setIsCodeValid(false);
        data["discount"] > 0 && data["discount"] < 100 ? setIsDiscountValid(true) : setIsDiscountValid(false);
        setCodeInfo(data);
    };

    const handlerAddDiscount = (e) => {
        e.preventDefault();
        let { code, discount } = codeInfo;
        let data = {
            code,
            discount,
            started_on: startedTime,
            ended_on: endedTime,
        };
        if (startedTime && endedTime && isCodeValid && isDiscountValid) {
            requester.post("http://127.0.0.1:5000/discounts", data).then((res) => {
                addDiscount(res);
                navigation("/admin-panel/discount");
            });
        } else {
            alert("You must fill all fields!");
        }
    };

    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form className={style.form}>
                    <label htmlFor='code'>Code</label>
                    <p className={isCodeValid ? style.hide : style.validationMsg}>Code must be longer than 3 char</p>
                    <input
                        className={isCodeValid ? style.correct : style.incorrect}
                        name='code'
                        type='text'
                        id='code'
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.code}
                        placeholder='Random code'
                    />

                    <label htmlFor='discount'>Discount %</label>
                    <p className={isDiscountValid ? style.hide : style.validationMsg}>
                        Value must be bettween 0% and 100%
                    </p>

                    <input
                        className={isDiscountValid ? style.correct : style.incorrect}
                        name='discount'
                        id='discount'
                        type='number'
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.discount}
                        placeholder='Enter discount amount in % in range 1% to 99%'
                    />

                    <div className={style.dateInputWhapper}>
                        <div className={`${style.dateInputDiv}`}>
                            <p className={style.dateInputDivP}>Started on:</p>
                            <p className={startedTime ? style.hide : style.validationMsg}>Must be selected date</p>
                            <DateTimePicker
                                className={`${style.dateInput} ${startedTime ? style.correct : style.incorrect}`}
                                onChange={setStartedTime}
                                value={startedTime}
                                format='y-MM-dd H:mm:ss'
                                hourAriaLabel='Hour'
                            />
                        </div>
                        <div className={style.dateInputDiv}>
                            <p className={style.dateInputDivP}>Ended on:</p>
                            <p className={endedTime ? style.hide : style.validationMsg}>Must be selected date</p>
                            <DateTimePicker
                                className={`${style.dateInput} ${endedTime ? style.correct : style.incorrect}`}
                                onChange={setendedTime}
                                value={endedTime}
                                format='y-MM-dd H:mm:ss'
                                hourAriaLabel='Hour'
                            />
                        </div>
                    </div>

                    <section className={style.inputSection}>
                        <div>
                            <button className={style.btn} onClick={handlerAddDiscount}>
                                Add
                            </button>
                            {/* <button onClick={deleteRiddleHandler}>
                                Delete
                            </button> */}
                        </div>
                    </section>
                </form>
            </section>
        </section>
    );
}
