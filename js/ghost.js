import { getRotationRadian } from "./direction.js";
import { canvasContext, ghostFrames, oneBlockSize } from "./variants.js";
import { Character } from "./character.js";

export class Ghost extends Character {
  constructor(
    x,
    y,
    width,
    height,
    speed,
    map,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    range
  ) {
    super(x, y, width, height, speed, map);
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
  }

  changeDirectionIfPossible() {
    if (this.direction === this.nextDirection) return;

    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();
    if (this.map.isCollided(this.x, this.y)) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  draw() {
    canvasContext.save();
    canvasContext.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }
}
