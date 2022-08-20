import DateTimePicker from "react-datetime-picker";
import { useContext, useEffect, useState } from "react";
import * as requester from "../../../../service/requester";
import { useNavigate, useParams } from "react-router-dom";

import { DiscountContext } from "../../../../context/discountContext";
import style from "./AdminDiscountDetails.module.css";

export default function AdminDiscountDetails() {
    const [startedTime, setStartedTime] = useState();
    const [endedTime, setendedTime] = useState();
    const [codeInfo, setCodeInfo] = useState({ code: "", discount: "" });

    const [isCodeValid, setIsCodeValid] = useState(false);
    const [isDiscountValid, setIsDiscountValid] = useState(false);

    const navigation = useNavigate();
    const { discounts, editDiscount, deleteDiscount } =
        useContext(DiscountContext);

    const { discountId } = useParams();

    useEffect(() => {
        let discount = discounts.filter((x) => x.id == discountId);
        if (discount) {
            setStartedTime(new Date(discount[0].started_on));
            setendedTime(new Date(discount[0].ended_on));
            let data = {
                code: discount[0].code,
                discount: discount[0].discount,
            };
            setCodeInfo(data);
            console.log(typeof discount[0].started_on);
            data["code"].length > 3 ? setIsCodeValid(true) : setIsCodeValid(false);
            data["discount"] > 0 && data["discount"] < 100
            ? setIsDiscountValid(true)
            : setIsDiscountValid(false);

        }
    }, [discountId]);

    const handleCodeInput = (e) => {
        let data = { ...codeInfo };
        data[e.target.name] = e.target.value;

        data["code"].length > 3 ? setIsCodeValid(true) : setIsCodeValid(false);
        data["discount"] > 0 && data["discount"] < 100
            ? setIsDiscountValid(true)
            : setIsDiscountValid(false);

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
        if( startedTime && endedTime && isCodeValid && isDiscountValid){
            requester
            .put(`http://127.0.0.1:5000/discounts/${discountId}/edit`, data)
            .then((res) => {
                editDiscount(res, discountId);
                navigation("/admin-panel/discount");
            });
        }else{
            alert("You must fill all fields!")
        }
        
    };

    const handlerDeleteDiscount = (e) => {
        e.preventDefault();
        let confirmation = window.confirm('Are you sure you want to delete this?')
        if(confirmation){
            requester
            .del(`http://127.0.0.1:5000/discounts/${discountId}/edit`)
            .then((res) => {
                deleteDiscount(discountId);
                navigation("/admin-panel/discount");
            });
        }
        
    };
    return (
        <section className={style.addRiddleWapper}>
            <section className={style.addRiddleSection}>
                <form className={style.form}>
                    <label htmlFor="code">Code</label>
                    <p
                        className={
                            isCodeValid ? style.hide : style.validationMsg
                        }
                    >
                        Code must be longer than 3 char
                    </p>
                    <input
                        className={
                            isCodeValid ? style.correct : style.incorrect
                        }
                        name="code"
                        type="text"
                        id="code"
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.code}
                        placeholder="Random code"
                    />

                    <label htmlFor="discount">Discount %</label>
                    <p
                        className={
                            isDiscountValid ? style.hide : style.validationMsg
                        }
                    >
                        Value must be bettween 0% and 100%
                    </p>
                    <input
                        className={
                            isDiscountValid ? style.correct : style.incorrect
                        }
                        name="discount"
                        id="discount"
                        type="number"
                        onChange={(e) => handleCodeInput(e)}
                        value={codeInfo.discount}
                        placeholder="Enter discount amount in % in range 1% to 99%"
                    />

                    <div className={style.dateInputWhapper}>
                        <div className={style.dateInputDiv}>
                            <p className={style.dateInputDivP}>Started on:</p>
                            <p
                                className={
                                    startedTime
                                        ? style.hide
                                        : style.validationMsg
                                }
                            >
                                Must be selected date
                            </p>
                            <DateTimePicker
                                className={`${style.dateInput} ${
                                    startedTime
                                        ? style.correct
                                        : style.incorrect
                                }`}
                                onChange={setStartedTime}
                                value={startedTime}
                                format="y-MM-dd HH:mm:ss"
                                hourAriaLabel="Hour"
                            />
                        </div>
                        <div className={style.dateInputDiv}>
                        <p className={style.dateInputDivP}>Ended on:</p>
                            <p
                                className={
                                    endedTime
                                        ? style.hide
                                        : style.validationMsg
                                }
                            >
                                Must be selected date
                            </p>
                            <DateTimePicker
                                className={`${style.dateInput} ${
                                    endedTime
                                        ? style.correct
                                        : style.incorrect
                                }`}
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
