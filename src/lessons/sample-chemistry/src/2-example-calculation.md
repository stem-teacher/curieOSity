---
theme: dashboard
title: Data Science Demo
---

# Interactive Data Science Demo

```js
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

const noiseLevel = view(Inputs.range([0, 5], {
  label: "Noise Level",
  step: 0.1,
  value: 1
}));

const sampleSize = view(Inputs.select([
  ["50"],
  ["200"],
  ["500"]
], {
  label: "Sample Size",
  value: "50"
}));

```
```js
function generateData(n, noise) {
  const points = Array.from({length: parseInt(n)}, (_, i) => {
    const x = (i * 10) / parseInt(n);
    const yTrue = 2 * x + 1;
    const yObs = yTrue + (Math.random() - 0.5) * parseFloat(noise);
    return {x, yTrue, yObs};
  });
  return points;
}

const data = generateData(sampleSize, noiseLevel);
```

```js
const chartData = data;
console.log("Chart data:", chartData); // Debug log

const chart = Plot.plot({
  marginTop: 20,
  marginRight: 30,
  marginBottom: 30,
  marginLeft: 40,
  grid: true,
  height: 400,
  width: 800,
  x: {
    label: "X Value → ",
    nice: true
  },
  y: {
    label: "Y Value → ",
    nice: true
  },
  marks: [
    Plot.line(chartData, {
      x: d => d.x,
      y: d => d.yTrue,
      stroke: "green",
      strokeWidth: 2,
      strokeDasharray: "5,5"
    }),
    Plot.dot(chartData, {
      x: d => d.x,
      y: d => d.yObs,
      fill: "blue",
      fillOpacity: 0.5,
      r: 3
    })
  ]
});

display(chart)
```

```js
function getStats(data) {
  if (!data || data.length === 0) return {
    correlation: "N/A",
    slope: "N/A",
    intercept: "N/A",
    r_squared: "N/A"
  };

  const n = data.length;
  const xs = data.map(d => d.x);
  const ys = data.map(d => d.yObs);

  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;

  const ssxy = xs.reduce((sum, x, i) =>
    sum + (x - xMean) * (ys[i] - yMean), 0);
  const ssxx = xs.reduce((sum, x) =>
    sum + (x - xMean) ** 2, 0);
  const ssyy = ys.reduce((sum, y) =>
    sum + (y - yMean) ** 2, 0);

  const slope = ssxy / ssxx;
  const intercept = yMean - slope * xMean;
  const r = ssxy / Math.sqrt(ssxx * ssyy);

  return {
    correlation: r.toFixed(3),
    slope: slope.toFixed(3),
    intercept: intercept.toFixed(3),
    r_squared: (r * r).toFixed(3)
  };
}

const stats = getStats(data);
```

```js
const summary = `
- Correlation: ${stats.correlation}
- Slope: ${stats.slope}
- Intercept: ${stats.intercept}
- R-squared: ${stats.r_squared}
`;
```

### Statistical Summary
${summary}

## How it Works

1. The **Noise Level** slider controls the amount of random variation in the data
2. **Sample Size** determines how many points to generate
3. The green dashed line shows the true relationship (y = 2x + 1)
4. Blue dots show the observed data with added noise
5. Statistics update automatically as you adjust the controls

Try changing the noise level and sample size to see how they affect our ability to detect the underlying pattern!
