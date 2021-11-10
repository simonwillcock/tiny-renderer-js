import { african_head } from './assets';
import { renderModel } from './models';

const renderer = (selector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  renderModel(african_head, width, height, canvasData);
  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0)
};

renderer('#screen');