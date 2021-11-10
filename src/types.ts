export interface Coordinates {
  x: number
  y: number
};

export interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

export type DrawingFunction = (coords: Coordinates, rgba: RGBA) => void
export type DrawingFactory = (width: number, height: number, canvasData: ImageData) => DrawingFunction;
