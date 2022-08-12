import { createContext, useState, useEffect, useReducer } from "react";
import * as riddleService from "./../service/riddleService";
import { useNavigate } from "react-router-dom";

export const RiddleContext = createContext();

const riddleReducer = (state, action) => {
    switch (action.type) {
        case "ADD_RIDDLES":
            return action.payload.map((x) => x);
        case "ADD_RIDDLE":
            return [...state, action.payload];
        case "DELETE_RIDDLE":
            return state.filter((x) => x.id !== action.riddleId);
        case "EDIT_RIDDLE":
            return state.map((x)=> x.id === action.riddleId ? action.payload : x)
        default:
            return state;
    }
};

export const RiddleProvider = ({ children }) => {
    const [riddles, dispatch] = useReducer(riddleReducer, []);
    const [currentRiddleId, setCurrentRiddleId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        riddleService.getAll().then((result) => {
            const action = {
                type: "ADD_RIDDLES",
                payload: result,
            };
            dispatch(action);
        });
    }, []);

    const riddleAdd = (riddleData) => {
        dispatch({
            type: "ADD_RIDDLE",
            payload: riddleData,
        });

        navigate("/catalog");
    };

    const riddleDelete = (riddleId) => {
        dispatch({
            type: "DELETE_RIDDLE",
            riddleId: Number(riddleId),
        });
    };

    const riddleEdit = (riddleId, riddleData) => {
        dispatch({
            type: "EDIT_RIDDLE",
            payload: riddleData,
            riddleId: Number(riddleId),
        });
    };
    return (
        <RiddleContext.Provider
            value={{
                riddles,
                currentRiddleId,
                setCurrentRiddleId,
                riddleAdd,
                riddleDelete,
                riddleEdit,
            }}
        >
            {children}
        </RiddleContext.Provider>
    );
};
