import { oneBlockSize } from "./variants.js";
import { createRect } from "./utils.js";

export class Wall {
  constructor(color, thickness, innerColor, map) {
    this.color = color;
    this.thickness = thickness;
    this.innerColor = innerColor;
    this.map = map;
    this.mapHeight = map.getHeight();
    this.mapWidth = map.getWidth();

    this.spaceWidth = oneBlockSize / this.thickness;
    this.offset = (oneBlockSize - this.spaceWidth) / 2;
  }

  draw() {
    for (let i = 0; i < this.mapHeight; i++) {
      for (let j = 0; j < this.mapWidth; j++) {
        if (this.map.isWall(i, j)) {
          // then it is a wall
          createRect(
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            this.color
          );
          if (
            j > 0 && // is not leftmost
            this.map.isWall(i, j - 1) // left neighbor is also wall
          ) {
            // ■■■
            // □□■
            // ■■■
            createRect(
              j * oneBlockSize,
              i * oneBlockSize + this.offset,
              this.spaceWidth + this.offset,
              this.spaceWidth,
              this.innerColor
            );
          }
          if (
            j < this.mapWidth - 1 && // is not rightmost
            this.map.isWall(i, j + 1) // right neighbor is also wall
          ) {
            // ■■■
            // ■□□
            // ■■■
            createRect(
              j * oneBlockSize + this.offset,
              i * oneBlockSize + this.offset,
              this.spaceWidth + this.offset,
              this.spaceWidth,
              this.innerColor
            );
          }
          if (
            i > 0 && // is not top
            this.map.isWall(i - 1, j) // upper neighbor is also wall
          ) {
            // ■□■
            // ■□■
            // ■■■
            createRect(
              j * oneBlockSize + this.offset,
              i * oneBlockSize,
              this.spaceWidth,
              this.spaceWidth + this.offset,
              this.innerColor
            );
          }
          if (
            i < this.mapHeight - 1 && // is not bottom
            this.map.isWall(i + 1, j) // lower neighbor is also wall
          ) {
            // ■■■
            // ■□■
            // ■□■
            createRect(
              j * oneBlockSize + this.offset,
              i * oneBlockSize + this.offset,
              this.spaceWidth,
              this.spaceWidth + this.offset,
              this.innerColor
            );
          }
        }
      }
    }
  }
}
