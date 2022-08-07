import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { AuthContext } from "../../context/authContext";
import * as authService from "./../../service/authService";

export default function Login() {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        let {email, password} = Object.fromEntries(new FormData(e.target))
        authService.login(email , password).then(authData=> {
            console.log(authData);
            if(authData.token){
                userLogin(authData);
                navigate('/');
            }else{
                alert(JSON.stringify(authData['message']));
            }
            
        }).catch((err) => {
            console.log(err);
            navigate('/');
        });
        // // userLogin(response)
        // console.log(authService.login(email,password))

    };
    return (
        <section className={style.loginSection}>
            <form onSubmit={onSubmit} className={style.loginForm}>
                <label className={style.loginLables} htmlFor="email">
                    Email
                </label>
                <input
                    className={style.loginInputs}
                    id="email"
                    placeholder="Ivan@gmail.com"
                    name="email"
                ></input>

                <label className={style.loginLables} htmlFor="password">
                    Password
                </label>
                <input
                    className={style.loginInputs}
                    id="password"
                    placeholder="***********"
                    name="password"
                    type="password"
                ></input>

                {/* <button>Login</button> */}
                <button className={style.logBtn}>Login</button>
                {/* <button class="reg">Sign up</button> */}
                <p>
                    If you dont have register <a>click here</a>{" "}
                </p>
            </form>
        </section>
    );
}
