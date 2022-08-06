import style from './RiddleCatalogue.module.css'
import RiddleItem from './RiddleItem/RiddleItem'

export default function RiddleCatalogue() {
    return(
        <span className={style.catalogueWrapper}>
            <span className={style.catalogue}>
                <RiddleItem/>
                <RiddleItem/>
                <RiddleItem/>
                <RiddleItem/>
            </span>
        </span>
    )
}
