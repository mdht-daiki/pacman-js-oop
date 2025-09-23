import { canvasContext, oneBlockSize } from "./variants.js";

export class Score {
  constructor(map) {
    this.map = map;
    this.score = 0;
  }

  add(num) {
    this.score += num;
  }

  draw() {
    let height = this.map.getHeight();
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
      "Score: " + this.score,
      0,
      oneBlockSize * (height + 1)
    );
  }
}
