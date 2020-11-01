import { useReducer } from "react";

import categories from "./categories.json";

const saveState = (state) =>
  localStorage.setItem("quiz_state", JSON.stringify(state));
const loadState = () => JSON.parse(localStorage.getItem("quiz_state"));

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "incrementScore": {
      const { teamId } = action;
      const team = state.teams[teamId];
      const newState = {
        ...state,
        teams: {
          ...state.teams,
          [teamId]: { ...team, score: team.score + 1 },
        },
      };
      saveState(newState);
      return newState;
    }
    case "decrementScore": {
      const { teamId } = action;
      const team = state.teams[teamId];
      const newState = {
        ...state,
        teams: {
          ...state.teams,
          [teamId]: { ...team, score: team.score - 1 },
        },
      };
      saveState(newState);
      return newState;
    }
    case "incrementQuestionNumber": {
      const { categoryId } = action;
      const category = state.categories[categoryId];
      const newState = {
        ...state,
        categories: {
          ...state.categories,
          [categoryId]: {
            ...category,
            currentQuestionIndex: category.currentQuestionIndex + 1,
          },
        },
      };

      saveState(newState);
      return newState;
    }
    case "decrementQuestionNumber": {
      const { categoryId } = action;
      const category = state.categories[categoryId];
      const newState = {
        ...state,
        categories: {
          ...state.categories,
          [categoryId]: {
            ...category,
            currentQuestionIndex: category.currentQuestionIndex - 1,
          },
        },
      };

      saveState(newState);
      return newState;
    }
    case "setActiveCategoryId": {
      const { categoryId } = action;
      const newState = {
        ...state,
        activeCategoryId: categoryId,
      };
      saveState(newState);
      return newState;
    }
    case "revealAnswer": {
      const { categoryId, questionIndex } = action;
      const category = state.categories[categoryId];
      const question = category.questions[questionIndex];

      const newState = {
        ...state,
        categories: {
          ...state.categories,
          [categoryId]: {
            ...category,
            questions: {
              ...category.questions,
              [questionIndex]: { ...question, isRevealed: true },
            },
          },
        },
      };

      saveState(newState);
      return newState;
    }

    case "reset": {
      saveState(initialState);
      return initialState;
    }
    default:
      throw new Error("Invalid action type");
  }
};

const initialState = {
  teams: {
    1: {
      name: "Mum & Dad",
      score: 0,
    },
    2: {
      name: "Jenni & Jordan",
      score: 0,
    },
  },
  categories,
  activeCategoryIndex: null,
};

const useQuiz = () => useReducer(reducer, loadState() || initialState);

export default useQuiz;
