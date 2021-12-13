import { Snake, Direction, Food } from "./components/Stage";

export type CellType = "empty" | "snake" | "food" | "head";

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 10;

export const tuple = <T extends unknown[]>(...args: T): T => {
  return args;
};

export const createSnake = (): Snake => [
  [1, 1],
  [2, 1],
  [3, 1],
];

export const createStage = (): [number, CellType][][] =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array(STAGE_WIDTH).fill(tuple(0, "clear"))
  );

export const checkAvailableCell = (
  s: Snake[number],
  dir: Direction
): [number, number] => {
  let y = s[0] + dir[0];
  let x = s[1] + dir[1];

  if (y > STAGE_HEIGHT - 1) {
    y = 0;
  } else if (y < 0) {
    y = STAGE_HEIGHT;
  } else if (x < 0) {
    x = STAGE_WIDTH - 1;
  } else if (x > STAGE_WIDTH - 1) {
    x = 0;
  }

  return [y, x];
};

export const checkCollision = (snake: Snake) => {
  const head = snake[snake.length - 1];
  const body = snake.slice(0, snake.length - 1);

  for (let cell = 0; cell < body.length; cell++) {
    if (body[cell][0] === head[0] && body[cell][1] === head[1]) {
      return true;
    }
  }

  return false;
};

export const generateFood = (snake: Snake): Food => {
  let newFoodPos: Food = [
    Math.floor(Math.random() * STAGE_HEIGHT),
    Math.floor(Math.random() * STAGE_WIDTH),
  ];

  while (
    snake.some((cell) => cell[0] === newFoodPos[0] && cell[1] === newFoodPos[1])
  ) {
    newFoodPos = [
      Math.floor(Math.random() * STAGE_HEIGHT),
      Math.floor(Math.random() * STAGE_WIDTH),
    ];
  }

  return newFoodPos;
};
