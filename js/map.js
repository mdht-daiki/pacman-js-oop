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

  updateFoodToAisle(x, y) {
    let i = parseInt(y / oneBlockSize);
    let j = parseInt(x / oneBlockSize);
    if (!this.isFood(i, j)) throw new Error("this is not food section!");
    this.data[i][j] = 3;
  }

  isCollided(x, y) {
    let i1 = parseInt(y / oneBlockSize);
    let j1 = parseInt(x / oneBlockSize);
    let i2 = parseInt(y / oneBlockSize + 0.9999);
    let j2 = parseInt(x / oneBlockSize + 0.9999);

    if (
      this.isWall(i1, j1) ||
      this.isWall(i1, j2) ||
      this.isWall(i2, j1) ||
      this.isWall(i2, j2)
    )
      return true;
    return false;
  }

  canEat(x, y) {
    let i = parseInt(y / oneBlockSize);
    let j = parseInt(x / oneBlockSize);

    if (this.isFood(i, j)) return true;
    return false;
  }
}
