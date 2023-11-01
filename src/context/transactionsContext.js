import { createContext, useContext, useEffect, useReducer } from "react";

import { AuthContext } from "./authContext";
import * as transactionService from "../service/transactionService";

export const TransactionsContext = createContext();

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TRANSACTIONS":
            return action.payload.map((x) => x);
        default:
            return state;
    }
};

export const TransactionsProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(transactionsReducer, []);

    const { isAdmin } = useContext(AuthContext);

    useEffect(() => {
        if (isAdmin) {
            transactionService.getTransactions().then((res) => {
                const action = {
                    type: "ADD_TRANSACTIONS",
                    payload: res,
                };
                dispatch(action);
            });
        }
    }, []);

    return <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>;
};
