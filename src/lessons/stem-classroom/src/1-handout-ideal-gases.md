---
title: Technology enhance and/or limit scientific investigation
theme: dashboard
toc: true
---

```js
import katex from "npm:katex"
import 'katex/dist/contrib/mhchem.min.js';
import * as Plot from "@observablehq/plot"
import {resize} from "@observablehq/stdlib" // Assuming you intend to use resize from stdlib
```

# Inquiry question
## How does technology enhance and/or limit scientific investigation?

• Design a practical investigation that uses available technologies to measure both the independent and dependent variables that produce quantitative data to measure the effect of changes of, including but not limited to:
- Temperature on reaction rate
- Temperature on volume of gas

## What is an Ideal Gas?
An ideal gas is a theoretical construct that simplifies our understanding of gases. It helps describe gas behavior in a way that closely approximates real-world scenarios.

### Assumptions of an Ideal Gas
- **No Interactions Between Particles**: The gas particles do not exert forces on each other, unlike real gases where intermolecular forces exist.
- **Negligible Volume of Particles**: The individual molecules occupy no space, although in reality, their volume is small compared to the total gas volume.

These assumptions allow for useful simplifications when studying gases.

## Describing Ideal Gases
We can describe an ideal gas using four key variables:
- **Volume (V)** - Space occupied by the gas.
- **Pressure (P)** - Force exerted by gas particles per unit area.
- **Temperature (T)** - Must be measured in Kelvin for gas calculations.
- **Amount of Gas (n)** - Measured in moles.

## Representation of Gas Laws

### Boyle's Law: Relationship between pressure and volume at constant temperature]
```tex
PV = k_1 \quad \text{(at constant } T, n\text{)}
```

```js
const volume = Array.from({ length: 100 }, (_, i) => (i + 1) / 10);
const data = volume.map((v) => ({ volume: v, pressure: 1 / v }));

display(Plot.plot({
  caption:
    "Boyle's Law: Relationship between pressure and volume at constant temperature",
  width: 640,
  height: 400,
  x: { label: "Volume (V)" },
  y: { label: "Pressure (atm)" },
  marks: [
    Plot.line(data, { x: "volume", y: "pressure" }),
  ],
}))
```

### Charles' Law: Relationship between volume and temperature at constant pressure
```tex
V \propto T \quad \text{(at constant } P, n\text{)}
```
```js

let temps = Array.from({length: 100}, (_, i) => i + 273.15); // Temperature in Kelvin
let data = temps.map(t => ({
  temperature: t,
  volume: (t * 2) / 273.15  // Initial volume = 2L at 273.15K (0°C)
}));

display(Plot.plot({
  grid: true,
  width: 640,
  height: 400,
  x: {
    label: "Temperature (K)",
    domain: [273.15, 373.15]  // 0°C to 100°C
  },
  y: {
    label: "Volume (L)",
    domain: [2, 3]
  },
  marks: [
    Plot.line(data, {
      x: "temperature",
      y: "volume"
    })
  ]
}))
```

### Gay-Lussac's Law: Relationship between pressure and temperature at constant volume
```tex
\frac{P_1}{T_1} = \frac{P_2}{T_2}
```

```js
let temps = Array.from({length: 100}, (_, i) => i + 273.15);
let data = temps.map(t => ({
  temperature: t,
  pressure: (t * 1) / 273.15  // Initial pressure = 1 atm at 273.15K (0°C)
}));

display(Plot.plot({
  grid: true,
  width: 640,
  height: 400,
  x: {
    label: "Temperature (K)",
    domain: [273.15, 373.15]  // 0°C to 100°C
  },
  y: {
    label: "Pressure (atm)",
    domain: [1, 1.5]
  },
  marks: [
    Plot.line(data, {
      x: "temperature",
      y: "pressure"
    })
  ]
}))
```
## Derivation of the Ideal Gas Law
We combine the individual gas laws to derive the ideal gas equation:

### Avogadro's Law
```tex
V \propto n \quad \text{(at constant } P, T\text{)}
```

By combining these laws, we get:
```tex
V \propto \frac{nT}{P}
```

Introducing the proportionality constant *R* (the ideal gas constant), we obtain:

```tex
PV = nRT
```

This equation is fundamental in chemistry and physics, allowing us to predict and analyze gas behavior under different conditions.

## Simulations

[Ideal Gas Simulation](https://phet.colorado.edu/en/simulations/gas-properties)

[Physics Class Room](https://www.physicsclassroom.com/Physics-Interactives/Chemistry/Ideal-Gas-Behavior/Interactive)

## Conclusion
The Ideal Gas Law provides a crucial tool for understanding gases by simplifying real-world complexities. While real gases may deviate under extreme conditions, the assumptions of ideal gases are useful for many practical applications.
