import { Map } from "./map.js";
import { Wall } from "./wall.js";
import { Food } from "./food.js";
import { Score } from "./score.js";
import { fps, mapData, oneBlockSize, canvasContext } from "./variants.js";
import { Pacman } from "./pacman.js";
import { createRect } from "./utils.js";
import { DIRECTION } from "./direction.js";
import { Ghost } from "./ghost.js";

let map = new Map(mapData);
let wall = new Wall("#342DCA", 1.5, "black", map);
let food = new Food("#FEB897", map);
let score = new Score(map);
let pacman;
let ghosts = [];
let ghostCount = 4;
let lives = 3;

let ghostLocations = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];

let createNewPacman = () => {
  pacman = new Pacman(
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 5,
    map
  );
};

let gameLoop = () => {
  draw();
  update();
};

let update = () => {
  // todo
  pacman.moveProcess();
  score.add(pacman.eat());
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].moveProcess(pacman);
  }

  if (map.checkHit(pacman, ghosts)) {
    console.log("hit");
    restartGame();
  }
  if (score.isCleared()) {
    drawWin();
    clearInterval(gameInterval);
  }
};

let restartGame = () => {
  createNewPacman();
  createGhosts();
  lives--;
  if (lives === 0) {
    gameOver();
  }
};

let gameOver = () => {
  drawGameOver();
  clearInterval(gameInterval);
};

let drawGameOver = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Game Over!", 150, 200);
};

let drawWin = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Winner winner,", 0, 200);
  canvasContext.fillText("chicken dinner!", 0, 230);
};

let draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  // todo
  wall.draw();
  pacman.draw(lives);
  food.draw();
  score.draw();
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
  }
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let createGhosts = () => {
  ghosts = [];
  for (let i = 0; i < ghostCount; i++) {
    let newGhost = new Ghost(
      9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      pacman.speed / 2,
      map,
      ghostLocations[i % 4].x,
      ghostLocations[i % 4].y,
      124,
      116,
      6 + i
    );
    ghosts.push(newGhost);
  }
};

createNewPacman();
createGhosts();
gameLoop();

window.addEventListener("keydown", (event) => {
  let c = event.code;

  setTimeout(() => {
    if (c === "ArrowLeft" || c === "keyA") {
      // left
      pacman.nextDirection = DIRECTION.LEFT;
    } else if (c === "ArrowUp" || c === "keyW") {
      // up
      pacman.nextDirection = DIRECTION.UP;
    } else if (c === "ArrowRight" || c === "keyD") {
      // right
      pacman.nextDirection = DIRECTION.RIGHT;
    } else if (c === "ArrowDown" || c === "keyS") {
      // bottom
      pacman.nextDirection = DIRECTION.BOTTOM;
    }
  }, 1);
});
