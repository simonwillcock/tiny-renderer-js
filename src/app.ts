import { COLOURS } from './constants';

interface Coordinates {
  x: number
  y: number
};

interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

type DrawingFunction = (coords: Coordinates, rgba: RGBA) => void
type DrawingFactory = (width: number, height: number, canvasData: ImageData) => DrawingFunction;

const drawingFactory: DrawingFactory = (width, height, canvasData) => (coords, rgba) => {
  // Canvas data is an array with one value for each component in a pixel, 
  // organized left to right, top to bottom, with each pixel represented 
  // as four values in RGBA order.
  
  const { x, y } = coords;

  const translatedY = Math.abs(height - Math.floor(y));
  const index = translatedY * (width * 4) + Math.floor(x) * 4

  // Set RGBA values as each component of the pixel
  Object.values(rgba).forEach((value: number, offset) => {
    canvasData.data[index + offset] = value;
  });
}

const line = (pen: DrawingFunction, x0: number, y0: number, x1: number, y1: number, color: RGBA) => {
  let steep = false;

  if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
    steep = true;
    [x0, y0] = [y0, x0];
    [x1, y1] = [y1, x1];
  }

  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  for (let x = x0; x <= x1; x++) {

    const t = (x - x0) / (x1 - x0);
    const y = y0 * (1 - t) + y1 * t;

    if (steep) {
      // De-transpose
      pen({x: y, y: x}, color);
    } else {
      pen({x, y}, color);
    }
  }
}

const renderer = (selector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  // Create drawing function
  const pen = drawingFactory(width, height, canvasData);

  // Do drawing - simple for now
  line(pen, 13, 20, 80, 40, COLOURS.WHITE);
  line(pen, 20, 13, 40, 80, COLOURS.RED);
  line(pen, 80, 40, 13, 20, COLOURS.RED);

  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0)
};

renderer('#screen');