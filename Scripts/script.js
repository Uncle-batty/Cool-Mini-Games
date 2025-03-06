const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20; // Size of each grid square
let snake = [{ x: 200, y: 200 }]; // Initial snake position
let direction = "RIGHT";
let food = { x: 300, y: 300 }; // Initial food position
let gameStarted = false;

let score = 0; // Initialize score

// Update score in the DOM
function updateScore() {
    document.getElementById("score").innerText = score;
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Control the snake
document.addEventListener("keydown", (event) => {
    if (!gameStarted) gameStarted = true; // Start game on first key press

    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Move the snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    snake.unshift(head);
    snake.pop();
}

// Check for collision with food
function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 1; // Increase score by 10 points
        updateScore();
        snake.push({}); // Add new segment

        // Generate new food position
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
        };
    }
}

// Check for collisions
function checkCollision() {
    // Wall collision
    if (
        snake[0].x < 0 || 
        snake[0].x >= canvas.width || 
        snake[0].y < 0 || 
        snake[0].y >= canvas.height
    ) {
        resetGame();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            resetGame();
        }
    }
}

// Reset game on collision
function resetGame() {
    alert(`Game Over! Your score: ${score}. Press OK to restart.`);
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0; // Reset score
    updateScore(); // Reset score display

    food = { 
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };

    gameStarted = false; // Stop game until key press
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameStarted) {
        moveSnake();
        checkFoodCollision();
        checkCollision();
    }

    drawSnake();
    drawFood();
}

// Start the game loop
setInterval(gameLoop, 100);
