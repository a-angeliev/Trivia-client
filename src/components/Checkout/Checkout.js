import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function Checkout(props) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const product = {
        description: "some product",
        price: 20,
    };

    const handlerApprove = (orderId) => {
        //callback fucntion to fulfill order

        //if response is success
        setPaidFor(true);

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
        <div>

        </div>
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
            <iframe src={"https://www.google.com/maps/d/embed?mid=1s2us0IHZaFUf7EnZOOv9z2of-XZFpgY&hl=en&ehbc=2E312F"} width="640" height="480" frameBorder="0"  allowFullScreen ></iframe>

            <iframe src={"https://www.google.com/maps/d/u/0/embed?mid=1-ZWY43yqDF89M-wWDOF7-FNtQRoFLLQ&ehbc=2E312F"} width="640" height="480"></iframe>
        </>
    );
}
