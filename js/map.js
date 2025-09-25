import { oneBlockSize } from "./variants.js";

export class Map {
  constructor(data) {
    this.data = data;
  }

  getHeight() {
    return this.data.length;
  }

  getWidth() {
    return this.data[0].length;
  }

  isWall(i, j) {
    return this.data[i][j] === 1;
  }

  isFood(i, j) {
    return this.data[i][j] === 2;
  }

  isAisle(i, j) {
    return this.data[i][j] === 3;
  }

  getIndex(x, y) {
    let i = parseInt(y / oneBlockSize);
    let j = parseInt(x / oneBlockSize);
    return [i, j];
  }

  getIndexRightBelow(x, y) {
    let i = parseInt(y / oneBlockSize + 0.9999);
    let j = parseInt(x / oneBlockSize + 0.9999);
    return [i, j];
  }

  updateFoodToAisle(x, y) {
    let [i, j] = this.getIndex(x, y);
    if (!this.isFood(i, j)) throw new Error("this is not food section!");
    this.data[i][j] = 3;
  }

  isCollided(x, y) {
    let [i1, j1] = this.getIndex(x, y);
    let [i2, j2] = this.getIndexRightBelow(x, y);

    if (
      this.isWall(i1, j1) ||
      this.isWall(i1, j2) ||
      this.isWall(i2, j1) ||
      this.isWall(i2, j2)
    ) {
      return true;
    }

    return false;
  }

  canEat(x, y) {
    let [i, j] = this.getIndex(x, y);

    if (this.isFood(i, j)) return true;
    return false;
  }

  isInRange(pacman, ghost) {
    let [pacmanMapY, pacmanMapX] = this.getIndex(pacman.x, pacman.y);
    let [ghostMapY, ghostMapX] = this.getIndex(ghost.x, ghost.y);

    let xDistance = Math.abs(pacmanMapX - ghostMapX);
    let yDistance = Math.abs(pacmanMapY - ghostMapY);

    if (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= ghost.range
    ) {
      return true;
    }
    return false;
  }

  checkHit(pacman, ghosts) {
    for (let i = 0; i < ghosts.length; i++) {
      let ghost = ghosts[i];
      let [ghostY, ghostX] = this.getIndex(ghost.x, ghost.y);
      let [pacmanY, pacmanX] = this.getIndex(pacman.x, pacman.y);
      if (ghostX == pacmanX && ghostY == pacmanY) {
        return true;
      }
    }
    return false;
  }

  getFoodCount() {
    let foodCount = 0;
    for (let i = 0; i < this.getHeight(); i++) {
      for (let j = 0; j < this.getWidth(); j++) {
        if (this.isFood(i, j)) {
          foodCount++;
        }
      }
    }
    return foodCount;
  }
}
