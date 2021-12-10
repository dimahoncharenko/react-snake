import { useState, useEffect, useCallback, KeyboardEvent } from "react";

import Cell from "./Cell";
import { StyledStage, StageWrapper } from "../styles/StageWrapper";

import { checkCollision, checkAvailableCell, updateFoodPos, createSnake } from "../gameHelpers";

export type Props = {
    stage: number[][]
}

const Stage = ({ stage }: Props) => {
    const [snake, setSnake] = useState<[number, number][]>([[1, 1]]);
    const [food, setFood] = useState<[number, number]>([0, 0]); 
    const [speed, setSpeed] = useState<null | number>(null);
    const [isGameOver, setGameOver] = useState(false);
    const [currentDirection, setCurrentDirection] = useState<[number, number]>([1, 0]);
    const [scores, setScores] = useState(0);

    const handleKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>) => {
        if (isGameOver) return;

        switch (key) {
            case "ArrowUp":
                changeDirection([-1, 0]);    
                break;
            case "ArrowDown":
                changeDirection([1, 0]);
                break;
            case "ArrowLeft":
                changeDirection([0, -1]);
                break;
            case "ArrowRight":
                changeDirection([0, 1]);
                break;
        }
    };

    const changeDirection = (nextStep: [number, number]) => {
        if (
            (nextStep[0] === -1 && currentDirection[0] === 1) || 
            (nextStep[0] === 1 && currentDirection[0] === -1) || 
            (nextStep[1] === 1 && currentDirection[1] === -1) || 
            (nextStep[1] === -1 && currentDirection[1] === 1)
        ) return;
        setCurrentDirection(nextStep);
    }

    const gameLoop = useCallback(() => {
        const newSnake = Array.from(snake);

        if (checkCollision(
            snake,
            [
                checkAvailableCell(newSnake[newSnake.length - 1][0] + currentDirection[0]),
                checkAvailableCell(newSnake[newSnake.length - 1][1] + currentDirection[1])
            ]
        )) {
            return setGameOver(true);
        };

        const head: [number, number] = [
            checkAvailableCell(newSnake[newSnake.length - 1][0] += currentDirection[0]),
            checkAvailableCell(newSnake[newSnake.length - 1][1] += currentDirection[1])
        ];

        newSnake.push(head);

        let index = 1;
        if (head[0] === food[0] && head[1] === food[1]) {
            index = 0;
            setScores(prev => prev + 1)
            setFood(updateFoodPos(snake));
        }

        setSnake(newSnake.slice(index));
    }, [snake, currentDirection, food]);

    useEffect(() => {
        if (isGameOver) return;

        if (!speed) return;
        const timerId = setInterval(() => {
            gameLoop();
            setSpeed(prev => scores % 10 === 9 ? prev! - 30 : prev);
        }, speed);

        return () => clearInterval(timerId);
    }, [gameLoop, speed, isGameOver, scores]);

    const startGame = () => {
        setGameOver(false);
        setSpeed(600);
        setScores(0);
        setSnake(createSnake());
    }

    return <StageWrapper role="button" tabIndex={0} onKeyDown={handleKeyDown}> 
                <StyledStage>
                {stage.map((row, index_row) => (
                    <div className="row" key={index_row}>
                        {row.map((cell, index_cell) => {
                            let type: "food" | "snake" | false = snake.some(pos => pos[0] === index_row && pos[1] === index_cell) && "snake";
                            if (type !== "snake") {
                                type = (food[0] === index_row && food[1] === index_cell) && "food";
                            }

                            return <Cell key={index_cell} type={(type === false ? "empty" : type)}/>
                        })}
                    </div>
                ))}
                <div className="stats">
                    <p>Scores: {scores}</p>
                    <button onClick={startGame}>Start Game!</button>
                    <p>{isGameOver ? "Game Over!" : ""}</p>
                </div>
            </StyledStage>
        </StageWrapper>
};      

export default Stage;