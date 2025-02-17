import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
Object.defineProperty(global, "navigator", { value: dom.window.navigator, writable: true, configurable: true });

import * as Plot from "@observablehq/plot";
import * as fs from 'node:fs/promises';

async function generateBoylePNG() {
  const boylesPlot = Plot.plot({ marks: [Plot.dot([{x: 1, y: 1}])] }); // Minimal dot plot
  const svgString = boylesPlot.outerHTML;
  const canvas = dom.window.document.createElement('canvas');
  const context = canvas.getContext('2d');
  const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  const image = new dom.window.Image();

  image.onload = async () => {
    canvas.width = 640; canvas.height = 400;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pngBuffer = Buffer.from(canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''), 'base64');

    const absoluteImagePathBoyle = "/Users/philiphaynes/devel/teaching/projects/stem-tech/src/lessons/stem-classroom/images/test-boyle-plot.png"; // <-- ADJUST ABSOLUTE PATH
    await fs.writeFile(absoluteImagePathBoyle, pngBuffer)
      .then(() => console.log("Generated test-boyle-plot.png"))
      .catch(error => console.error("Error writing test-boyle-plot.png:", error));
    console.log("pngBuffer for Boyle Test:", pngBuffer); // Log pngBuffer
  };
  image.onerror = (error) => console.error("SVG load error:", error);
  image.src = svgDataUri;
}

generateBoylePNG().catch(console.error);
