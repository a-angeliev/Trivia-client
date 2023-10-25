import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import * as requester from "../../service/requester";
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

    const { riddleId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRiddleInfo = async () => {
            let response = await riddleService.getOne(riddleId);
            setRes(response);
        };

        fetchRiddleInfo().then((err) => console.log(err));
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        // loadPayment? setLoadPayment(false):
        setLoadPayment(true);
    };

    const discountValidation = () => {
        const code = { discount_code: discountInput };
        console.log(code);

        requester.post("http://127.0.0.1:5000/discount/validate", JSON.stringify(code)).then((resp) => {
            console.log("dsadsa", res, "discount_code response");
            if (resp["is_valid"]) {
                console.log(resp.discount);
                setDiscountAmount(Number(resp.discount));
                // let newPrice = res.price - (res.price*Number(resp.discount)/100)
                // setRes({...res, price: newPrice})
                setLoadPayment(false);
                setDiscountCode(discount_code);
            } else {
                setDiscountAmount(0);
                setDiscountCode("");
                setLoadPayment(false);
                alert("Discount code is invalid!");
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const discount_code = Object.fromEntries(new FormData(e.target));
        console.log(discount_code);
        requester.post("http://127.0.0.1:5000/discount/validate", JSON.stringify(discount_code)).then((resp) => {
            // console.log(res, "discount_code response")
            if (resp["is_valid"]) {
                console.log(resp.discount);
                setDiscountAmount(Number(resp.discount));
                // let newPrice = res.price - (res.price*Number(resp.discount)/100)
                // setRes({...res, price: newPrice})
                setLoadPayment(false);
                setDiscountCode(discount_code);
            } else {
                setDiscountAmount(0);
                setDiscountCode("");
                setLoadPayment(false);
                alert("Discount code is invalid!");
            }
        });
    };

    return (
        <>
            <section className={style.eventWhapper}>
                <PayPalScriptProvider
                    options={{
                        "client-id": "AWfYTOnjSJgtSZaqRdR1SjIkehKuXp8GSWXGP3-K1udlWgq64mOv9znAyXa7EyLANzSmkJ-y7myqX0J8",
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
                                <div className={style.inputDiv}>
                                    <label
                                        className={`${style.label} ${discountAmount !== 0 ? style.validLabel : ""}`}
                                        htmlFor='discount'>
                                        discount code
                                    </label>
                                    <input
                                        className={`${style.input} ${discountAmount !== 0 ? style.validInput : ""}`}
                                        value={discountInput}
                                        onChange={(e) => setDiscountInput(e.target.value)}
                                        placeholder='code'
                                        name='discount'></input>
                                    <div className={discountAmount !== 0 ? style.textSpaceBetween : style.textRight}>
                                        {discountAmount !== 0 ? (
                                            <p className={style.greenText}>{discountAmount}% off!</p>
                                        ) : (
                                            ""
                                        )}
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
                        <div className={style.paypalBtn}>
                            {!loadPayment ? (
                                <button className={style.loadPaymentBtn} onClick={onClick}>
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
