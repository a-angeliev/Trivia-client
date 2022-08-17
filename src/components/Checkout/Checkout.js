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

    const product = {
        description: `${props.riddle.title}, ID:${props.riddle.id}`,
        price: props.riddle.price-(props.riddle.price*props.discount/100),
    };

    // const onSubmit =(e) => {
    //     e.preventDefault()
    //     const discount_code = Object.fromEntries(new FormData(e.target));
    //     console.log(discount_code);
    //     requester.post("http://127.0.0.1:5000/discount/validate", JSON.stringify(discount_code)).then(res=> console.log(res, "discount_code response"))
    // }
    const handlerApprove = (order) => {
        //callback fucntion to fulfill order
        console.log(order.purchase_units[0].payments.captures[0].id, "transactionId");
        console.log(order.purchase_units[0].payments.captures[0].update_time, "update_time");
        console.log(order.purchase_units[0].amount.value, "amount_value");
        console.log(order.purchase_units[0].description, "description");
        console.log(order.payer.email_address, "email_address");
        const fetchData = async () => {
            let response = await riddleService.createEvent(
                props.riddle.id
            );

            let firstHalf = response.url.slice(0, 34);
            let token = response.url.slice(34);
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

                        handlerApprove(order);
                    }}
                    onError={(err) => {
                        setError(err);
                        console.error("Paypal chechout onError", err);
                    }}
                />
            </div>
            
            
        </>
    );
}
