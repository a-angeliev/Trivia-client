import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { RiddleContext } from "../../../../context/riddleContext";
import { RiddleForm } from "../AdminRiddlesForm/AdminRiddlesForm";
import * as riddleService from "../../../../service/riddleService";

export default function AdminRiddleDetails() {
    const { riddleId } = useParams();

    const [riddleInfo, setRiddleInfo] = useState({
        title: "",
        description: "",
        price: 0.0,
        duration: "",
        where: "",
        google_map: "",
    });

    const [isFieldValid, setIsFieldValid] = useState({
        title: false,
        description: false,
        price: false,
        duration: false,
        where: false,
        google_map: false,
    });

    const [inputFields, setInputFields] = useState([
        {
            question: "",
            answer: "",
            hint: "",
            isQuestionValid: false,
            isAnswerValid: false,
            isHintValid: false,
        },
    ]);
    const navigate = useNavigate();
    const { riddleDelete, riddles, riddleEdit } = useContext(RiddleContext);

    let questions;
    let answers;
    let hints;

    useEffect(() => {
        (async () => {
            let riddle = await riddleService.getOne(riddleId);

            questions = riddle.questions ? riddle.questions.split("@") : [];
            answers = riddle.answers ? riddle.answers.split("@") : [];
            hints = riddle.hint ? riddle.hint.split("@") : [];
            let inputFieldObj = [];
            questions.map((x, i) => {
                let newfield = {
                    question: `${x}`,
                    answer: `${answers[i]}`,
                    hint: `${hints[i]}`,
                    isQuestionValid: x.length > 5,
                    isAnswerValid: answers[i].length > 5,
                    isHintValid: hints[i].length > 5,
                };
                inputFieldObj = [...inputFieldObj, newfield];
            });

            setInputFields(inputFieldObj);
            let title = riddle.title || "";
            let description = riddle.description || "";
            let price = riddle.price || 0.0;
            let duration = riddle.duration || "";
            let where = riddle.where || "";
            let google_map = riddle.google_map || "";

            const fieldState = { ...isFieldValid };
            fieldState.title = title.length >= 5 ? true : false;
            fieldState.description = description.length >= 10 ? true : false;
            fieldState.price = price >= 0 ? true : false;
            fieldState.duration = duration.length >= 2 ? true : false;
            fieldState.google_map = google_map.length >= 5 ? true : false;
            fieldState.where = where.length >= 2 ? true : false;

            setIsFieldValid(fieldState);

            setRiddleInfo({
                title,
                description,
                price,
                duration,
                where,
                google_map,
            });
        })();
    }, [riddleId]);

    const deleteRiddleHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this ?")) {
            riddleService
                .DeleteRiddle(riddleId)
                .then((res) => {
                    riddleDelete(riddleId);
                    navigate("/admin-panel");
                })
                .catch((err) => console.log(err));
        }
    };

    const editRiddle = (data) => {
        riddleService.EditRIddle(riddleId, data).then((res) => {
            riddleEdit(riddleId, res);
            navigate("/admin-panel");
        });
    };

    return (
        <RiddleForm
            action={"edit"}
            editRiddleHandler={(data) => editRiddle(data)}
            deleteRiddleHandler={deleteRiddleHandler}
            isFieldValid={isFieldValid}
            inputFields={inputFields}
            riddleInfo={riddleInfo}></RiddleForm>
    );
}
