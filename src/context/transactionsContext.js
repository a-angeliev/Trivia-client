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


    useEffect(()=>{
        requester.get("http://127.0.0.1:5000/transaction").then(res =>{
            const action = {
                type: "ADD_TRANSACTIONS",
                payload: res,
            }
            dispatch(action)
            // console.log(res,123);
        })
    }, [])

    return (
        <TransactionsContext.Provider  value = {{transactions}}>
            { children }
        </TransactionsContext.Provider>
    )

}