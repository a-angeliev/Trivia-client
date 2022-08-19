import { createContext, useEffect, useReducer } from "react";
import * as requester from '../service/requester'


export const TransactionsContext = createContext()

const transactionsReducer = (state, action) => {
    switch (action.type){
        case "ADD_TRANSACTIONS":
            return action.payload.map((x)=> x)
        default:
            return state
    }
}

export const TransactionsProvider = ({children}) => {
    const [transactions, dispatch] = useReducer(transactionsReducer, []);

    // useEffect(()=>{
    //     requester.get()
    // }, [])

}