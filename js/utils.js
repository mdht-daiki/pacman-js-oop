import { canvasContext } from "./variants.js";

export let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};
