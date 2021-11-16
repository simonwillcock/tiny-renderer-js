export const randomColour = (intensity?: number) => {
  const r = (intensity || Math.random()) * 255;
  const g = (intensity || Math.random()) * 255;
  const b = (intensity || Math.random()) * 255;
  return {r, g, b, a: 255};
}