"use client"
import { KeyboardEvent, useEffect, useState } from "react";

const GRID_SIZE = 20; // Number of cells in each row and column
const INITIAL_SNAKE_LENGTH = 3; // Initial length of the snake
const INITIAL_DIRECTION = "DOWN"; // Initial direction of the snake

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Point = {
  x: number;
  y: number;
};

export default function Home() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0); // State for point counter
  const [headPosition, setHeadPosition] = useState<Point>({ x: 2, y: 0 }); // State for the snake's head position

  const moveSnake = (): void => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
      default:
        break;
    }

    // Check if game over
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      generateFood();
      setPoints(points + 1); // Increment points when snake eats food
    } else {
      newSnake.pop();
    }

    // Update the snake state and head position
    setSnake(newSnake);
    setHeadPosition(head);
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 60); // Adjust snake speed here
      return () => clearInterval(interval);
    }
  }, [snake, direction]);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = (): void => {
    const initialSnake: Point[] = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: i, y: 0 });
    }
    setSnake(initialSnake);
    generateFood();
    setPoints(0); // Reset points when starting a new game
    setHeadPosition({ x: 2, y: 0 }); // Set initial head position
  };

  const generateFood = (): void => {
    let newFood: Point;
    do {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      newFood = { x, y };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
  
    setFood(newFood);
  };

  const changeDirection = (direction: Direction) => {
    setTimeout(() => {
      setDirection(direction);
    }, 500);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (
      (event.key === "ArrowUp" && direction !== "DOWN") ||
      (event.key === "ArrowDown" && direction !== "UP") ||
      (event.key === "ArrowLeft" && direction !== "RIGHT") ||
      (event.key === "ArrowRight" && direction !== "LEFT")
    ) {
      if (event.key === "ArrowUp") {
        setDirection("UP");
      }
      if (event.key === "ArrowDown") {
        setDirection("DOWN");
      }
      if (event.key === "ArrowLeft") {
        setDirection("LEFT");
      }
      if (event.key === "ArrowRight") {
        setDirection("RIGHT");
      }
    }
  };

  const handleRefresh = (): void => {
    setGameOver(false);
    setDirection(INITIAL_DIRECTION);
    initGame();
    window.addEventListener('keydown', handleKeyPress); // Add event listener again
  };
  

  return (
    <div
      className="flex justify-center items-center h-screen bg-white" // Changed background color to white
      onKeyDown={handleKeyPress}
      tabIndex={0}
      autoFocus
    >
      <div className="grid grid-cols-20 grid-rows-20 border-4 border-black"> {/* Added wider border */}
        {gameOver && (
          <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold text-red-600">
            Game Over!
            <button onClick={handleRefresh} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Refresh
            </button>
          </div>
        )}
        <div className="absolute top-0 right-0 p-4 text-lg font-bold text-gray-800">
          Points: {points}
        </div>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <div key={y} className="flex">
            {Array.from({ length: GRID_SIZE }).map((_, x) => (
              <div
                key={x}
                className={`w-5 h-5 border border-gray-200 
                ${snake.some((segment) => segment.x === x && segment.y === y) && (headPosition.x === x && headPosition.y === y ? "bg-green-600" : "bg-green-500")}
                ${food.x === x && food.y === y && "bg-red-500"}
                `}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
