import { COLOURS } from "./constants";
import { Vec2, Vec3 } from "./geometry";
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

export const line = (
  pen: DrawingFunction,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: RGBA
) => {
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
      pen({ x: y, y: x }, color);
    } else {
      pen({ x, y }, color);
    }
    y_error += y_step;
    if (y_error > dx) {
      y += y1 > y0 ? 1 : -1;
      y_error -= dx * 2;
    }
  }
};

export const vline = (
  pen: DrawingFunction,
  p0: Vec2,
  p1: Vec2,
  color: RGBA
) => {
  line(pen, p0.x, p0.y, p1.x, p1.y, color);
};

export const barycentric = (points: Vec2[], P: Vec2) => {
  const v0 = new Vec3(
    points[2].x - points[0].x,
    points[1].x - points[0].x,
    points[0].x - P.x
  );
  const v1 = new Vec3(
    points[2].y - points[0].y,
    points[1].y - points[0].y,
    points[0].y - P.y
  );
  const u = v0.crossProduct(v1);
  if (Math.abs(u.z) < 1) {
    // Bad triangle - return a vector outside of bounds (negative)
    return new Vec3(-1, 1, 1);
  }
  return new Vec3(1 - (u.x + u.y) / u.z, u.y / u.z, u.x / u.z);
};

export const triangle = (
  pen: DrawingFunction,
  width: number,
  height: number,
  points: Vec2[],
  color: RGBA
) => {
  const bboxmin = new Vec2(width - 1, height - 1);
  const bboxmax = new Vec2(0, 0);
  const clamp = new Vec2(width - 1, height - 1);
  for (let i = 0; i < 3; i++) {
    ['x', 'y'].forEach(val => {
      bboxmin[val] = Math.max(0, Math.min(bboxmin[val], points[i][val]));
      bboxmax[val] = Math.min(clamp[val], Math.max(bboxmax[val], points[i][val]));
    });
  }
  const P = new Vec2(0, 0);
  for (P.y = bboxmin.y; P.y <= bboxmax.y; P.y++) {
    for (P.x = bboxmin.x; P.x <= bboxmax.x; P.x++) {
      const bcScreen = barycentric(points, P);
      if (bcScreen.x < 0 || bcScreen.y < 0 || bcScreen.z < 0) {
        continue;
      }
      pen({x: P.x, y: P.y}, color);
    }
  }
};
