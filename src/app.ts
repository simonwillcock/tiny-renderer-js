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
  
  // We will be passing in coordinates assuming the origin is at the bottom left,
  // so we need to translate them accordingly
  const { x, y } = coords;
  const translatedY = Math.abs(height - y);

  const pixelIndex = (translatedY * width + x) * 4;

  // Set RGBA values as each component of the pixel
  Object.values(rgba).forEach((value: number, offset) => {
    canvasData.data[pixelIndex + offset] = value;
  });
}

const renderer = (selector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  // Create drawing function
  const drawPixel = drawingFactory(width, height, canvasData);

  // Do drawing - simple for now
  drawPixel({x: 52, y: 41}, {r: 255, g: 0, b: 0, a: 255});

  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0)
};

renderer('#screen');