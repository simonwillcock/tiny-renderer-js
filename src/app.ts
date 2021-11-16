import { african_head } from "./assets";
import { Vec3 } from "./geometry";
import { renderModel } from "./models";

const renderer = (selector: string, btnSelector: string) => {
  const canvas = document.querySelector(selector) as HTMLCanvasElement;
  const fileButton = document.querySelector(btnSelector) as HTMLButtonElement;
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");

  // Always start with a blank canvas
  let canvasData = ctx.createImageData(canvas.width, canvas.height);
  const lightDirection = new Vec3(0, 0, -1);

  renderModel(african_head, width, height, lightDirection, canvasData);

  // Update the canvas with the new data
  ctx.putImageData(canvasData, 0, 0);

  fileButton.addEventListener("click", async () => {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker();
    const file: File = await fileHandle.getFile();
    const contents = await file.text();

    let canvasData = ctx.createImageData(canvas.width, canvas.height);
    renderModel(contents, width, height, lightDirection, canvasData);

    // Update the canvas with the new data
    ctx.putImageData(canvasData, 0, 0);
  });
};

renderer("#screen", "#file");
