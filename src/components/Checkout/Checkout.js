import { PayPalButtons } from "@paypal/react-paypal-js";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

import * as riddleService from "../../service/riddleService";
import * as transactionService from "../../service/transactionService";

import style from "./Checkout.module.css";

export default function Checkout(props) {
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();

    const product = {
        description: `${props.riddle.title}, ID:${props.riddle.id}`,
        price: props.riddle.price - (props.riddle.price * props.discount) / 100,
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    const createEvent = (behavior) => {
        riddleService
            .createEvent(props.riddle.id)
            .then((res) => {
                const token = res.url.slice(34);
                if (behavior === "test") {
                    navigate(`/event?token=${token}`);
                } else if (behavior === "real") {
                    navigate(`/congratulations`);
                }
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            });
    };

    const testHandler = () => {
        setSpinner(true);
        const transaction_data = {
            transactionId: Math.floor(Math.random() * 1000),
            update_time: "2023-10-31T13:06:55Z",
            amount: Math.floor(Math.random() * 1000),
            description: "Some dummy description",
            email: "admin@admin.com",
        };

        transactionService.createTransaction(JSON.stringify(transaction_data)).then((res) => console.log(res));
        createEvent("test");
    };

    const handlerApprove = (order) => {
        setSpinner(true);

        const transaction_data = {
            transactionId: order.purchase_units[0].payments.captures[0].id,
            update_time: order.purchase_units[0].payments.captures[0].update_time,
            amount: order.purchase_units[0].amount.value,
            description: order.purchase_units[0].description,
            email: order.payer.email_address,
        };

        transactionService.createTransaction(JSON.stringify(transaction_data)).then((res) => console.log(res));
        createEvent("real");
    };

    return (
        <>
            {spinner ? (
                <div className={style.spinner}>
                    <ThreeDots
                        height='80'
                        width='80'
                        radius='9'
                        color='#4fa94d'
                        ariaLabel='three-dots-loading'
                        wrapperStyle={{}}
                        wrapperClassName=''
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    <button className={style.skipBtn} onClick={testHandler}>
                        Skip payment and redirect to the riddle
                    </button>
                    <div className='paypal-button-container'>
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
            )}
        </>
    );
}
