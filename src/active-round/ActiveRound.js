import React from "react";
import styles from "./ActiveRound.module.scss";

const ActiveRound = ({
  round,
  begin,
  incrementQuestion,
  decrementQuestion,
  revealQuestion,
}) => {
  const incrementQuestionNumber = () => {
    incrementQuestion();
  };

  if (!round)
    return (
      <div className={styles.active_round_wrapper}>
        <div className={styles.activeRound}>
          <h1> Pick a round to begin ... </h1>
        </div>
      </div>
    );

  const { currentQuestionIndex } = round;
  const question = round.questions[currentQuestionIndex];

  const imageSrc = question.isRevealed
    ? `${process.env.PUBLIC_URL}/img/${round.name}/${currentQuestionIndex}-answer.jpg`
    : `${process.env.PUBLIC_URL}/img/${round.name}/${currentQuestionIndex}.jpg`;

  console.log("has started:", round.hasStarted);

  return !round.hasStarted ? (
    <div className={styles.active_round_wrapper}>
      <div className={styles.activeRound}>
        <h2>{round.name}</h2>
        <button onClick={begin}>Begin</button>
      </div>
    </div>
  ) : (
    <div className={styles.active_round_wrapper}>
      <div className={styles.activeRound}>
        <h2>
          {round.name}: Question {currentQuestionIndex + 1}
        </h2>
        <p className={styles.question}>{question.question}</p>
        {question.hasImage && (
          <img src={imageSrc} alt="" style={{ maxWidth: "300px" }} />
        )}
        <p className={styles.answer}>
          <strong>
            Answer: {question.isRevealed ? question.answer : "???"}
          </strong>
        </p>

        <button
          onClick={() => revealQuestion(currentQuestionIndex)}
          disabled={question.isRevealed}
        >
          Reveal answer
        </button>
        <button
          onClick={() => decrementQuestion()}
          disabled={currentQuestionIndex === 0}
        >
          Previous question
        </button>
        <button
          onClick={() => incrementQuestionNumber()}
          disabled={currentQuestionIndex === 4}
        >
          Next question
        </button>
      </div>
    </div>
  );
};

export default ActiveRound;
