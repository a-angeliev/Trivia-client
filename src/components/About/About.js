import style from "./About.module.css";

export default function About() {
    return (
        <section className={style.about}>
            <section className={style.cardSection}>
                <seciton className={style.card}>
                    <img className={style.aboutImg} src={"../../../1.png"} alt="" />
                    <h2>Who are we?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis assumenda minus vel laborum possimus.
                        
                    </p>
                </seciton>

                <seciton className={style.card}>
                    <img className={style.aboutImg} src={"../../../2.png"} alt="" />
                    <h2>What do we want?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis assumenda minus vel laborum possimus.
                        
                    </p>
                </seciton>

                <seciton className={style.card}>
                    <img className={style.aboutImg} src={"../../../3.png"} alt="" />
                    <h2>How it works?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis assumenda minus vel laborum possimus.
                        
                    </p>
                </seciton>
            </section>
            <section className={style.lastSection}>
                <h2>Say hi!</h2>
                <p>center@trivia.com</p>
                <p>+359 877 8777</p>
            </section>
        </section>
    );
}
