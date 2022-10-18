import ColorThief from "colorthief";

export default function getDominantColor(image: string): Promise<string> {
  const colorThief = new ColorThief();

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    img.onload = () => {
      const result = colorThief.getColor(img, 25);
      const rgb = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
      resolve(rgb);
    };
  });
}
