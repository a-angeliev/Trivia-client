import style from "./RiddleItem.module.css";
import { Link } from 'react-router-dom'

export default function RiddleItem() {
    return (
        <span className={style.riddleItemWrapper}>
            <span className={style.riddleItem}>
                <span className={style.imgSpan}>
                    {/* <h1>somome</h1> */}
                    <img className={style.img} src={"./ideas.png"} alt="img" />
                </span>
                <span className={style.devider}></span>
                <span className={style.desc}>
                    <h2>Some long title</h2>
                    <p>This is some description about this quiz</p>
                </span>
                <span className={style.devider}></span>
                <span className={style.score}>
                    <img className={style.scoreImg} src={"./speedometer.png"} alt="img" />
                    <p>100</p>
                </span>
                <span className={style.devider}></span>
                <span className={style.playSpan}>
                    <Link to="/">
                        <img className={style.playBtn} src={'./video-play.png'} alt="play btn" />
                    </Link>
                </span>
            </span>
        </span>
    );
}
