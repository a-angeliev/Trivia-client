import { Link } from "react-router-dom";
import style from './Header.module.css'

const Header = () => {
  return (
    <header>
        <nav className={style.navigation}>
            <div className={style.logo}>
                <Link className={style.navLink} to="/">LOGO</Link>
            </div>
            
            <ul>
                <li>
                    <Link className={style.navLink} to="/">About</Link>
                </li>
                <li>
                    <Link className={style.navLink} to="/">Riddles</Link>
                </li>
                <li>
                    <Link className={style.navLink} to="/">Login</Link>
                </li>
                <li>
                    <Link className={style.navLink} to="/">Register</Link>
                </li>
                <li>
                    <Link className={style.navLink} to="/">Logout</Link>
                </li>
                <li>
                    <Link className={style.navLink} to="/">Profile</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;