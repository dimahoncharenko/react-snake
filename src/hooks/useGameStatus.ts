import { useCallback, useReducer } from "react";

export const ACTIONS = {
  SET_GAME_OVER: "SET_GAME_OVER",
  RESET_GAME: "RESET_GAME",
  ADD_SCORE: "ADD_SCORE",
  INCREASE_LEVEL: "INCREASE_LEVEL",
} as const;

export type State = {
  isGameOver: boolean;
  score: number;
  level: number;
};

export const initialState = (): State => ({
  isGameOver: true,
  score: 0,
  level: 1,
});

type Action = {
  type: keyof typeof ACTIONS;
};

export type Reducer = (state: State, action: Action) => State;

const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS["SET_GAME_OVER"]:
      return {
        ...state,
        isGameOver: true,
      };
    case ACTIONS["RESET_GAME"]:
      return {
        ...initialState(),
        isGameOver: false,
      };
    case ACTIONS["ADD_SCORE"]:
      return {
        ...state,
        score: state.score + 100,
      };
    case ACTIONS["INCREASE_LEVEL"]:
      return {
        ...state,
        level: state.level + 1,
      };
    default:
      return state;
  }
};

export const useGameStatus = (reducer = defaultReducer) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const { isGameOver, level, score } = state;

  const setGameOver = useCallback(
    () => dispatch({ type: ACTIONS["SET_GAME_OVER"] }),
    []
  );

  const resetGame = () => dispatch({ type: ACTIONS["RESET_GAME"] });

  const increaseLevel = () => dispatch({ type: ACTIONS["INCREASE_LEVEL"] });

  const addScore = () => dispatch({ type: ACTIONS["ADD_SCORE"] });

  return {
    isGameOver,
    level,
    score,
    setGameOver,
    resetGame,
    addScore,
    increaseLevel,
  };
};
