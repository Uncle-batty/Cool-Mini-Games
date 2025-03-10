const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird properties
let birdY = canvas.height / 2;
let velocity = 0;
const gravity = 0.5;
const flapStrength = -5;

// Draw the bird
function drawBird() {
    ctx.beginPath();
    ctx.arc(100, birdY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
}

// Pipe properties
let pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;
let frames = 0;

// Create pipes
function createPipe() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;

    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: pipeHeight + pipeGap,
    });
}

// Draw pipes
function drawPipes() {
    ctx.fillStyle = "#008000";
    pipes.forEach((pipe) => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

// Move pipes
function movePipes() {
    pipes.forEach((pipe) => {
        pipe.x -= pipeSpeed;
    });

    // Remove pipes off-screen
    pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);
}


// Handle bird flap on key press
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        velocity = flapStrength;
    }
});
// Check collisions
function checkCollision() {
    if (birdY + 10 >= canvas.height || birdY - 10 <= 0) {
        resetGame();
    }

    pipes.forEach((pipe) => {
        if (
            (100 + 10 > pipe.x && 100 - 10 < pipe.x + pipeWidth &&
            (birdY - 10 < pipe.top || birdY + 10 > pipe.bottom))
        ) {
            resetGame();
        }
    });
}

// Reset game
function resetGame() {
    alert("Game Over! Press OK to restart.");
    birdY = canvas.height / 2;
    velocity = 0;
    pipes = [];
    frames = 0;
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird
    velocity += gravity;
    birdY += velocity;

    // Draw elements
    drawBird();
    drawPipes();

    // Move pipes & check collisions
    movePipes();
    checkCollision();

    // Add new pipes
    if (frames % 150 === 0) createPipe();

    frames++;
    requestAnimationFrame(gameLoop); // Call gameLoop for the next frame
}


// Start the game loop
gameLoop();
