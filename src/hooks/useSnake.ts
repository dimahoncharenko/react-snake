import { useReducer, useMemo, useCallback } from "react";

// Util functions
import { createSnake } from "../gameUtils";

export const ACTIONS = {
  GROW_SNAKE: "GROW_SNAKE",
  MOVE_SNAKE: "MOVE_SNAKE",
  RESET_SNAKE: "RESET_SNAKE",
} as const;

export const initialState = createSnake();

type Action =
  | {
      type: typeof ACTIONS["GROW_SNAKE"];
      payload: number[];
    }
  | {
      type: typeof ACTIONS["MOVE_SNAKE"];
      payload: number[];
    }
  | {
      type: typeof ACTIONS["RESET_SNAKE"];
    };

export type Reducer = (
  state: typeof initialState,
  action: Action
) => typeof initialState;

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS["RESET_SNAKE"]:
      return createSnake();
    case ACTIONS["MOVE_SNAKE"]:
      return [
        ...state.slice(1),
        [
          state[state.length - 1][0] + action.payload[0],
          state[state.length - 1][1] + action.payload[1],
        ],
      ];
    case ACTIONS["GROW_SNAKE"]:
      return [
        ...state,
        [
          state[state.length - 1][0] + action.payload[0],
          state[state.length - 1][1] + action.payload[1],
        ],
      ];
    default:
      return state;
  }
};

export const useSnake = (reducer = defaultReducer) => {
  const [snake, dispatch] = useReducer(reducer, initialState);

  const memoizedSnake = useMemo(() => snake, [snake]);

  const moveSnake = (dir: number[]) =>
    dispatch({ type: ACTIONS["MOVE_SNAKE"], payload: dir });

  const growSnake = useCallback(
    (dir: number[]) => dispatch({ type: ACTIONS["GROW_SNAKE"], payload: dir }),
    []
  );

  const resetSnake = () => dispatch({ type: ACTIONS["RESET_SNAKE"] });

  return {
    snake: memoizedSnake,
    moveSnake,
    growSnake,
    resetSnake,
  };
};
