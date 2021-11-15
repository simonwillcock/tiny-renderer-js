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
    new Vec2(10, 70),
    new Vec2(50, 160),
    new Vec2(70, 80),
  ];
  const t1 = [
    new Vec2(180, 50),
    new Vec2(150, 1),
    new Vec2(70, 180),
  ];
  const t2 = [
    new Vec2(180, 150),
    new Vec2(120, 160),
    new Vec2(130, 180),
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
