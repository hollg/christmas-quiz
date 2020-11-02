import React from "react";
import Card from "./card";
import ActiveRound from "./active-round";

import styles from "./App.module.scss";

import useQuiz from "./useQuiz";
import WheelOfFortune from "./wheel-of-fortune";

function App() {
  const [{ teams, categories, activeCategoryId }, dispatch] = useQuiz();

  const activeRound = categories[activeCategoryId];

  const incrementQuestion = (categoryId) =>
    dispatch({ type: "incrementQuestionNumber", categoryId });

  const decrementQuestion = (categoryId) =>
    dispatch({ type: "decrementQuestionNumber", categoryId });

  const revealQuestion = (categoryId, questionIndex) =>
    dispatch({ type: "revealAnswer", categoryId, questionIndex });

  const revealCategory = (categoryId) =>
    dispatch({ type: "revealCategory", categoryId });

  return (
    <main>
      <h1 className={styles.title}> Never Gonna Quiz You Up </h1>
      {Object.entries(teams).map(([id, team]) => (
        <div key={team.name}>
          <h2>
            {team.name}: {team.score}
            <button
              onClick={() => dispatch({ type: "incrementScore", teamId: id })}
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: "decrementScore", teamId: id })}
            >
              -
            </button>
          </h2>
        </div>
      ))}

      <ActiveRound
        round={activeRound}
        key={activeRound?.name}
        incrementQuestion={() => incrementQuestion(activeCategoryId)}
        decrementQuestion={() => decrementQuestion(activeCategoryId)}
        revealQuestion={(questionIndex) =>
          revealQuestion(activeCategoryId, questionIndex)
        }
      />
      <h2>Categories:</h2>
      <div className={styles.grid}>
        {Object.entries(categories).map(([id, category]) => (
          <Card
            name={category.name}
            number={id}
            key={category.name}
            shouldShowName={category.isRevealed}
            showName={() => revealCategory(id)}
            begin={() =>
              dispatch({ type: "setActiveCategoryId", categoryId: id })
            }
          />
        ))}
      </div>

      <WheelOfFortune />
      <button
        onClick={() => dispatch({ type: "reset" })}
        className={styles.reset_button}
      >
        Reset quiz
      </button>
    </main>
  );
}

export default App;
