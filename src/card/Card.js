import React, { useState } from "react";

import styles from "./Card.module.scss";

const Card = ({ name, number, begin }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div key={name} className={styles.card}>
      <h1>{number}</h1>
      <p>{isRevealed ? name : "?????"}</p>
      <button
        onClick={() => {
          setIsRevealed(true);
          begin();
        }}
      >
        Start round
      </button>
    </div>
  );
};

export default Card;
