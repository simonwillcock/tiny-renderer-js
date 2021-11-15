import { COLOURS } from "./constants";
import { Vec2 } from './geometry';
import { DrawingFactory, DrawingFunction, RGBA } from "./types";

export const drawingFactory: DrawingFactory =
  (width, height, canvasData) => (coords, rgba) => {
  // Canvas data is an array with one value for each component in a pixel,
  // organized left to right, top to bottom, with each pixel represented
  // as four values in RGBA order.

  const { x, y } = coords;

  const translatedY = Math.abs(height - Math.floor(y));
  const index = translatedY * (width * 4) + Math.floor(x) * 4;

  // Set RGBA values as each component of the pixel
  Object.values(rgba).forEach((value: number, offset) => {
    canvasData.data[index + offset] = value;
  });
};

export const line = (pen: DrawingFunction, x0: number, y0: number, x1: number, y1: number, color: RGBA) => {
  let steep = false;

  if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
    // If line is steep, transpose the image
    steep = true;
    [x0, y0] = [y0, x0];
    [x1, y1] = [y1, x1];
  }

  if (x0 > x1) {
    // Make it left-to-right
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  const dx = x1 - x0;
  const dy = y1 - y0;
  const y_step = Math.abs(dy) * 2;
  
  let y_error = 0;
  let y = y0;

  for (let x = x0; x <= x1; x++) {
    if (steep) {
      pen({x: y, y: x}, color);
    } else {
      pen({x, y}, color);
    }
    y_error += y_step;
    if (y_error > dx) {
      y += (y1 > y0) ? 1 : -1;
      y_error -= dx * 2;
    }
  }
};

export const vline = (pen: DrawingFunction, p0: Vec2, p1: Vec2, color: RGBA) => {
  line(pen, p0.x, p0.y, p1.x, p1.y, color);
};

export const triangle = (pen: DrawingFunction, t0: Vec2, t1: Vec2, t2: Vec2, color: RGBA) => {
  if (t0.y === t1.y && t0.y === t2.y) return
  // Sort in ascending order by y-coordinate
  if (t0.y > t1.y) {
    [t0, t1] = [t1, t0];
  }
  if (t0.y > t2.y) {
    [t0, t2] = [t2, t0];
  }
  if (t1.y > t2.y) {
    [t1, t2] = [t2, t1];
  }
  const totalHeight = t2.y - t0.y;
  for (let i = 0; i < totalHeight; i++) {
    const secondHalf = i > t1.y - t0.y || t1.y === t0.y;
    const segmentHeight = secondHalf ? t2.y - t1.y : t1.y - t0.y;
    const alpha = i / totalHeight;
    const beta = (i - (secondHalf ? t1.y - t0.y : 0)) / segmentHeight;
    let A = t0.clone().add(t2.clone().subtract(t0.clone()).multiply(alpha));
    let B = secondHalf ? t1.clone().add(t2.clone().subtract(t1.clone()).multiply(beta)) : t0.clone().add(t1.clone().subtract(t0.clone()).multiply(beta));
    if (A.x > B.x) {
      [A, B] = [B, A];
    }

    for (let j = A.x; j < B.x; j++) {  
      pen({x: j, y: t0.y + i}, color);
    }
  }

  // vline(pen, t0, t1, COLOURS.GREEN);
  // vline(pen, t1, t2, COLOURS.GREEN);
  // vline(pen, t2, t0, COLOURS.RED);
};