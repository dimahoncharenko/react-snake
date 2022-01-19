import { useReducer, useMemo, useCallback } from "react";

export const ACTIONS = {
  CHANGE_POS: "CHANGE_POS",
} as const;

export const initialState = [15, 15];

type Action = {
  type: typeof ACTIONS["CHANGE_POS"];
  payload: number[];
};

export type Reducer = (
  state: typeof initialState,
  action: Action
) => typeof initialState;

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS["CHANGE_POS"]:
      return action.payload;
    default:
      return state;
  }
};

export const useFruit = (reducer = defaultReducer) => {
  const [fruit, dispatch] = useReducer(reducer, initialState);
  const memoizedFruit = useMemo(() => fruit, [fruit]);

  const changePos = useCallback(
    (pos: number[]) => dispatch({ type: ACTIONS["CHANGE_POS"], payload: pos }),
    []
  );

  return {
    fruit: memoizedFruit,
    changePos,
  };
};
