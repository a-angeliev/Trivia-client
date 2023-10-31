import { createContext, useContext, useEffect, useReducer } from "react";

import { AuthContext } from "./authContext";
import * as requester from "../service/requester";

export const DiscountContext = createContext();

const discountsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_DISCOUNTS":
            return action.payload.map((x) => x);
        case "ADD_DISCOUNT":
            return [...state, action.payload];
        case "EDIT_DISCOUNT":
            return state.map((x) => (x.id == action.discountId ? action.payload : x));
        case "DELETE_DISCOUNT":
            return state.filter((x) => x.id !== action.discountId);
        default:
            return state;
    }
};

export const DiscountProvider = ({ children }) => {
    const [discounts, dispatch] = useReducer(discountsReducer, []);
    const { isAdmin } = useContext(AuthContext);

    useEffect(() => {
        if (isAdmin) {
            requester.get("http://127.0.0.1:5000/discounts").then((reuslt) => {
                const action = {
                    type: "ADD_DISCOUNTS",
                    payload: JSON.parse(reuslt),
                };
                dispatch(action);
            });
        }
    }, []);

    const addDiscount = (discountData) => {
        const action = {
            type: "ADD_DISCOUNT",
            payload: JSON.parse(discountData),
        };
        dispatch(action);
    };

    const editDiscount = (updatedDiscount, discountId) => {
        const action = {
            type: "EDIT_DISCOUNT",
            payload: JSON.parse(updatedDiscount),
            discountId: Number(discountId),
        };
        dispatch(action);
    };

    const deleteDiscount = (discountId) => {
        const action = {
            type: "DELETE_DISCOUNT",
            discountId: Number(discountId),
        };
        dispatch(action);
    };

    return (
        <DiscountContext.Provider value={{ discounts, addDiscount, editDiscount, deleteDiscount }}>
            {children}
        </DiscountContext.Provider>
    );
};
