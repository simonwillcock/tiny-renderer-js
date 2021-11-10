import { COLOURS } from "./constants";
import { drawingFactory, line } from "./drawing";
import { Vertex } from "./types";

export const parseModel = (text: string) => {
  // Parse wavefront obj format
  const lines = text.split("\n");
  const vertices: Vertex[] = [];
  const faces = [];

  lines.forEach((line) => {
    if (line.startsWith("v ")) {
      vertices.push(parseVertex(line));
    } else if (line.startsWith("f ")) {
      faces.push(parseFace(line));
    }
  });
  return { vertices, faces };
};

const parseFace = (line: string): number[] => {
  // eg. f 1193/1240/1193 1180/1227/1180 1179/1226/1179
  // Get first number from each group and subtract 1 due to different indices.
  return line.split(" ").slice(1).map((v) => parseInt(v) - 1);
}

const parseVertex = (line: string): Vertex => {
  // eg. v 0.608654 -0.568839 -0.416318
  const [x, y, z] = line.split(" ").slice(1).map((v) => parseFloat(v));
  return { x, y, z };
}

export const renderModel = (text: string, width: number, height: number, canvasData: ImageData) => {
  // Create drawing function
  const pen = drawingFactory(width, height, canvasData);

  const { faces, vertices } = parseModel(text);
  // Loop through faces and draw each line
  faces.forEach((face) => {
    // select vertices for this face
    const [a, b, c] = face;
    const v = [vertices[a], vertices[b], vertices[c]];
    for (let i = 0; i < v.length - 1; i++) {
      const v0 = v[i];
      const v1 = v[(i + 1) % 3];
      const x0 = (v0.x + 1) * (width * 0.5);
      const y0 = (v0.y + 1) * (height * 0.5);
      const x1 = (v1.x + 1) * (width * 0.5);
      const y1 = (v1.y + 1) * (height * 0.5);
      line(pen, x0, y0, x1, y1, COLOURS.WHITE);
    }
  });
};