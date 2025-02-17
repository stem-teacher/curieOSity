const path = require('path');
const fs = require('fs');

console.log("--- DEBUG INFO SCRIPT V4 START ---");

// 1. Output File Paths (Assuming NEW Project Root)
console.log("\n--- 1. File Paths (V4 - NEW Project Root) ---");
// **CHANGED: Explicitly define projectRoot to your NEW root directory:**
const projectRoot = path.join(__dirname, 'src'); // Assuming debug-script-v4.js is in 'curieOSity-app' dir, and root is parent
const curieOSityAppDir = __dirname; // <--- New: Explicitly define CurieOSity App directory
const srcDir = path.join(projectRoot, 'src'); // src dir is now *under* the new project root (which is 'src' above)
const assetsDir = path.join(srcDir, 'assets');
const lessonsDir = path.join(srcDir, 'lessons');
const nodeModulesDir = path.join(srcDir, 'node_modules');
const katexCSSPath = path.join(nodeModulesDir, 'katex', 'dist', 'katex.min.css');

console.log("Project Root Directory (NEW):", projectRoot); // <--- NEW: Log NEW Project Root
console.log("CurieOSity App Directory:", curieOSityAppDir); // <--- NEW: Log CurieOSity App Directory
console.log("Src Directory (under NEW Root):", srcDir);
console.log("Assets Directory (under NEW Src):", assetsDir);
console.log("Lessons Directory (under NEW Src):", lessonsDir);
console.log("node_modules Directory (under NEW Src):", nodeModulesDir);

console.log("index.html Path:", path.join(srcDir, 'index.html'));
console.log("styles.css Path:", path.join(srcDir, 'styles.css'));
console.log("script.js Path:", path.join(srcDir, 'script.js'));
console.log("katex.min.css Path (Expected):", katexCSSPath);

// 2. Check Key Directory Existence (V4 - Adjusted for NEW Root)
console.log("\n--- 2. Key Directory Existence (V4 - Adjusted) ---");
const srcDirExists = fs.existsSync(srcDir);
const assetsDirExists = fs.existsSync(assetsDir);
const lessonsDirExists = fs.existsSync(lessonsDir);
const nodeModulesExists_Src = fs.existsSync(nodeModulesDir);

console.log("Src directory exists (under NEW Root):", srcDirExists);
console.log("Assets directory exists (under NEW Src):", assetsDirExists);
console.log("Lessons directory exists (under NEW Src):", lessonsDirExists);
console.log("node_modules exists in src/ (under NEW Root):", nodeModulesExists_Src);


// 3. Output File Contents (V4 - Adjusted Paths for NEW Root)
console.log("\n--- 3. File Contents (V4 - Adjusted Paths) ---");
const filesToRead = [
    path.join(srcDir, 'index.html'),
    path.join(srcDir, 'styles.css'),
    path.join(srcDir, 'script.js'),
    path.join(srcDir, 'package.json'), // In src directory (under NEW Root)
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
        console.log("File likely does not exist or cannot be accessed at:", filepath);
    }
});

// 4. Output OS and Node.js Versions
console.log("\n--- 4. System Info ---");
console.log("Operating System:", process.platform);
console.log("Node.js Version:", process.version);


console.log("\n--- DEBUG INFO SCRIPT V4 END ---");
