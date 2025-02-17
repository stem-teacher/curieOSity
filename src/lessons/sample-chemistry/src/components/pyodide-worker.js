// pyodide-worker.js
importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");

async function initializePyodide() {
  self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage(["numpy", "pandas"]);
}

let pyodideReadyPromise = initializePyodide();

self.onmessage = async (event) => {
  await pyodideReadyPromise;

  const { cmd, code } = event.data;

  if (cmd === "run") {
    try {
      const result = await self.pyodide.runPythonAsync(code);
      self.postMessage(result);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  }
};
