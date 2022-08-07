import { useContext } from "react";
import { RiddleContext } from "../../context/riddleContext";
import style from "./RiddleCatalogue.module.css";
import RiddleItem from "./RiddleItem/RiddleItem";

export default function RiddleCatalogue() {
  const { riddles } = useContext(RiddleContext);
  return (
    <section className={style.catalogueWrapper}>
      <section className={style.catalogue}>
        {riddles.map((x) => (
          <RiddleItem key={x.id} riddle={x} />
        ))}
      </section>
    </section>
  );
}	
