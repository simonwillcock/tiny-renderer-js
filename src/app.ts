import { african_head } from "./assets";
import { COLOURS } from "./constants";
import { drawingFactory, triangle } from "./drawing";
import { Vec2 } from "./geometry";
import { renderModel } from "./models";

const renderer = (selector: string, btnSelector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const fileButton = document.querySelector(btnSelector) as HTMLButtonElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  const t0 = [
    new Vec2(10, 10),
    new Vec2(100, 30),
    new Vec2(190, 160),
  ];

  const pen = drawingFactory(width, height, canvasData);
  
  triangle(pen, width, height, t0, COLOURS.RED);

  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0);

  fileButton.addEventListener("click", async () => {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker();
    const file: File = await fileHandle.getFile();
    const contents = await file.text();

    let canvasData = ctx.createImageData(canvas.width, canvas.height);
    renderModel(contents, width, height, canvasData);

    // Update the canvas with the new data
    ctx.putImageData(canvasData, 0, 0);
  });
};

renderer("#screen", "#file");
