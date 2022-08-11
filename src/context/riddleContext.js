import { createContext, useState, useEffect, useReducer } from "react";
import * as riddleService from "./../service/riddleService";

export const RiddleContext = createContext();

const riddleReducer = (state, action) => {
    switch (action.type) {
        case "ADD_GAMES":
            return action.payload.map((x) => x);
        default:
            return state;
    }
};

export const RiddleProvider = ({ children }) => {
    const [riddles, dispatch] = useReducer(riddleReducer, []);
    const [currentRiddleId, setCurrentRiddleId] = useState("");

    useEffect(() => {
        riddleService.getAll().then((result) => {
            const action = {
                type: "ADD_GAMES",
                payload: result,
            };
            dispatch(action);
        });
    }, []);

    return (
        <RiddleContext.Provider
            value={{ riddles, currentRiddleId, setCurrentRiddleId }}
        >
            {children}
        </RiddleContext.Provider>
    );
};
