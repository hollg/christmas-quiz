import React from "react";

import styles from "./Card.module.scss";

const Card = ({ name, number, shouldShowName, showName, begin }) => {
  return (
    <div key={name} className={styles.card}>
      <h2>{number}</h2>
      <p>{shouldShowName ? name : "?????"}</p>
      <button
        onClick={() => {
          showName(true);
          begin();
        }}
      >
        Start round
      </button>
    </div>
  );
};

export default Card;
