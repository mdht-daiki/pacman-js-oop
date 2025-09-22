import {
  DIRECTION,
  moveForwards as directionMoveForwards,
  moveBackwards as directionMoveBackwards,
  getRotationRadian,
} from "./direction.js";
import { canvasContext, pacmanFrames, oneBlockSize } from "./variants.js";

export class Pacman {
  constructor(x, y, width, height, speed, map) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.map = map;
    this.direction = DIRECTION.RIGHT;
    this.currentFrame = 1;
    this.frameCount = 7;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.map.isCollided(this.x, this.y)) {
      this.moveBackwards();
    }
  }

  eat() {}

  moveBackwards() {
    [this.x, this.y] = directionMoveBackwards(
      this.x,
      this.y,
      this.speed,
      this.direction
    );
  }

  moveForwards() {
    [this.x, this.y] = directionMoveForwards(
      this.x,
      this.y,
      this.speed,
      this.direction
    );
  }

  checkGhostCollision() {}

  changeDirectionIfPossible() {}

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();
    canvasContext.translate(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2
    );
    canvasContext.rotate(getRotationRadian(this.direction));
    canvasContext.translate(
      -this.x - oneBlockSize / 2,
      -this.y - oneBlockSize / 2
    );
    canvasContext.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * oneBlockSize,
      0,
      oneBlockSize,
      oneBlockSize,
      this.x,
      this.y,
      this.width,
      this.height
    );

    canvasContext.restore();
  }
}
