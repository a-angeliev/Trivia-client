import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import style from "./Header.module.css";

const Header = () => {
    const { user, isAdmin } = useContext(AuthContext);

    return (
        <header>
            <nav className={style.navigation}>
                <div className={style.logo}>
                    <Link className={style.navLink} to='/'>
                        <img className={style.logoSvg} src='/logo.svg' alt='LOGO' />
                    </Link>
                </div>

                <ul className={style.ulNav}>
                    <li className={style.liNav}>
                        <Link className={style.navLink} to='/about'>
                            about
                        </Link>
                    </li>

                    <li className={style.liNav}>
                        <Link className={style.navLink} to='/riddles'>
                            riddles
                        </Link>
                    </li>
                    {!user.token ? (
                        <>
                            <li className={style.liNav}>
                                <Link className={style.navLink} to='/login'>
                                    login
                                </Link>
                            </li>
                            <li className={style.liNav}>
                                <Link className={style.navLink} to='/register'>
                                    register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {isAdmin ? (
                                <li className={style.liNav}>
                                    <Link className={style.navLink} to='/admin-panel'>
                                        Admin Panel
                                    </Link>
                                </li>
                            ) : null}
                            <li className={style.liNav}>
                                <Link className={style.navLink} to='/logout'>
                                    logout
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
