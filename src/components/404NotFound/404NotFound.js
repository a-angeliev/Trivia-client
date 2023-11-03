import style from "./404NotFound.module.css";

export const NotFount = () => {
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>404 Not Found</h1>
            <p className={style.text}>
                Looks like this page is playing hide and seek with us! We're also on the hunt for it. If you happen to
                stumble upon it, please give us a call. Maybe we can throw it a surprise party and convince it to come
                back! In the meantime, feel free to explore our other pages and see if you can find some hidden gems.
            </p>
            <img className={style.asset} src='/images/404.svg' alt='404'></img>
        </div>
    );
};
