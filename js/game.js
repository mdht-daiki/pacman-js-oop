import { Map } from "./map.js";
import { Wall } from "./wall.js";
import { Food } from "./food.js";
import { Score } from "./score.js";
import { fps, mapData, oneBlockSize } from "./variants.js";
import { Pacman } from "./pacman.js";
import { createRect } from "./utils.js";
import { DIRECTION } from "./direction.js";

let map = new Map(mapData);
let wall = new Wall("#342DCA", 1.5, "black", map);
let food = new Food("#FEB897", map);
let score = new Score(map);
let pacman;

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
};

let draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  // todo
  wall.draw();
  pacman.draw();
  food.draw();
  score.draw();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

createNewPacman();
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
