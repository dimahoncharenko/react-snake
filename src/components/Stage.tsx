import { KeyboardEvent, useEffect, useState } from "react";

import Cell from "./Cell";
import { StyledStage, StageWrapper } from "../styles/StageWrapper";
import {
  CellType,
  createStage,
  checkAvailableCell,
  tuple,
  generateFood,
  checkCollision,
  createSnake,
} from "../gameHelpers";

export type Snake = [number, number][];
export type Direction = [number, number];
export type Food = [number, number];
export type Board = [number, CellType][][];

type Directions = {
  [P in "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"]: [number, number];
};

const directions: Directions = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

const Stage = () => {
  const [stageState, setStage] = useState<Board>(createStage());
  const [snake, setSnake] = useState<Snake>(createSnake());
  const [direction, setDirection] = useState<Direction>([1, 0]);
  const [food, setFood] = useState<Food>([5, 5]);
  const [isGameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [snakeSpeed, setSnakeSpeed] = useState(1000);
  const [scores, setScores] = useState(0);

  const changeDirection = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (isGameOver) return;
    switch (key) {
      case "ArrowUp":
        if (
          direction[0] === directions["ArrowDown"][0] &&
          direction[1] === directions["ArrowDown"][1]
        ) {
          break;
        }
        setDirection(directions[key]);
        break;
      case "ArrowDown":
        if (
          direction[0] === directions["ArrowUp"][0] &&
          direction[1] === directions["ArrowUp"][1]
        ) {
          break;
        }
        setDirection(directions[key]);
        break;
      case "ArrowLeft":
        if (
          direction[0] === directions["ArrowRight"][0] &&
          direction[1] === directions["ArrowRight"][1]
        ) {
          break;
        }
        setDirection(directions[key]);
        break;
      case "ArrowRight":
        if (
          direction[0] === directions["ArrowLeft"][0] &&
          direction[1] === directions["ArrowLeft"][1]
        ) {
          break;
        }
        setDirection(directions[key]);
        break;
    }
  };

  useEffect(() => {
    if (isGameOver) return;
    const timerId = setInterval(() => {
      const updateSnake = (prev: Snake) => {
        let newSnake = Array.from(prev);

        const head: [number, number] = [
          ...checkAvailableCell(newSnake[newSnake.length - 1], direction),
        ];

        newSnake.push(head);
        if (head[0] === food[0] && head[1] === food[1]) {
          setFood(generateFood(snake));
          setScores((prev) => prev + 1);
          if ((scores + 1) % 10 === 0) {
            setLevel((prev) => prev + 1);
            setSnakeSpeed((prev) => Math.max(prev - 150, 200));
          }
          return newSnake;
        }

        newSnake.shift();

        return newSnake;
      };

      setSnake(updateSnake);
    }, snakeSpeed);

    return () => clearInterval(timerId);
  }, [direction, food, isGameOver, setSnakeSpeed, snakeSpeed, snake, scores]);

  useEffect(() => {
    const updateStage = (prev: Board) => {
      let newStage: Board = Array.from(prev).map((row) =>
        row.map((cell) =>
          cell[1] === "snake" || cell[1] === "head" ? tuple(0, "empty") : cell
        )
      );

      for (let y = 0; y < newStage.length; y++) {
        for (let x = 0; x < newStage[y].length; x++) {
          const snakeIndex = snake.findIndex(
            (cell) => cell[0] === y && cell[1] === x
          );

          if (food[0] === y && food[1] === x) {
            newStage[food[0]][food[1]] = [0, "food"];
          }

          if (snakeIndex > -1) {
            newStage[snake[snakeIndex][0]][snake[snakeIndex][1]] = [0, "snake"];
          }

          newStage[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = [
            0,
            "head",
          ];
        }
      }

      if (checkCollision(snake)) {
        setGameOver(true);
      }

      return newStage;
    };

    setStage(updateStage);
  }, [snake, food]);

  const startGame = () => {
    setGameOver(false);
    setSnakeSpeed(1000);
    setLevel(1);
    setScores(0);
    setSnake(createSnake());
    setDirection([1, 0]);
  };

  return (
    <StageWrapper role="button" tabIndex={0} onKeyDown={changeDirection}>
      <StyledStage>
        {stageState.map((row, y) => (
          <div className="row" key={y}>
            {row.map((cell, x) => {
              return <Cell type={cell[1]} key={x} />;
            })}
          </div>
        ))}
        <div className="stats">
          <p>Level: {level}</p>
          {isGameOver && (
            <p>
              Game Over!
              <button onClick={startGame}>Start again?</button>
            </p>
          )}
          <p>Scores: {scores}</p>
        </div>
      </StyledStage>
    </StageWrapper>
  );
};

export default Stage;
