import DateTimePicker from "react-datetime-picker";
import { useContext, useEffect, useState } from "react";
import * as requester from "../../../../service/requester";
import { useNavigate, useParams } from "react-router-dom";

import { DiscountContext } from "../../../../context/discountContext";
import style from "./AdminDiscountDetails.module.css";

export default function AdminDiscountDetails() {
    const [startedTime, setStartedTime] = useState(new Date());
    const [endedTime, setendedTime] = useState(new Date());
    const [codeInfo, setCodeInfo] = useState({ code: "", discount: "" });
    const navigation = useNavigate()
    const {discounts, editDiscount, deleteDiscount} = useContext(DiscountContext)

    const {discountId} = useParams()
    
    useEffect(()=>{
        let discount = discounts.filter(x => x.id == discountId)
        if(discount){
            setStartedTime(new Date(discount[0].started_on))
            setendedTime(new Date(discount[0].ended_on))
            let data = {code: discount[0].code, discount: discount[0].discount}
            setCodeInfo(data)
            console.log(typeof discount[0].started_on );
        }
    },[discountId])


    const handleCodeInput = (e) => {
        let data = { ...codeInfo };
        data[e.target.name] = e.target.value;
        setCodeInfo(data);
    };

    const handlerEditDiscount = (e) => {
        e.preventDefault();
        let { code, discount } = codeInfo;
        let data = {
            code,
            discount,
            started_on: startedTime,
            ended_on: endedTime,
        };
        requester.put(`http://127.0.0.1:5000/discounts/${discountId}/edit`, data).then((res) => {
            editDiscount(res, discountId)
            navigation('/admin-panel/discount')

        });
    };

    const handlerDeleteDiscount = (e) => {
        e.preventDefault();
        requester.del(`http://127.0.0.1:5000/discounts/${discountId}/edit`).then((res) => {
            deleteDiscount(discountId)
            navigation('/admin-panel/discount')

        });
    }
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
                                format="y-MM-dd HH:mm:ss"
                                hourAriaLabel="Hour"
                            />
                        </div>
                        <div className={style.dateInputDiv}>
                            <p>Ended on:</p>
                            <DateTimePicker
                                className={style.dateInput}
                                onChange={setendedTime}
                                value={endedTime}
                                format="y-MM-dd HH:mm:ss"
                                hourAriaLabel="Hour"
                            />
                        </div>
                    </div>

                    <section className={style.inputSection}>
                        <div>
                            <button onClick={handlerEditDiscount}>Edit</button>
                            <button onClick={handlerDeleteDiscount}>
                            Delete
                        </button>
                        </div>
                    </section>
                </form>
            </section>
        </section>
    );
}
