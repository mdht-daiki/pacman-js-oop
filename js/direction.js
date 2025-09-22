export const DIRECTION = Object.freeze({
  RIGHT: 4,
  UP: 3,
  LEFT: 2,
  BOTTOM: 1,
});

const DirectionHandlersForward = {
  [DIRECTION.RIGHT]: (x, y, speed) => {
    return [x + speed, y];
  },
  [DIRECTION.UP]: (x, y, speed) => {
    return [x, y - speed];
  },
  [DIRECTION.LEFT]: (x, y, speed) => {
    return [x - speed, y];
  },
  [DIRECTION.BOTTOM]: (x, y, speed) => {
    return [x, y + speed];
  },
};

const DirectionHandlersBackward = {
  [DIRECTION.RIGHT]: (x, y, speed) => {
    return [x - speed, y];
  },
  [DIRECTION.UP]: (x, y, speed) => {
    return [x, y + speed];
  },
  [DIRECTION.LEFT]: (x, y, speed) => {
    return [x + speed, y];
  },
  [DIRECTION.BOTTOM]: (x, y, speed) => {
    return [x, y - speed];
  },
};

export function moveForwards(x, y, speed, direction) {
  const handler = DirectionHandlersForward[direction];
  if (handler) return handler(x, y, speed);
  else console.log("Direction error!!!");
}

export function moveBackwards(x, y, speed, direction) {
  const handler = DirectionHandlersBackward[direction];
  if (handler) return handler(x, y, speed);
  else console.log("Direction error!!!");
}

export function getRotationRadian(direction) {
  return (direction * 90 * Math.PI) / 180;
}
