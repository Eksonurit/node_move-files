/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const fs = require('fs/promises');
const path = require('node:path');

const sourceFile = process.argv[2];
const destination = process.argv[3];

if (process.argv.length <= 2) {
  console.error('Zero argument is provided');
  process.exit(0);
}

if (process.argv.length === 3) {
  console.error('Only one argument is provided');
  process.exit(0);
}

const filePath = path.join(destination, path.basename(sourceFile));

async function move(file, to, fullPath) {
  try {
    const sourceContent = await fs.readFile(`./${file}`, 'utf-8');

    let isDirectory = false;

    try {
      const stats = await fs.stat(to);

      isDirectory = stats.isDirectory();
    } catch {
      isDirectory = false;
    }

    if (isDirectory) {
      await fs.writeFile(fullPath, sourceContent);
      await fs.unlink(file);
    } else {
      await fs.rename(file, to);
    }
  } catch (err) {
    console.error(err);
  }
}

move(sourceFile, destination, filePath);
