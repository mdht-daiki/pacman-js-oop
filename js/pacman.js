import { getRotationRadian } from "./direction.js";
import { canvasContext, pacmanFrames, oneBlockSize } from "./variants.js";
import { Character } from "./character.js";

export class Pacman extends Character {
  constructor(x, y, width, height, speed, map) {
    super(x, y, width, height, speed, map);
    this.nextDirection = this.direction;
    this.currentFrame = 1;
    this.frameCount = 7;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  eat() {
    if (this.map.canEat(this.x, this.y)) {
      try {
        this.map.updateFoodToAisle(this.x, this.y);
      } catch (e) {
        console.warn(e.message);
      }
      return 1;
    }
    return 0;
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

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw(lives) {
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

    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
      "Lives: ",
      220,
      oneBlockSize * (this.map.getHeight() + 1)
    );
    for (let i = 0; i < lives; i++) {
      canvasContext.drawImage(
        pacmanFrames,
        2 * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        350 + i * oneBlockSize,
        oneBlockSize * this.map.getHeight() + 2,
        oneBlockSize,
        oneBlockSize
      );
    }
  }
}
