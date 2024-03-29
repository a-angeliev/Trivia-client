import { useNavigate } from "react-router-dom";

import style from "./Home.module.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <section className={style.homeBg}>
                <section className={style.titleSection}>
                    <p className={style.titleP}>Join today with</p>
                    <img className={style.logoYellow} src='/images/logo-yellow.svg' alt='yellow logo'></img>

                    <button className={`${style.desktop} ${style.btn}`} onClick={() => navigate("/riddles")}>
                        Let's start
                    </button>
                </section>
                <section className={style.homeImgSection}>
                    <img className={style.homeImg} src='/images/home-asset-1.svg' alt='home asset'></img>
                </section>

                <button className={`${style.mobile} ${style.btn}`} onClick={() => navigate("/riddles")}>
                    Let's start
                </button>
            </section>
            <section className={style.secondHome}>
                <section className={`${style.desktop} ${style.sectionImg}`}>
                    <img src={"/images/home-asset-2.svg"} alt='home asset 2' />
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
                    <section className={`${style.mobile} ${style.sectionImg}`}>
                        <img src={"/images/home-asset-2-mobile.svg"} alt='home asset 2' />
                    </section>
                    <button className={`${style.mobileBtn} ${style.btn}`} onClick={() => navigate("/riddles")}>
                        Let's start
                    </button>
                </section>
            </section>
        </>
    );
}
