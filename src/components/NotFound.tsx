// pages/404.js
import React from "react";
import styles from "../styles/NotFound.module.css"; // Optional: for styling

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  callback: () => void;
}
const NotFound = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button className={styles.button} onClick={props.callback}>
        {props.buttonTitle}
      </button>
    </div>
  );
};

export default NotFound;
