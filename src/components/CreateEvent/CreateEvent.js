import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import * as discountService from "../../service/discountService";
import * as riddleService from "../../service/riddleService";
import Checkout from "../Checkout/Checkout";

import style from "./CreateEvent.module.css";

export default function CreateEvent() {
    const { user } = useContext(AuthContext);

    const [res, setRes] = useState({});
    const [loadPayment, setLoadPayment] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discount_code, setDiscountCode] = useState("");
    const [discountInput, setDiscountInput] = useState("");
    const [isDiscountValid, setIsDiscountValid] = useState(true);

    const { riddleId } = useParams();

    useEffect(() => {
        riddleService
            .getOne(riddleId)
            .then((res) => setRes(res))
            .catch((err) => console.log(err));
    }, []);

    const expandPaymentOptions = (e) => {
        e.preventDefault();
        setLoadPayment(true);
    };

    const discountValidation = () => {
        const code = { discount_code: discountInput };

        discountService.validateDiscount(JSON.stringify(code)).then((res) => {
            if (res["is_valid"]) {
                setDiscountAmount(Number(res.discount));
                setDiscountCode(discount_code);
            } else {
                setIsDiscountValid(false);
                setDiscountAmount(0);
                setDiscountCode("");
            }
            setLoadPayment(false);
        });
    };

    return (
        <>
            <section className={style.eventWhapper}>
                <PayPalScriptProvider
                    options={{
                        "client-id": "ASQNZ7NDvsJOLxiS8B4U7vb1ziQD8WcBtfVqM65P1v3v8rzCiwj5WXnZjt09JxTbsjK1Iey5yb3J6NZ-",
                        currency: "EUR",
                    }}>
                    <div className={style.wrapper}>
                        <h2 className={style.title}>Checkout for {res.title}</h2>
                        <div className={style.map}>
                            <iframe title={res.google_map} src={res.google_map} className={style.googleMap}></iframe>
                        </div>
                        <div className={style.info}>
                            <div className={style.infoTitleDiv}>
                                <p>Purchase details</p>
                            </div>
                            <div className={style.description}>
                                <p className={style.desc}>Description: {res.description}</p>
                                <p className={style.descP}>Number of questions: {res.number_of_questions}</p>
                                <p className={style.descP}>Duration: {res.duration}</p>
                                <p className={style.descP}>Location: {res.where}</p>
                            </div>
                        </div>
                        <div className={style.summary}>
                            <div className={style.inputsDiv}>
                                <div className={style.inputDiv}>
                                    <label className={style.label} htmlFor='email'>
                                        email address
                                    </label>
                                    <input
                                        disabled
                                        className={style.input}
                                        value={user.email}
                                        placeholder='Admin@admin.com'
                                        name='email'></input>
                                </div>
                                {console.log(user)}
                                <div className={style.inputDiv}>
                                    <label
                                        className={`${style.label} ${discountAmount !== 0 ? style.validLabel : ""} ${
                                            isDiscountValid ? "" : style.invalidLabel
                                        }`}
                                        htmlFor='discount'>
                                        discount code
                                    </label>
                                    <input
                                        className={`${style.input} ${discountAmount !== 0 ? style.validInput : ""} ${
                                            isDiscountValid ? "" : style.invalidInput
                                        }`}
                                        value={discountInput}
                                        onChange={(e) => setDiscountInput(e.target.value)}
                                        placeholder='code'
                                        onSelect={() => setIsDiscountValid(true)}
                                        name='discount'></input>
                                    <div
                                        className={
                                            discountAmount !== 0 || isDiscountValid === false
                                                ? style.textSpaceBetween
                                                : style.textRight
                                        }>
                                        {discountAmount !== 0 ? (
                                            <p className={style.greenText}>{discountAmount}% off!</p>
                                        ) : (
                                            ""
                                        )}
                                        {isDiscountValid ? "" : <p className={style.redText}>Wrong discount code!</p>}
                                        <p
                                            onClick={() => {
                                                discountValidation();
                                            }}
                                            className={style.checkCode}>
                                            Check discount code
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={style.pricing}>
                                <div className={style.infoTitleDiv}>
                                    <p>Pricing</p>
                                </div>
                                <div className={style.priceSummary}>
                                    <div className={style.row}>
                                        <p>Price</p>
                                        <p>${Number.parseFloat(res.price).toFixed(2)}</p>
                                    </div>
                                    <div className={style.row}>
                                        <p>Discount</p>
                                        <p>${Number.parseFloat((res.price * discountAmount) / 100).toFixed(2)}</p>
                                    </div>
                                    <div className={style.horizontalDivider}></div>
                                    <div className={style.row}>
                                        <p>Total</p>
                                        <p>
                                            $
                                            {Number.parseFloat(res.price - (res.price * discountAmount) / 100).toFixed(
                                                2
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.paypalBtnDiv}>
                            {!loadPayment ? (
                                <button className={style.btn} onClick={expandPaymentOptions}>
                                    Load Payment options
                                </button>
                            ) : (
                                <Checkout riddle={res} discount={discountAmount} />
                            )}
                        </div>
                    </div>
                </PayPalScriptProvider>
            </section>
        </>
    );
}
