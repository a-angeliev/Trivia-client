import { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

import { AuthContext } from "../../context/authContext";

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <nav className={style.navigation}>
                <div className={style.logo}>
                    <Link className={style.navLink} to="/">
                        LOGO
                    </Link>
                </div>

                <ul>
                    <li>
                        <Link className={style.navLink} to="/">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className={style.navLink} to="/riddles">
                            Riddles
                        </Link>
                    </li>
                    {!user.token ? (
                        <>
                            <li>
                                <Link className={style.navLink} to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link className={style.navLink} to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className={style.navLink} to="/">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className={style.navLink} to="/logout">
                                    Logout
                                </Link>
                            </li>
                        </>
                    )}    
                </ul>
            </nav>
        </header>
    );
};

export default Header;
