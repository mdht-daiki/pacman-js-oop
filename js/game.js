import { Map } from "./map.js";
import { Wall } from "./wall.js";
import { fps, mapData } from "./variants.js";

let map = new Map(mapData);
let wall = new Wall("#342DCA", 1.5, "black", map);

let gameLoop = () => {
  update();
  draw();
};

let update = () => {
  // todo
};

let draw = () => {
  // todo
  wall.draw();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);
