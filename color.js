const fs = require('fs');
const path = require('path');

// Extract the filename from command line arguments
const fileName = process.argv[2]; // The filename will be the third argument (index 2)

if (!fileName) {
  console.error('Please provide a CSS file name.');
  process.exit(1);
}

const filePath = path.join(__dirname, fileName); // Use the provided filename

try {
  const css = fs.readFileSync(filePath, 'utf8');
  const colorMatches = css.match(/#[0-9A-Fa-f]{3,6}/g);

  // Using a Set to store unique colors
  const uniqueColors = new Set();

  if (colorMatches) {
    colorMatches.forEach(color => {
      // Check if the color is not already in the uniqueColors Set
      if (!uniqueColors.has(color)) {
        uniqueColors.add(color);
      }
    });

    console.log('Colors used in css file:');
    uniqueColors.forEach(color => {
      console.log(`\u2022 ${color}`); // Prints each color as a bullet point
    });
  } else {
    console.log('No colors found in the CSS file.');
  }
} catch (err) {
  console.error('Error reading the file:', err);
}
