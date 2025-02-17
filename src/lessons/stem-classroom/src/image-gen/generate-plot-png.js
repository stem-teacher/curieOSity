import { JSDOM } from "jsdom";
import * as Plot from "@observablehq/plot";
import * as fs from "node:fs/promises";
import sharp from "sharp";

// Set up a minimal DOM.
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.document = dom.window.document;
global.window = dom.window;

/**
 * Since the latest Observable Plot doesn't provide a separate CSS file,
 * define a basic set of styles to render axes, gridlines, and text.
 */
async function fetchPlotCSS() {
  return `
     /* Minimal styling for Observable Plot v0.6+ */
     .plot-axis line,
     .plot-axis path,
     .plot-domain,
     .plot-tick line {
       stroke: black;
       stroke-width: 1;
     }
     .plot-tick text,
     .plot-label {
       font-family: sans-serif;
       font-size: 10px;
       fill: black;
     }
     .plot-grid line {
       stroke: #ccc;
       stroke-width: 1;
     }
     .plot-domain {
        fill: none;
        stroke: black;
        stroke-width: 1;
      }
      .plot-axis path {
        fill: none;
        stroke: black;
        stroke-width: 1;
      }
      .plot-rule { /* Style for manually added axis rules */
        stroke: black;
        stroke-width: 1;
        stroke-linecap: square; /* Optional: Square line ends for cleaner look */
      }
   `;
}

/**
 * Inline the CSS into the SVG by inserting a <style> block right after the opening <svg> tag.
 */
async function inlinePlotCSS(svgElem) {
  const cssText = await fetchPlotCSS();
  const serializer = new dom.window.XMLSerializer();
  let svgString = serializer.serializeToString(svgElem);
  svgString = svgString.replace(
    /<svg([^>]*)>/,
    `<svg$1><style>${cssText}</style>`,
  );
  return svgString;
}

async function generateBoyleSVGAndPNG() {
  const volume = Array.from({ length: 100 }, (_, i) => (i + 1) / 10);
  const data = volume.map((v) => ({ volume: v, pressure: 1 / v }));

  const boylesPlot = Plot.plot({
    caption:
      "Boyle's Law: Relationship between pressure and volume at constant temperature",
    width: 640,
    height: 400,
    x: { label: "Volume (V)" },
    y: { label: "Pressure (atm)" },
    marks: [
      Plot.ruleX([0], { y1: 400 }), // Manual x-axis line
      Plot.ruleY([0], { x1: 640 }), // Manual y-axis line
      Plot.line(data, { x: "volume", y: "pressure" }),
    ],
  });

  const svgElem = boylesPlot.querySelector("svg");
  if (!svgElem) throw new Error("No SVG element found in Boyle's plot.");

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log("Boyle SVG head:", svgWithCSS.slice(0, 100));

  await fs.writeFile("plot-boyles-law.svg", svgWithCSS);
  console.log("Generated plot-boyles-law.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-boyles-law.png", pngBuffer);
  console.log("Generated plot-boyles-law.png");
}

async function generateCharlesSVGAndPNG() {
  const temps = Array.from({ length: 100 }, (_, i) => i + 273.15);
  const data = temps.map((t) => ({ temperature: t, volume: (t * 2) / 273.15 }));

  const charlesPlot = Plot.plot({
    caption:
      "Charles' Law: Relationship between volume and temperature at constant pressure",
    width: 640,
    height: 400,
    x: { label: "Temperature (K)", range: [0, 640] }, // Explicit range, removed domain
    y: { label: "Volume (L)", range: [400, 0] }, // Explicit range (reversed for SVG), removed domain
    marks: [
      Plot.ruleX([0], { y1: 400 }),
      Plot.ruleY([0], { x1: 640 }),
      Plot.gridX(),
      Plot.gridY(),
      Plot.line(data, { x: "temperature", y: "volume" }),
    ],
  });

  const svgElem = charlesPlot.querySelector("svg");
  if (!svgElem) throw new Error("No SVG element found in Charles' plot.");

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log("Charles SVG head:", svgWithCSS.slice(0, 100));

  await fs.writeFile("plot-charles-law.svg", svgWithCSS);
  console.log("Generated plot-charles-law.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-charles-law.png", pngBuffer);
  console.log("Generated plot-charles-law.png");
}

async function generateGayLussacSVGAndPNG() {
  const temps = Array.from({ length: 100 }, (_, i) => i + 273.15);
  const data = temps.map((t) => ({
    temperature: t,
    pressure: (t * 1) / 273.15,
  }));

  const gayLussacPlot = Plot.plot({
    caption:
      "Gay-Lussac's Law: Relationship between pressure and temperature at constant volume",
    width: 640,
    height: 400,
    x: { label: "Temperature (K)", range: [0, 640] }, // Explicit range, removed domain
    y: { label: "Pressure (atm)", range: [400, 0] }, // Explicit range (reversed for SVG), removed domain
    marks: [
      Plot.ruleX([0], { y1: 400 }),
      Plot.ruleY([0], { x1: 640 }),
      Plot.gridX(),
      Plot.gridY(),
      Plot.line(data, { x: "temperature", y: "pressure" }),
    ],
  });

  const svgElem = gayLussacPlot.querySelector("svg");
  if (!svgElem) throw new Error("No SVG element found in Gay-Lussac's plot.");

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log("Gay-Lussac SVG head:", svgWithCSS.slice(0, 100));

  await fs.writeFile("plot-gay-lussacs-law.svg", svgWithCSS);
  console.log("Generated plot-gay-lussacs-law.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-gay-lussacs-law.png", pngBuffer);
  console.log("Generated plot-gay-lussacs-law.png");
}

async function main() {
  try {
    await Promise.all([
      generateBoyleSVGAndPNG(),
      generateCharlesSVGAndPNG(),
      generateGayLussacSVGAndPNG(),
    ]);
    console.log("All SVGs and PNGs generated.");
  } catch (err) {
    console.error("Error generating images:", err);
  }
}

main();
