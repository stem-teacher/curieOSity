import * as fs from 'node:fs/promises';

async function testFileWriter() {
  const testData = "This is a test string to write to a file.";
  const testFilePath = "images/test-file.txt"; // Try writing to images/ again

  try {
    await fs.mkdir('images', { recursive: true }); // Ensure directory exists
    await fs.writeFile(testFilePath, testData, 'utf-8');
    console.log(`Successfully wrote to: ${testFilePath}`);
  } catch (error) {
    console.error(`Error writing to ${testFilePath}:`, error);
  }
}

testFileWriter();
