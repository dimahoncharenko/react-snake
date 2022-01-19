import { useEffect, useState, useRef } from "react";

// Util functions
import { STAGE_SIZE } from "../gameUtils";

// Hooks
import { useStage } from "../hooks/useStage";
import { useSnake } from "../hooks/useSnake";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Cell from "./Cell";

// Styled
import {
  StyledStage,
  StyledGameStats,
  StyledStageContainer,
} from "../styles/StyledStage";
import { useFruit } from "../hooks/useFruit";

const Stage = () => {
  const {
    isGameOver,
    setGameOver,
    resetGame,
    addScore,
    score,
    level,
    increaseLevel,
  } = useGameStatus();
  // refs
  let counter = useRef(0);

  const { fruit, changePos } = useFruit();
  const { snake, moveSnake, growSnake, resetSnake } = useSnake();
  const { stage } = useStage(snake, fruit);

  const [direction, setDirection] = useState([0, 1]);
  const [snake_speed, setSnakeSpeed] = useState(700);

  // reset game props
  function startGame() {
    resetSnake();
    setDirection([0, 1]);
    setSnakeSpeed(700);
    resetGame();
  }

  function handleClick(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        // If direction of snake is upward
        if (direction[0] === 0 && direction[1] === -1) {
          return;
        }
        setDirection([0, 1]);
        break;
      case "ArrowUp":
        // If direction of snake is downward
        if (direction[0] === 0 && direction[1] === 1) {
          return;
        }
        setDirection([0, -1]);
        break;
      case "ArrowLeft":
        // If direction of snake is rightward
        if (direction[0] === 1 && direction[1] === 0) {
          return;
        }
        setDirection([-1, 0]);
        break;
      case "ArrowRight":
        // If direction of snake is leftward
        if (direction[0] === -1 && direction[1] === 0) {
          return;
        }
        setDirection([1, 0]);
        break;
    }
  }

  useEffect(() => {
    // handle collision of snake and walls
    const head = snake[snake.length - 1];
    const withoutHead = snake.slice(0, snake.length - 1);
    if (
      head[0] > STAGE_SIZE - 1 ||
      head[1] > STAGE_SIZE - 1 ||
      head[0] < 0 ||
      head[1] < 0 ||
      withoutHead.some((cell) => cell[0] === head[0] && cell[1] === head[1])
    ) {
      setGameOver();
    }

    // handle collision between snake and fruit
    if (snake.some((cell) => cell[0] === fruit[0] && cell[1] === fruit[1])) {
      // every tenth eaten fruit increase level
      counter.current = (counter.current + 1) % 10;
      if (counter.current === 0) {
        increaseLevel();
      }

      addScore();

      growSnake(direction);

      // Find out a new position of fruit that isn't equal position of snake
      let x: number;
      let y: number;

      do {
        x = Math.floor(Math.random() * STAGE_SIZE);
        y = Math.floor(Math.random() * STAGE_SIZE);
      } while (snake.includes([y, x]));

      changePos([y, x]);
    }
  }, [
    snake,
    setGameOver,
    fruit,
    direction,
    growSnake,
    changePos,
    increaseLevel,
    addScore,
  ]);

  // set up a keyup event listener
  useEffect(() => {
    document.addEventListener("keyup", handleClick);

    return () => document.removeEventListener("keyup", handleClick);
  });

  useInterval(() => {
    if (isGameOver) return;
    moveSnake(direction);
  }, snake_speed);

  return (
    <StyledStageContainer>
      <StyledGameStats>
        <p>Score: {score}</p>
        <button onClick={startGame}>Start Game</button>
        <p>Level: {level}</p>
      </StyledGameStats>
      <StyledStage>
        {stage.map((row) =>
          row.map((cell, index) => <Cell key={index} type={cell} />)
        )}
      </StyledStage>
    </StyledStageContainer>
  );
};

export default Stage;
