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

  isAisle(i, j) {
    return this.data[i][j] === 2;
  }
}
