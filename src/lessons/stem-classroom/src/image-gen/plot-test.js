import { JSDOM } from "jsdom";
import * as Plot from "@observablehq/plot";
import * as fs from "node:fs/promises";
import sharp from "sharp";

// Set up a minimal DOM.
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.document = dom.window.document;
global.window = dom.window;

/**
 * CSS styles - Corrected selectors, with grid styles and rule styles.
 */
async function fetchPlotCSS() {
  return `
     /* Minimal styling for Observable Plot v0.6+ - FINAL with Grids and Rules */
     .plot-axis line,
     .plot-axis path,
     .plot-domain,
     .plot-tick line {
       stroke: #000;
       stroke-width: 1;
     }
     .plot-tick text,
     .plot-label {
       font-family: sans-serif;
       font-size: 10px;
       fill: #000;
     }
     .plot-grid line {
       stroke: #ccc;
       stroke-width: 1;
     }
     .plot-domain { /* Style for plot-domain (axis lines) */
        fill: none;
        stroke: #000;
        stroke-width: 1;
      }
      .plot-axis path { /* Style for plot-axis path (axis lines) - redundant but safe */
        fill: none;
        stroke: #000;
        stroke-width: 1;
      }
      .plot-rule { /* Style for manually added axis rules */
        stroke: #000;
        stroke-width: 1;
        stroke-linecap: square;
      }
   `;
}

/**
 * Inline the CSS into the SVG.
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
    x: { label: "Volume (V)" }, // No domain or range for Boyle's for now
    y: { label: "Pressure (atm)" }, // No domain or range for Boyle's for now
    marks: [
      Plot.ruleX([0], { y1: 400 }), // Manual x-axis line
      Plot.ruleY([0], { x1: 640 }), // Manual y-axis line
      Plot.gridX(), // Grid lines - X
      Plot.gridY(), // Grid lines - Y
      Plot.line(data, { x: "volume", y: "pressure" }), // Data line
    ],
  });

  const figureElem = boylesPlot;
  const svgElem = figureElem.querySelector("svg");

  if (!svgElem) {
    throw new Error("No SVG element found within figure in Boyle's plot.");
  }

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log(
    "Boyle SVG head (final - domain+range):",
    svgWithCSS.slice(0, 100),
  );

  await fs.writeFile("plot-boyles-law-final.svg", svgWithCSS);
  console.log("Generated plot-boyles-law-final.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-boyles-law-final.png", pngBuffer);
  console.log("Generated plot-boyles-law-final.png");
}

async function generateCharlesSVGAndPNG() {
  const temps = Array.from({ length: 100 }, (_, i) => i + 273.15);
  const data = temps.map((t) => ({ temperature: t, volume: (t * 2) / 273.15 }));

  const charlesPlot = Plot.plot({
    caption:
      "Charles' Law: Relationship between volume and temperature at constant pressure",
    width: 640,
    height: 400,
    x: { label: "Temperature (K)", domain: [273.15, 373.15], range: [0, 640] }, // Domain RE-INTRODUCED, range KEPT
    y: { label: "Volume (L)", domain: [2, 3], range: [400, 0] }, // Domain RE-INTRODUCED, range KEPT
    marks: [
      Plot.ruleX([0], { y1: 400 }),
      Plot.ruleY([0], { x1: 640 }),
      Plot.gridX(),
      Plot.gridY(),
      Plot.line(data, { x: "temperature", y: "volume" }),
    ],
  });

  const figureElem = charlesPlot;
  const svgElem = figureElem.querySelector("svg");

  if (!svgElem) {
    throw new Error("No SVG element found within figure in Charles' plot.");
  }

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log(
    "Charles SVG head (final - domain+range):",
    svgWithCSS.slice(0, 100),
  );

  await fs.writeFile("plot-charles-law-final.svg", svgWithCSS);
  console.log("Generated plot-charles-law-final.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-charles-law-final.png", pngBuffer);
  console.log("Generated plot-charles-law-final.png");
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
    x: { label: "Temperature (K)", domain: [273.15, 373.15], range: [0, 640] }, // Domain RE-INTRODUCED, range KEPT
    y: { label: "Pressure (atm)", domain: [1, 1.5], range: [400, 0] }, // Domain RE-INTRODUCED, range KEPT
    marks: [
      Plot.ruleX([0], { y1: 400 }),
      Plot.ruleY([0], { x1: 640 }),
      Plot.gridX(),
      Plot.gridY(),
      Plot.line(data, { x: "temperature", y: "pressure" }),
    ],
  });

  const figureElem = gayLussacPlot;
  const svgElem = figureElem.querySelector("svg");

  if (!svgElem) {
    throw new Error("No SVG element found within figure in Gay-Lussac's plot.");
  }

  const svgWithCSS = await inlinePlotCSS(svgElem);
  console.log(
    "Gay-Lussac SVG head (final - domain+range):",
    svgWithCSS.slice(0, 100),
  );

  await fs.writeFile("plot-gay-lussacs-law-final.svg", svgWithCSS);
  console.log("Generated plot-gay-lussacs-law-final.svg");

  const pngBuffer = await sharp(Buffer.from(svgWithCSS)).png().toBuffer();
  await fs.writeFile("plot-gay-lussacs-law-final.png", pngBuffer);
  console.log("Generated plot-gay-lussacs-law-png");
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
