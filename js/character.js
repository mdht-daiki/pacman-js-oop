import {
  DIRECTION,
  moveForwards as directionMoveForwards,
  moveBackwards as directionMoveBackwards,
  getRotationRadian,
} from "./direction.js";

export class Character {
  constructor(x, y, width, height, speed, map) {
    if (new.target === Character)
      throw new Error("Cannot instantiate an abstract class.");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.map = map;
    this.direction = DIRECTION.RIGHT;
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.map.isCollided(this.x, this.y)) {
      this.moveBackwards();
    }
  }

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

  changeDirectionIfPossible() {
    throw new Error("Abstract method!");
  }

  draw() {
    throw new Error("Abstract method!");
  }
}
