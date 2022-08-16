import React, { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as riddleService from "../../service/riddleService";

export default function Checkout(props) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [riddle, setRiddle] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setRiddle(props.riddle);
    }, []);

    console.log(props.riddle);
    const product = {
        description: `${props.riddle.title}, ID:${props.riddle.id}`,
        price: props.riddle.price,
    };

    const handlerApprove = (orderId) => {
        //callback fucntion to fulfill order

        const fetchData = async () => {
            let response = await riddleService.createEvent(
                props.riddle.id
            );

            let firstHalf = response.url.slice(0, 34);
            let token = response.url.slice(34);
            console.log(response, 332211);
            if (firstHalf == "http://localhost:3000/event?token=" && token) {
                navigate(`/event?token=${token}`);
            } else {
                console.log(response);
            }
        };
        fetchData().then((err) => console.log(err));

        //if response is success
        // setPaidFor(false)
        //Refresh user accout or subsscription status

        //alert if you cant fulfill order
        // setError("some error")
    };

    if (paidFor) {
        //display massage or rederect for successes purches
        alert("succsess purches");
    }
    if (error) {
        // display error for payment or redirect
        alert(error);
    }
    return (
        <>
            <div></div>

            <div className="paypal-button-container">
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: product.description,
                                    amount: {
                                        value: product.price,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log("order", order);

                        handlerApprove(data.orderID);
                    }}
                    onError={(err) => {
                        setError(err);
                        console.error("Paypal chechout onError", err);
                    }}
                />
            </div>
            <iframe
                src={
                    "https://www.google.com/maps/d/embed?mid=1s2us0IHZaFUf7EnZOOv9z2of-XZFpgY&hl=en&ehbc=2E312F"
                }
                width="640"
                height="480"
                frameBorder="0"
                allowFullScreen
            ></iframe>

            <iframe
                src={
                    "https://www.google.com/maps/d/u/0/embed?mid=1-ZWY43yqDF89M-wWDOF7-FNtQRoFLLQ&ehbc=2E312F"
                }
                width="640"
                height="480"
            ></iframe>
            
        </>
    );
}
