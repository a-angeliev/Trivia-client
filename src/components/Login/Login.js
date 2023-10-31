import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import * as authService from "./../../service/authService";

import style from "./login.module.css";

export default function Login() {
    const { userLogin } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.target));

        authService
            .login(email, password)
            .then((authData) => {
                if (authData.token) {
                    userLogin(authData);
                    navigate("/");
                } else {
                    alert(JSON.stringify(authData["message"]));
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    };

    return (
        <section className={style.loginSection}>
            <form onSubmit={onSubmit} className={style.loginForm}>
                <h1 className={style.loginTitle}>Sign in</h1>
                <div className={style.inputDiv}>
                    <label className={style.loginLabels} htmlFor='email'>
                        email address
                    </label>
                    <input className={style.loginInputs} id='email' placeholder='Ivan@gmail.com' name='email'></input>
                </div>
                <div className={style.inputDiv}>
                    <label className={style.loginLabels} htmlFor='password'>
                        password
                    </label>
                    <input
                        className={style.loginInputs}
                        id='password'
                        placeholder='***********'
                        name='password'
                        type='password'></input>
                </div>
                <button className={style.logBtn}>Login</button>
                <p className={style.registerText}>
                    If you don't have a registration, click{" "}
                    <a className={style.registerLink} href='/register'>
                        {" "}
                        here
                    </a>{" "}
                </p>
            </form>
            <img className={style.img} src='./login-page-asset.svg' alt='login page asset'></img>
        </section>
    );
}
