import style from "./CreateEvent.module.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as requester from "../../service/requester";
import * as riddleService from "../../service/riddleService";
import Checkout from "../Checkout/Checkout";

export default function CreateEvent() {
    // let [guessedQuestions, setGuessedQuestions] = useState(0)
    // let [questions, setQuestions] = useState("");
    // let [answer, setAnswer] = useState("");
    // let [end, setEnd] = useState(false);
    // let [endMsg, setEndMsg] = useState("");
    // let [url, setUrl] = useState("");
    const [res, setRes] = useState({});
    const [loadPayment, setLoadPayment] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discount_code, setDiscountCode] = useState("");

    let { riddleId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRiddleInfo = async () => {
            let response = await riddleService.getOne(riddleId);
            setRes(response);
        };
        // const fetchData = async () => {
        //     let response = await riddleService.createEvent(riddleId)

        //     let firstHalf = response.url.slice(0, 34)
        //     let token = response.url.slice(34)

        //     if(firstHalf=="http://localhost:3000/event?token=" && token){
        //         navigate(`/event?token=${token}`)
        //     }else{
        //         console.log(response);
        //     }

        // }
        // fetchData().then(err=> console.log(err))
        fetchRiddleInfo().then((err) => console.log(err));
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        // loadPayment? setLoadPayment(false):
        setLoadPayment(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const discount_code = Object.fromEntries(new FormData(e.target));
        console.log(discount_code);
        requester
            .post(
                "http://127.0.0.1:5000/discount/validate",
                JSON.stringify(discount_code)
            )
            .then((resp) => {
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
                        "client-id":
                            "AWfYTOnjSJgtSZaqRdR1SjIkehKuXp8GSWXGP3-K1udlWgq64mOv9znAyXa7EyLANzSmkJ-y7myqX0J8",
                        currency: "EUR",
                    }}
                >
                    <div className={style.product}>
                        <div className={style.checkoutInfo}>
                            <h1 className={style.title}>
                                Checkout for {res.title}
                            </h1>
                            <iframe
                                src={res.google_map}
                                className={style.googleMap}
                            ></iframe>
                            <form
                                onSubmit={onSubmit}
                                className={style.discountForm}
                            >
                                <label htmlFor="discount"></label>
                                <input
                                    type="text"
                                    id="discount_code"
                                    name="discount_code"
                                    className={style.discountFormInput}
                                />
                                <button>Check</button>
                                {discount_code !== "" ? (
                                    <p
                                        className={style.discountCode}
                                    >{`Dscount code: ${discount_code.discount_code} for ${discountAmount}% off`}</p>
                                ) : null}
                            </form>
                            <div className={style.groupPriceDiv}>
                                <div className={style.priceInfoDiv}>
                                    <p>{res.title}</p>
                                    <p>
                                        $
                                        {Number.parseFloat(res.price).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                                <div className={style.priceInfoDiv}>
                                    <p>Discount</p>
                                    <p>
                                        $
                                        {Number.parseFloat(
                                            (res.price * discountAmount) / 100
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <div className={style.priceInfoDiv}>
                                    <p className={style.bold}>All</p>
                                    <p className={style.bold}>
                                        $
                                        {Number.parseFloat(
                                            res.price -
                                                (res.price * discountAmount) /
                                                    100
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className={style.horizontalDevider}> </div>

                            <div className={style.paypalBtn}>
                                {!loadPayment ? (
                                    <button
                                        className={style.loadPaymentBtn}
                                        onClick={onClick}
                                    >
                                        Load Payment options
                                    </button>
                                ) : (
                                    <Checkout
                                        riddle={res}
                                        discount={discountAmount}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={style.riddleInfo}>
                            <p className={style.riddleInfoP}>Description: {res.description}</p>
                            <p className={style.riddleInfoP}>
                                Number of questions: {res.number_of_questions}
                            </p>
                            <p className={style.riddleInfoP}>Duration: {res.duration}</p>
                            <p className={style.riddleInfoP}>Where: {res.where}</p>
                        </div>
                        {/* <p>Title: {res.title}</p>
                <p>Discount: {res.discount}</p>
                {discountAmount !== 0 ? <p>Price after discount: {res.price-(res.price*discountAmount/100)}</p>:<p>Price: {res.price}</p>}
                <p>Id: {res.id}</p>
                <p>Description: {res.description}</p>
                <p>Number_of_questions: {res.number_of_questions}</p>
                <p>Duration: {res.duration}</p>
                <p>Where: {res.where}</p>
                <iframe src={res.google_map} width="640" height="480"></iframe>
                <form onSubmit={onSubmit}>
                    <label htmlFor="discount"></label>
                    <input
                        type="text"
                        id="discount_code"
                        name="discount_code"
                    />
                    <button>Check</button>
                    {discount_code !== "" ?<p>{`Dscount code: ${discount_code.discount_code} for ${discountAmount}% off`}</p>: null}
                </form>
                

                {!loadPayment ? (
                    <button onClick={onClick}>Load Payment options</button>
                ) : (
                    <Checkout riddle={res} discount={discountAmount} />
                )} */}
                    </div>
                </PayPalScriptProvider>
            </section>
        </>
    );
}
