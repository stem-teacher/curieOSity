import puppeteer from "puppeteer"; // Changed to ESM import
import fs from "node:fs/promises"; // Changed to ESM import

async function generateSVGWithPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Minimal HTML content with inline script to generate plots
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><title>SVG Plot Generation</title></head>
  <body>
    <div id="boyles-law-plot-container"></div>
    <div id="charles-law-plot-container"></div>
    <div id="gay-lussacs-law-plot-container"></div>

    <script type="module">
      import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

      // Boyle's Law Plot
      let volumeBoyle = Array.from({length: 100}, (_, i) => (i + 1) / 10);
      let dataBoyle = volumeBoyle.map(v => ({ volume: v, pressure: 1 / v }));
      const boylesPlot = Plot.plot({
        caption: "Boyle's Law: Relationship between pressure and volume at constant temperature",
        x: {label: "Volume (V)"},
        y: {label: "Pressure (atm)"},
        marks: [Plot.line(dataBoyle, {x: "volume", y: "pressure"})]
      });
      document.getElementById('boyles-law-plot-container').appendChild(boylesPlot);
      window.boylesLawSVG = boylesPlot.outerHTML; // Store SVG string in global window object

      // Charles' Law Plot
      let tempsCharles = Array.from({length: 100}, (_, i) => i + 273.15);
      let dataCharles = tempsCharles.map(t => ({ temperature: t, volume: (t * 2) / 273.15 }));
      const charlesPlot = Plot.plot({
        caption: "Charles' Law: Relationship between volume and temperature at constant pressure",
        x: {label: "Temperature (K)", domain: [273.15, 373.15]},
        y: {label: "Volume (L)", domain: [2, 3]},
        marks: [Plot.line(dataCharles, {x: "temperature", y: "volume"})]
      });
      document.getElementById('charles-law-plot-container').appendChild(charlesPlot);
      window.charlesLawSVG = charlesPlot.outerHTML;

      // Gay-Lussac's Law Plot
      let tempsGayLussac = Array.from({length: 100}, (_, i) => i + 273.15);
      let dataGayLussac = tempsGayLussac.map(t => ({ temperature: t, pressure: (t * 1) / 273.15 }));
      const gayLussacPlot = Plot.plot({
        caption: "Gay-Lussac's Law: Relationship between pressure and temperature at constant volume",
        x: {label: "Temperature (K)", domain: [273.15, 373.15]},
        y: {label: "Pressure (atm)", domain: [1, 1.5]},
        marks: [Plot.line(dataGayLussac, {x: "temperature", y: "pressure"})]
      });
      document.getElementById('gay-lussacs-law-plot-container').appendChild(gayLussacPlot);
      window.gayLussacSVG = gayLussacPlot.outerHTML;

    </script>
  </body>
  </html>
  `;

  await page.setContent(htmlContent); // Set the HTML content

  // Wait for a short delay to ensure plots are rendered (adjust if needed)
  await new Promise((r) => setTimeout(r, 2000)); // Wait for 2 seconds

  // Extract SVG strings from the browser's window object
  const svgStrings = await page.evaluate(() => {
    return {
      boylesLawSVG: window.boylesLawSVG,
      charlesLawSVG: window.charlesLawSVG,
      gayLussacSVG: window.gayLussacSVG,
    };
  });

  await fs.writeFile("boyles-law-plot.svg", svgStrings.boylesLawSVG);
  await fs.writeFile("charles-law-plot.svg", svgStrings.charlesLawSVG);
  await fs.writeFile("gay-lussac-plot.svg", svgStrings.gayLussacSVG);

  await browser.close();
  console.log("SVG plots generated using Puppeteer.");
}

generateSVGWithPuppeteer();
