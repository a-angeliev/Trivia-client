import style from "./Register.module.css";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import * as AuthService from './../../service/authService'
import { AuthContext } from "../../context/authContext";
export default function Register() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [password1, setPassword1] = useState("");

    const { userLogin } = useContext(AuthContext);
    let navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        if(password===password1){
            AuthService.register(email, password).then(authData=>{
                if(authData.token){
                    userLogin(authData)
                    navigate('/')
                }else{
                    alert(JSON.stringify(authData['message']));
                    
                }
            }).catch((err) => {
                console.log(err);
                navigate('/');
            });

        }else{
            alert("You need to fill same passowrds!")
            setPassword('')
            setPassword1('')
        }
    };

    return (
        <section className={style.loginSection}>
            <form onSubmit={onSubmit} className={style.loginForm}>
                <label className={style.loginLables} htmlFor="email">
                    Email
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={style.loginInputs}
                    id="email"
                    placeholder="Ivan@gmail.com"
                    name="email"
                ></input>

                <label className={style.loginLables} htmlFor="password">
                    Password
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={style.loginInputs}
                    id="password"
                    placeholder="***********"
                    name="password"
                    type="password"
                ></input>

                <label className={style.loginLables} htmlFor="password1">
                    Password
                </label>
                <input
                value={password1}
                onChange={(e)=> setPassword1(e.target.value)}
                    className={style.loginInputs}
                    id="password1"
                    placeholder="***********"
                    name="password1"
                    type="password"
                ></input>

                <button className={style.logBtn}>Register</button>
            </form>
        </section>
    );
}
