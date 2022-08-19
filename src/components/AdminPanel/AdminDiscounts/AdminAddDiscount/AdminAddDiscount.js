import style from "./AdminAddDiscount.module.css";
import DateTimePicker from "react-datetime-picker";
import { useContext, useEffect, useState } from "react";
import * as requester from "../../../../service/requester";
import { DiscountContext } from "../../../../context/discountContext";
import { useNavigate } from "react-router-dom";

export default function AdminAddDiscount() {
    const [startedTime, setStartedTime] = useState();
    const [endedTime, setendedTime] = useState();
    const [codeInfo, setCodeInfo] = useState({ code: "", discount: "" });
    const navigation = useNavigate()
    const { addDiscount } = useContext(DiscountContext);

    const handleCodeInput = (e) => {
        let data = { ...codeInfo };
        data[e.target.name] = e.target.value;
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
        requester.post("http://127.0.0.1:5000/discounts", data).then((res) => {
            addDiscount(res);
            navigation('/admin-panel/discount')

        });
    };

    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form className={style.form}>
                    <label htmlFor="code">Code</label>
                    <input
                        name="code"
                        type="text"
                        id="code"
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.code}
                        placeholder="Random code"
                    />

                    <label htmlFor="discount">Discount %</label>
                    <input
                        name="discount"
                        id="discount"
                        type="number"
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.discount}
                        placeholder="Enter discount amount in % in range 1% to 99%"
                    />

                    <div className={style.dateInputWhapper}>
                        <div className={style.dateInputDiv}>
                            <p>Started on:</p>
                            <DateTimePicker
                                className={style.dateInput}
                                onChange={setStartedTime}
                                value={startedTime}
                                format="y-MM-dd H:mm:ss"
                                hourAriaLabel="Hour"
                            />
                        </div>
                        <div className={style.dateInputDiv}>
                            <p>Ended on:</p>
                            <DateTimePicker
                                className={style.dateInput}
                                onChange={setendedTime}
                                value={endedTime}
                                format="y-MM-dd H:mm:ss"
                                hourAriaLabel="Hour"
                            />
                        </div>
                    </div>

                    <section className={style.inputSection}>
                        <div>
                            <button onClick={handlerAddDiscount}>Add</button>
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
