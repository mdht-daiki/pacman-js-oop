import { createRect } from "./utils.js";
import { oneBlockSize } from "./variants.js";

export class Food {
  constructor(color, map) {
    this.color = color;
    this.map = map;
  }

  draw() {
    let height = this.map.getHeight();
    let width = this.map.getWidth();
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (this.map.isFood(i, j)) {
          createRect(
            j * oneBlockSize + oneBlockSize / 3,
            i * oneBlockSize + oneBlockSize / 3,
            oneBlockSize / 3,
            oneBlockSize / 3,
            this.color
          );
        }
      }
    }
  }
}
