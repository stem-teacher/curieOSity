const path = require('path');
const fs = require('fs').promises; // Use fs.promises for async operations

async function correctFileStructure() {
  try {
    console.log("--- STARTING FILE STRUCTURE CORRECTION SCRIPT ---");

    const projectRoot = __dirname; // Directory where this script is located (project root)
    const doubleSrcDir = path.join(projectRoot, 'src', 'src');
    const correctSrcDir = path.join(projectRoot, 'src');

    const filesToMove = [
      'index.html',
      'styles.css',
      'script.js'
    ];

    // 1. Check if the double-src directory exists
    const doubleSrcDirExists = fs.existsSync(doubleSrcDir);
    if (!doubleSrcDirExists) {
      console.log(`Error: Directory "${doubleSrcDir}" does not exist. It seems the file structure is already correct, or something is wrong.`);
      console.log("--- FILE STRUCTURE CORRECTION SCRIPT ABORTED ---");
      return; // Stop the script if the directory doesn't exist
    }

    console.log(`Moving files from: "${doubleSrcDir}" to "${correctSrcDir}"`);

    // 2. Move each file
    for (const filename of filesToMove) {
      const sourcePath = path.join(doubleSrcDir, filename);
      const destinationPath = path.join(correctSrcDir, filename);

      try {
        await fs.rename(sourcePath, destinationPath);
        console.log(`Moved: "${filename}" from "${doubleSrcDir}" to "${correctSrcDir}"`);
      } catch (moveError) {
        console.error(`Error moving "${filename}": ${moveError.message}`);
        console.error("Please check file permissions or if the file exists.");
        console.log("--- FILE STRUCTURE CORRECTION SCRIPT ABORTED WITH ERRORS ---");
        return; // Abort if moving any file fails
      }
    }

    // 3. Delete the (now empty) double-src directory
    try {
      await fs.rmdir(doubleSrcDir);
      console.log(`Deleted empty directory: "${doubleSrcDir}"`);
    } catch (deleteError) {
      console.warn(`Warning: Could not delete directory "${doubleSrcDir}". It might already be deleted or there might be permissions issues: ${deleteError.message}`);
    }

    console.log("--- FILE STRUCTURE CORRECTION SCRIPT COMPLETED SUCCESSFULLY ---");
    console.log("Please run 'cargo tauri dev' again to start your Tauri app and check if the issue is resolved.");
    alert("File structure correction completed. Please check the console output for details and run 'cargo tauri dev'."); // Alert to notify completion

  } catch (mainError) {
    console.error("An error occurred during file structure correction:", mainError);
    alert("File structure correction failed. Please check the console output for errors.");
  }
}

correctFileStructure();
