import { COLOURS } from './constants';
import { drawingFactory, faster_line, fastest_line, line } from './drawing';

const renderer = (selector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  // Create drawing function
  const pen = drawingFactory(width, height, canvasData);

  fastest_line(pen, 13, 20, 80, 40, COLOURS.WHITE);
  fastest_line(pen, 20, 13, 40, 80, COLOURS.RED);
  fastest_line(pen, 80, 40, 13, 20, COLOURS.RED);
  
  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0)
};

renderer('#screen');