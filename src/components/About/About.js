import style from "./About.module.css";

export default function About() {
    return (
        <section className={style.about}>
            <section className={style.cardSection}>
                <section className={style.card}>
                    <h2>Who are we?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.
                    </p>
                </section>

                <section className={style.card}>
                    <h2>What do we want?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.
                    </p>
                </section>

                <section className={style.card}>
                    <h2>How it works?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.
                    </p>
                </section>
            </section>
            <section className={style.lastSection}>
                <h2>{"Say hi! :)"}</h2>
                <p>center@trivia.com</p>
                <p>+359 877 877 877</p>
            </section>
        </section>
    );
}
