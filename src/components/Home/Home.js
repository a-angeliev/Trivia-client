import { useNavigate } from "react-router-dom";

import style from "./Home.module.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <section className={style.homeBg}>
                <section className={style.titleSection}>
                    <p className={style.titleP}>Join today with</p>
                    <img className={style.logoYellow} src='./logo-yellow.svg' alt='yellow logo'></img>

                    <button className={style.btn} onClick={() => navigate("/riddles")}>
                        Let's start
                    </button>
                </section>
                <section className={style.homeImgSection}>
                    <img className={style.homeImg} src='./home-asset-1.svg' alt='home asset'></img>
                </section>
            </section>
            <section className={style.secondHome}>
                <section className={style.sectionImg}>
                    <img src={"./home-asset-2.svg"} alt='home asset 2' />
                </section>
                <section className={style.sectionDesc}>
                    <h2 className={style.secondTitle}>Why to choose us?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.
                    </p>
                    <button className={style.btn} onClick={() => navigate("/riddles")}>
                        Let's start
                    </button>
                </section>
            </section>
        </>
    );
}
