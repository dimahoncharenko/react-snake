type NextSteps = [number, number];

export const tuple = <T extends unknown[]>(...args: T): T => {
    return args;
}

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 10;

export const createStage = () => Array<number[]>(STAGE_HEIGHT).fill(Array(STAGE_WIDTH).fill(0));

export const createSnake = () => Array<[number, number]>(1).fill(tuple(1, 1));

export const checkAvailableCell = (position: number) => {
    if (position < 0) {
        return STAGE_HEIGHT - 1;
    } else if (position > STAGE_HEIGHT - 1) {
        return 0;
    } else {
        return position;
    }
};

export const updateFoodPos = (snake: number[][]) => {
    let newPos: [number, number];

    do {
        newPos = [
            Math.floor(Math.random() * STAGE_HEIGHT),
            Math.floor(Math.random() * STAGE_WIDTH)
        ];
    } while (snake.some(cell => cell[0] === newPos[0] && cell[1] === newPos[1]));
    
    return newPos;
};

export const checkCollision = (snake: number[][], [y, x]: NextSteps) => {
    for (let i = 0; i < snake.length; i++) {
        if (
            snake[i][0] === y &&
            snake[i][1] === x
        ) {
            return true;
        }
    }
    return false;
};