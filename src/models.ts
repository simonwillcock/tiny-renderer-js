import { COLOURS } from "./constants";
import { drawingFactory, line, triangle } from "./drawing";
import { Vec2, Vec3 } from "./geometry";
import { Face, Vertex } from "./types";
import { randomColour } from "./utils";

export const parseModel = (
  text: string
): { vertices: Vertex[]; faces: Face[] } => {
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
  return line
    .split(" ")
    .slice(1)
    .map((v) => parseInt(v) - 1);
};

const parseVertex = (line: string): Vertex => {
  // eg. v 0.608654 -0.568839 -0.416318
  const [x, y, z] = line
    .split(" ")
    .slice(1)
    .map((v) => parseFloat(v));
  return { x, y, z };
};

export const renderModel = (
  text: string,
  width: number,
  height: number,
  lightDirection: Vec3,
  canvasData: ImageData
) => {
  // Create drawing function
  const pen = drawingFactory(width, height, canvasData);

  const { faces, vertices } = parseModel(text);
  // Loop through faces and draw each triangle
  faces.forEach((face) => {
    const screenCoords: Vec2[] = [];
    const worldCoords: Vec3[] = [];
    for (let i = 0; i < 3; i++) {
      const v = new Vec3(vertices[face[i]].x, vertices[face[i]].y, vertices[face[i]].z);
      worldCoords.push(v);
      screenCoords.push(
        new Vec2(
          (v.x + 1) * width / 2,
          (v.y + 1) * height / 2
        )
      );
    }
    const n0 = worldCoords[2].clone().subtract(worldCoords[0].clone());
    const n1 = worldCoords[1].clone().subtract(worldCoords[0].clone());
    const normal = n0.crossProduct(n1).normalize();
    const intensity = normal.dotProduct(lightDirection);
    
    if (intensity > 0) triangle(pen, width, height, screenCoords, randomColour(intensity));
  });
};
