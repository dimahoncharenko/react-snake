import { useReducer, useEffect } from "react";

// Util functions
import { createStage, CellType } from "../gameUtils";

export const ACTIONS = {
  CLEAR_STAGE: "CLEAR_STAGE",
  CHANGE_STAGE: "CHANGE_STAGE",
} as const;

export const initialState: CellType[][] = createStage();

type ChangeStagePayload = {
  pos: number[];
  type: CellType;
};

type Action =
  | {
      type: typeof ACTIONS["CLEAR_STAGE"];
    }
  | {
      type: typeof ACTIONS["CHANGE_STAGE"];
      payload: ChangeStagePayload;
    };

export type Reducer = (
  state: typeof initialState,
  action: Action
) => typeof initialState;

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS["CLEAR_STAGE"]:
      return initialState;
    case ACTIONS["CHANGE_STAGE"]:
      return state.map((row, row_index) => {
        if (row_index === action.payload.pos[1]) {
          return row.map((cell, cell_index) =>
            cell_index === action.payload.pos[0] ? action.payload.type : cell
          );
        }
        return row;
      });
    default:
      return state;
  }
};

export const useStage = (
  snake: number[][],
  fruit: number[],
  reducer = defaultReducer
) => {
  const [stage, dispatch] = useReducer(reducer, initialState);

  const clearStage = () => dispatch({ type: ACTIONS["CLEAR_STAGE"] });
  const changeStage = ({ pos, type }: ChangeStagePayload) =>
    dispatch({
      type: ACTIONS["CHANGE_STAGE"],
      payload: { pos, type },
    });

  useEffect(() => {
    // flush the stage
    clearStage();

    // redraw the snake
    for (let i = 0; i < snake.length; i++) {
      if (i === snake.length - 1) {
        changeStage({ pos: snake[i], type: "snake_head" });
      } else {
        changeStage({ pos: snake[i], type: "snake_body" });
      }
    }

    // redraw the fruit
    changeStage({ pos: fruit, type: "fruit" });
  }, [snake, fruit]);

  return {
    stage,
  };
};
