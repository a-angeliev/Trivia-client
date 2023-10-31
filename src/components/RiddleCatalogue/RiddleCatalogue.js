import { useContext } from "react";

import { RiddleContext } from "../../context/riddleContext";
import RiddleItem from "./RiddleItem/RiddleItem";

import style from "./RiddleCatalogue.module.css";

export default function RiddleCatalogue() {
    const { riddles } = useContext(RiddleContext);

    return (
        <section className={style.catalogueWrapper}>
            <section className={style.catalogue}>
                {riddles.map((x) => console.log(x))}
                {riddles.map((x, i) => (
                    <RiddleItem key={x.id} riddle={x} id={i + 1} />
                ))}
            </section>
        </section>
    );
}
