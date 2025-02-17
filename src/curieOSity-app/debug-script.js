const path = require('path');
const fs = require('fs');

console.log("--- DEBUG INFO SCRIPT START ---");

// 1. Output File Paths
console.log("\n--- 1. File Paths ---");
const projectRoot = __dirname; // Project root directory (where debug-script.js is located)
const srcDir = path.join(projectRoot, 'src');
const nodeModulesDir = path.join(srcDir, 'node_modules');
const katexCSSPath = path.join(nodeModulesDir, 'katex', 'dist', 'katex.min.css');

console.log("Project Root Directory:", projectRoot);
console.log("Src Directory:", srcDir);
console.log("index.html Path:", path.join(srcDir, 'src', 'index.html'));
console.log("styles.css Path:", path.join(srcDir, 'src', 'styles.css'));
console.log("script.js Path:", path.join(srcDir, 'src', 'script.js'));
console.log("katex.min.css Path (Expected):", katexCSSPath);

// 2. Check node_modules Existence
console.log("\n--- 2. node_modules Existence ---");
const nodeModulesExists_Src = fs.existsSync(nodeModulesDir);
const nodeModulesExists_ProjectRoot = fs.existsSync(path.join(projectRoot, 'node_modules')); // Check in project root too, just in case
console.log("node_modules exists in src/:", nodeModulesExists_Src);
console.log("node_modules exists in project root:", nodeModulesExists_ProjectRoot);


// 3. Output File Contents
console.log("\n--- 3. File Contents ---");
const filesToRead = [
    path.join(srcDir, 'index.html'),
    path.join(srcDir, 'styles.css'),
    path.join(srcDir, 'script.js'),
    path.join(srcDir, 'package.json'), // In src directory
    katexCSSPath // katex.min.css content - already absolute path
];

filesToRead.forEach(filepath => {
    const filename = path.basename(filepath); // Get just the filename for output
    console.log(`\n--- Content of: ${filename} ---`);
    try {
        const content = fs.readFileSync(filepath, 'utf8');
        console.log(content);
    } catch (error) {
        console.log(`Error reading ${filename}: ${error.message}`);
        console.log("File likely does not exist or cannot be accessed.");
    }
});

// 4. Output OS and Node.js Versions
console.log("\n--- 4. System Info ---");
console.log("Operating System:", process.platform);
console.log("Node.js Version:", process.version);


console.log("\n--- DEBUG INFO SCRIPT END ---");
