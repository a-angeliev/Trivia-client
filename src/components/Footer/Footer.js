import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.rightsText}>&copy; 2022 Copyright: Atanas Angeliev</p>
    </footer>
  );
  // return null
}
