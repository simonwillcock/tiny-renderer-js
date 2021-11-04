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

type DrawingFunction = (coords: Coordinates, rgba: RGBA) => ImageData
type DrawingFactory = (width: number, canvasData: ImageData) => DrawingFunction;

const drawingFactory: DrawingFactory = (width, canvasData) => ({x, y}, rgba): ImageData => {
  // Canvas data is an array with one value for each component in a pixel, 
  // organized left to right, top to bottom, with each pixel represented 
  // as four values in RGBA order.
  const pixelIndex = (x + y * width) * 4;

  // Set RGBA values as each component of the pixel
  Object.values(rgba).forEach((value: number, offset) => {
    canvasData.data[pixelIndex + offset] = value;
  });
  return canvasData;
}

const renderer = (selector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const { width } = canvas;
  const ctx = canvas.getContext('2d');

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  // Create drawing function
  const drawPixel = drawingFactory(width, canvasData);

  // Do drawing
  canvasData = drawPixel({x: 75, y: 75}, {r: 255, g: 0, b: 255, a: 255});

  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0)
};

renderer('#screen');