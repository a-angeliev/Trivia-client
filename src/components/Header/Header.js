import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Header.module.css";

import { AuthContext } from "../../context/authContext";

const Header = () => {
    const { user, isAdmin } = useContext(AuthContext);
    
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
                        <Link  
                        className={style.navLink  } to="/">
                            About
                        </Link>
                    </li>
                    <li >
                        <Link className={style.navLink } to="/riddles">
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
                            {isAdmin ? (
                                <li>
                                    <Link
                                        className={style.navLink}
                                        to="/admin-panel"
                                    >
                                        Admin Panel
                                    </Link>
                                </li>
                            ) : null}
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
