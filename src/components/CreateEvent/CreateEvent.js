import style from "./CreateEvent.module.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    const [loadPayment, setLoadPayment] = useState(false)

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

    const onClick=(e)=>{
        e.preventDefault();
        setLoadPayment(true)
    }

    return (
        <>
        
            <PayPalScriptProvider
                options={{
                    "client-id":
                        "AWfYTOnjSJgtSZaqRdR1SjIkehKuXp8GSWXGP3-K1udlWgq64mOv9znAyXa7EyLANzSmkJ-y7myqX0J8",
                    currency: "EUR",
                }}
            >
                <p>Title: {res.title}</p>
                <p>Discount: {res.discount}</p>
                <p>Price: {res.price}</p>
                <p>Id: {res.id}</p>
                <p>Description: {res.description}</p>
                <p>Number_of_questions: {res.number_of_questions}</p>
                <p>Duration: {res.duration}</p>
                <p>Where: {res.where}</p>
                <iframe
                src={
                    res.google_map
                }
                width="640"
                height="480"
            ></iframe>
                {
                    !loadPayment? <button onClick={onClick}>Load Payment options</button>:<Checkout riddle={res} />
                }
            </PayPalScriptProvider>
        </>
        
    );
}
