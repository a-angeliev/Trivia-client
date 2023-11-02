import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../../context/authContext";
import * as AuthService from "./../../service/authService";

import style from "./Register.module.css";

export default function Register() {
    const { userLogin } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (password === password1 && email !== "") {
            AuthService.register(email, password)
                .then((authData) => {
                    if (authData.token) {
                        userLogin(authData);
                        navigate("/");
                    } else {
                        alert(JSON.stringify(authData["message"]));
                    }
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                    navigate("/");
                });
        } else {
            alert("You need to enter the same password and provide your email address.");
            setPassword("");
            setPassword1("");
        }
    };

    return (
        <section className={style.registerSection}>
            <form onSubmit={onSubmit} className={style.registerForm}>
                <h1 className={style.registrationTitle}>Sign up</h1>
                <div className={style.inputDiv}>
                    <label className={style.label} htmlFor='email'>
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.input}
                        id='email'
                        placeholder='Ivan@gmail.com'
                        name='email'></input>
                </div>

                <div className={style.inputDiv}>
                    <label className={style.label} htmlFor='password'>
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                        id='password'
                        placeholder='***********'
                        name='password'
                        type='password'></input>
                </div>

                <div className={style.inputDiv}>
                    <label className={style.label} htmlFor='password1'>
                        Password
                    </label>
                    <input
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        className={style.input}
                        id='password1'
                        placeholder='***********'
                        name='password1'
                        type='password'></input>
                </div>

                <button className={style.btn}>Register</button>
                <p className={style.loginText}>
                    If you have a registration, login{" "}
                    <a className={style.loginLink} href='/login'>
                        {" "}
                        here
                    </a>{" "}
                </p>
            </form>
        </section>
    );
}
