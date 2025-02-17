// index.js
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { Runtime, Inspector } from "npm:@observablehq/runtime";
import { stdlib } from "npm:@observablehq/stdlib";

// Define your Python integration
const pyodideWorker = new Worker("pyodide-worker.js");

// Create a runtime with the standard library
const runtime = new Runtime(Object.assign({}, stdlib));

// Define your main module
const main = runtime.module();

// Add your Python computation
main.variable().define("pythonData", async () => {
  // Send message to Pyodide worker
  pyodideWorker.postMessage({
    cmd: "run",
    code: `
import numpy as np
import pandas as pd

# Generate data
x = np.linspace(0, 10, 100)
y = 2 * x + np.random.normal(0, 1, 100)

pd.DataFrame({'x': x, 'y': y}).to_json(orient='records')
    `,
  });

  // Wait for response
  const response = await new Promise((resolve) => {
    pyodideWorker.onmessage = (event) => resolve(event.data);
  });

  return JSON.parse(response);
});

// Create your visualization
main.variable().define("chart", ["pythonData"], async (data) => {
  const chart = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: "x",
        y: "y",
        stroke: "steelblue",
      }),
    ],
    grid: true,
    height: 640,
    margin: 40,
  });

  return chart;
});

// Mount to DOM
const container = document.getElementById("viz-container");
main.value("chart").then((chart) => {
  container.appendChild(chart);
});
