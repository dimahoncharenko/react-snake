export type CellType = "empty" | "snake_body" | "snake_head" | "fruit";

export const STAGE_SIZE = 30;

export const createStage = () =>
  Array.from<CellType[]>(
    Array(STAGE_SIZE).fill(Array(STAGE_SIZE).fill("empty"))
  );

export const createSnake = () => [
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
];
