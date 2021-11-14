import { african_head } from "./assets";
import { COLOURS } from "./constants";
import { drawingFactory, triangle } from "./drawing";
import { renderModel } from "./models";

const renderer = (selector: string, btnSelector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const fileButton = document.querySelector(btnSelector) as HTMLButtonElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);

  const t0 = [
    { x: 10, y: 70 },
    { x: 50, y: 160 },
    { x: 70, y: 80 },
  ];
  const t1 = [
    { x: 180, y: 50 },
    { x: 150, y: 1 },
    { x: 70, y: 180 },
  ];
  const t2 = [
    { x: 180, y: 150 },
    { x: 120, y: 160 },
    { x: 130, y: 180 },
  ];

  const pen = drawingFactory(width, height, canvasData);
  
  triangle(pen, t0[0], t0[1], t0[2], COLOURS.RED);
  triangle(pen, t1[0], t1[1], t1[2], COLOURS.WHITE);
  triangle(pen, t2[0], t2[1], t2[2], COLOURS.GREEN);

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
