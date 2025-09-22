import { Map } from "./map.js";
import { Wall } from "./wall.js";
import { fps, mapData, oneBlockSize } from "./variants.js";
import { Pacman } from "./pacman.js";
import { createRect } from "./utils.js";

let map = new Map(mapData);
let wall = new Wall("#342DCA", 1.5, "black", map);
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
};

let draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  // todo
  wall.draw();
  pacman.draw();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

createNewPacman();
gameLoop();
