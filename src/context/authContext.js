import { createContext} from "react";
import {useLocalStorage} from './../hooks/useLocalStorage'

export const AuthContext = createContext();

export const AuthProvider  = ({children,}) =>{
    const [auth, setAuth] = useLocalStorage("auth", {})
    const userLogin = (authData) => setAuth(authData)

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
        }}>
            {children}
        </AuthContext.Provider>  
    );

}

export const useAuthContext = () =>{
    let context 
}