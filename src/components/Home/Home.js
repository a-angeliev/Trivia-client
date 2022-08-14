import style from "./Home.module.css";
export default function Home() {
    return (
        <>
            <section className={style.homeBg}>
                <section className={style.titleSection}>
                    <p className={style.titleP}>Join today with</p>
                    <h1 className={style.titleH1}>TRIVIA</h1>
                    <button className={style.titleBtn}>Let Start</button>
                </section>
            </section>
            <section className={style.secoundHome}>
                <section className={style.sectionImg}>
                    <img src={'../../../homepage-img.jpg'} alt="img" />
                </section>
                <section className={style.sectionDesc}>
                    <h2>Why to choose us?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Omnis exercitationem, sequi dolores repellat ad, facilis
                        nihil aliquam modi aliquid quaerat perspiciatis
                        doloribus explicabo aut.
                    </p>
                    <button className={style.titleBtnBlack}>Let Start</button>
                </section>
            </section>
        </>
    );
}
