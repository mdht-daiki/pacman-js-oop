import { canvasContext, ghostFrames, oneBlockSize } from "./variants.js";
import { Character } from "./character.js";
import { DIRECTION } from "./direction.js";

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

    this.randomTargets = [
      { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
      { x: 1 * oneBlockSize, y: (this.map.getHeight() - 2) * oneBlockSize },
      { x: (this.map.getWidth() - 2) * oneBlockSize, y: 1 * oneBlockSize },
      {
        x: (this.map.getWidth() - 2) * oneBlockSize,
        y: (this.map.getHeight() - 2) * oneBlockSize,
      },
    ];
    this.randomTargetIndex = parseInt(
      Math.random() * this.randomTargets.length
    );
    this.target = this.randomTargets[this.randomTargetIndex];

    setInterval(() => {
      this.changeRandomDirection();
    }, 10000);
  }

  changeRandomDirection() {
    this.randomTargetIndex += parseInt(Math.random() * 4);
    this.randomTargetIndex = this.randomTargetIndex % 4;
  }

  moveProcess(pacman) {
    if (this.map.isInRange(pacman, this)) {
      this.target = pacman;
    } else {
      this.target = this.randomTargets[this.randomTargetIndex];
    }
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.map.isCollided(this.x, this.y)) {
      this.moveBackwards();
    }
  }

  changeDirectionIfPossible() {
    let tempDirection = this.direction;
    let [destY, destX] = this.map.getIndex(this.target.x, this.target.y);

    this.direction = this.calculateNewDirection(destX, destY);

    if (typeof this.direction == "undefined") {
      this.direction = tempDirection;
      return;
    }

    let [thisMapY, thisMapX] = this.map.getIndex(this.x, this.y);
    let [thisMapYRightBelow, thisMapXRightBelow] = this.map.getIndexRightBelow(
      this.x,
      this.y
    );

    if (
      thisMapY != thisMapYRightBelow &&
      (this.direction == DIRECTION.LEFT || this.direction == DIRECTION.RIGHT)
    ) {
      this.direction = DIRECTION.UP;
    }
    if (thisMapX != thisMapXRightBelow && this.direction == DIRECTION.UP) {
      this.direction = DIRECTION.LEFT;
    }
    this.moveForwards();
    if (this.map.isCollided(this.x, this.y)) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(destX, destY) {
    let mp = [];
    for (let i = 0; i < this.map.getHeight(); i++) {
      mp[i] = this.map.data[i].slice();
    }

    let queue = [];
    let [y, x] = this.map.getIndex(this.x, this.y);
    queue.push({ x: x, y: y, moves: [] });

    while (queue.length > 0) {
      let popped = queue.shift();
      if (popped.x === destX && popped.y === destY) {
        return popped.moves[0];
      } else {
        mp[popped.y][popped.x] = 1;
        let neighborList = this.addNeighbors(popped, mp);
        for (let i = 0; i < neighborList.length; i++) {
          queue.push(neighborList[i]);
        }
      }
    }

    return DIRECTION.UP; // default
  }

  addNeighbors(popped, mp) {
    let queue = [];
    let numOfRows = mp.length;
    let numOfColumns = mp[0].length;

    if (
      popped.x - 1 >= 0 &&
      popped.x - 1 < numOfRows &&
      mp[popped.y][popped.x - 1] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION.LEFT);
      queue.push({ x: popped.x - 1, y: popped.y, moves: tempMoves });
    }
    if (
      popped.x + 1 >= 0 &&
      popped.x + 1 < numOfRows &&
      mp[popped.y][popped.x + 1] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION.RIGHT);
      queue.push({ x: popped.x + 1, y: popped.y, moves: tempMoves });
    }
    if (
      popped.y - 1 >= 0 &&
      popped.y - 1 < numOfColumns &&
      mp[popped.y - 1][popped.x] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION.UP);
      queue.push({ x: popped.x, y: popped.y - 1, moves: tempMoves });
    }
    if (
      popped.y + 1 >= 0 &&
      popped.y + 1 < numOfColumns &&
      mp[popped.y + 1][popped.x] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION.BOTTOM);
      queue.push({ x: popped.x, y: popped.y + 1, moves: tempMoves });
    }

    return queue;
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

    canvasContext.beginPath();
    canvasContext.strokeStyle = "red";
    canvasContext.arc(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2,
      this.range * oneBlockSize,
      0,
      2 * Math.PI
    );
    canvasContext.stroke();
  }
}
