import style from './RiddleItem.module.css'

export default function RiddleItem(){
    return(
        <span className={style.riddleItemWrapper}>
            <span className={style.riddleItem}>
                <span>
                    {/* <h1>somome</h1> */}
                    <img className={style.img} src={"./ideas.png"} alt="img" />
                </span>

                <span>
                                        
                </span>
            </span>
        </span>
    )
}