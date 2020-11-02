import React from "react";
import styles from "./ActiveRound.module.scss";

const ActiveRound = ({
  round,
  incrementQuestion,
  decrementQuestion,
  revealQuestion,
}) => {
  const incrementQuestionNumber = () => {
    incrementQuestion();
  };

  if (!round)
    return (
      <div className={styles.activeRound}>
        <h1> Pick a round to begin ... </h1>
      </div>
    );

  const { currentQuestionIndex } = round;
  const question = round.questions[currentQuestionIndex];

  return (
    <div className={styles.activeRound}>
      <h1>
        {round.name}: Question {currentQuestionIndex + 1}
      </h1>
      <p>{question.question}</p>
      {question.hasImage && (
        <img
          src={`${process.env.PUBLIC_URL}/img/${round.name}/${currentQuestionIndex}.png`}
          alt=""
          style={{ height: "300px", width: "300px" }}
        />
      )}
      <p>
        <strong>Answer: {question.isRevealed ? question.answer : "???"}</strong>
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
  );
};

export default ActiveRound;
