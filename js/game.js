import { Map } from "./map.js";
import { Wall } from "./wall.js";
import { Food } from "./food.js";
import { Score } from "./score.js";
import { fps, mapData, oneBlockSize } from "./variants.js";
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
  update();
  draw();
};

let update = () => {
  // todo
  pacman.moveProcess();
  score.add(pacman.eat());
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].moveProcess(pacman);
  }
};

let draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  // todo
  wall.draw();
  pacman.draw();
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
