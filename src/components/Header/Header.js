import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/authContext";

import style from "./Header.module.css";

const Header = () => {
    const { user, isAdmin } = useContext(AuthContext);

    const [toggleChecked, setToggleChecked] = useState(false);

    const location = useLocation();
    useEffect(() => {
        setToggleChecked(false);
    }, [location.pathname]);

    return (
        <header>
            <nav className={style.navigation}>
                <div className={style.logo}>
                    <Link className={style.navLink} to='/'>
                        <img className={style.logoSvg} src='/images/logo.svg' alt='LOGO' />
                    </Link>
                </div>

                <div className={`${style.hamburgerMenu} ${style.mobile}`}>
                    <input
                        id='menuToggle'
                        className={style.menuToggle}
                        checked={toggleChecked}
                        onChange={() => setToggleChecked((prev) => !prev)}
                        type='checkbox'
                    />
                    <label className={`${style.menuBtn}`} htmlFor='menuToggle'>
                        <span></span>
                    </label>

                    <ul className={style.menuBox}>
                        <li>
                            <Link className={style.menuItem} to='/about'>
                                about
                            </Link>
                        </li>
                        <li>
                            <Link className={style.menuItem} to='/riddles'>
                                riddles
                            </Link>
                        </li>

                        {!user.token ? (
                            <>
                                <li>
                                    <Link className={style.menuItem} to='/login'>
                                        login
                                    </Link>
                                </li>
                                <li>
                                    <Link className={style.menuItem} to='/register'>
                                        register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {isAdmin ? (
                                    <li>
                                        <Link className={style.menuItem} to='/admin-panel'>
                                            admin panel
                                        </Link>
                                    </li>
                                ) : null}
                                <li>
                                    <Link className={style.menuItem} to='/logout'>
                                        logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <ul className={`${style.desktop} ${style.ulNav}`}>
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
                                        admin panel
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
