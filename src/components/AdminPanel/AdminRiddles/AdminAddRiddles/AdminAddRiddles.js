import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RiddleContext } from "../../../../context/riddleContext";
import { RiddleForm } from "../AdminRiddlesForm/AdminRiddlesForm";
import { CreateRiddle } from "../../../../service/riddleService";

export default function AdminAddRiddles() {
    const { riddleAdd } = useContext(RiddleContext);

    const navigate = useNavigate();

    const createRiddle = (data) => {
        CreateRiddle(data)
            .then((res) => {
                riddleAdd(res);
                navigate("/admin-panel");
            })
            .catch((err) => console.log(err));
    };

    return <RiddleForm createRiddle={(data) => createRiddle(data)} action={"add"}></RiddleForm>;
}
