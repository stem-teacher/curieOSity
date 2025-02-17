const path = require('path');
const fs = require('fs');

function fixNestedAppDirStructure() {
  console.log("--- STARTING NESTED APP DIR STRUCTURE FIX SCRIPT ---");

  const projectRoot = __dirname; // Directory where this script is located (project root)
  const nestedAppDir = path.join(projectRoot, 'src', 'curieOSity-app'); // <-- Adjusted to target 'curieOSity-app'
  const correctSrcDir = path.join(projectRoot, 'src');
  const cargoTomlPath = path.join(nestedAppDir, 'Cargo.toml'); // <-- Adjusted Cargo.toml path - assuming it's inside curieOSity-app


  const filesToMove = [
    'index.html',
    'styles.css',
    'script.js',
    'package.json',
    'node_modules',
    'assets',
    'lessons' // <-- Keeping 'lessons' in case it ended up inside curieOSity-app by mistake
  ];

  // 1. Check if the nested curieOSity-app directory exists
  if (!fs.existsSync(nestedAppDir)) {
    console.log(`Error: Directory "${nestedAppDir}" does not exist. It seems your file structure is not nested under "curieOSity-app", or something is wrong.`);
    console.log("--- NESTED APP DIR STRUCTURE FIX SCRIPT ABORTED ---");
    return; // Stop if nested curieOSity-app doesn't exist
  }

  console.log(`Moving files from: "${nestedAppDir}" to "${correctSrcDir}"`);

  // 2. Check and warn if Cargo.toml is in the nested directory (we won't move it in this script)
  if (fs.existsSync(cargoTomlPath)) {
    console.warn(`Warning: Cargo.toml found in "${cargoTomlPath}". This script is NOT designed to move Cargo.toml. Ensure Cargo.toml remains in the project root: "${projectRoot}"`);
    console.warn("If your app fails to build, you might need to manually move Cargo.toml to the project root.");
  }

  // 3. Move each frontend file/folder from nested curieOSity-app to correct src
  for (const filename of filesToMove) {
    const sourcePath = path.join(nestedAppDir, filename);
    const destinationPath = path.join(correctSrcDir, filename);

    try {
      if (fs.existsSync(sourcePath)) { // Check if source exists before moving
        fs.renameSync(sourcePath, destinationPath);
        console.log(`Moved: "${filename}" from "${nestedAppDir}" to "${correctSrcDir}"`);
      } else {
        console.warn(`Warning: Source path "${sourcePath}" does not exist. Skipping: "${filename}"`);
      }
    } catch (moveError) {
      console.error(`Error moving "${filename}": ${moveError.message}`);
      console.error("Please check file permissions or if the file exists.");
      console.log("--- NESTED APP DIR STRUCTURE FIX SCRIPT ABORTED WITH ERRORS ---");
      return; // Abort if moving any file fails
    }
  }

  // 4. (Optional) - We are NOT deleting the curieOSity-app directory in this version, as it might contain important files besides the frontend. You can manually delete it if it's empty after running the script and you are sure it's safe to delete.
  console.warn(`Note: The script is NOT deleting the "${nestedAppDir}" directory. Please check if it's empty and delete it manually if needed and if you are sure it's safe.`);


  console.log("--- NESTED APP DIR STRUCTURE FIX SCRIPT COMPLETED SUCCESSFULLY ---");
  console.log("Please run 'cargo tauri dev' again to start your Tauri app and check if the issue is resolved.");
  console.log("No alert box in this script version. Please check the console output for completion message.");
}

fixNestedAppDirStructure();
