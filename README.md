# GLB to BUF Conversion Script

This script optimizes a GLB file and converts it into a BUF file. It uses Node.js along with the `fs`, `path`, `gltf-pipeline`, and `yargs` packages.

Below is the import of the forms required for proper operation.

## Modules

```const fs = require('fs');
const path = require('path');
const gltfPipeline = require('gltf-pipeline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
```

## Command-Line Arguments Configuration

* `input` (`-i`): Path to the input GLB file.
* `output` (`-o`): Path to the optimized output GLB file.
* `buf` (`-b`): Path to the output BUF file.

```
const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    description: 'Path to the input GLB file',
    type: 'string',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    description: 'Path to the output optimized GLB file',
    type: 'string',
    demandOption: true
  })
  .option('buf', {
    alias: 'b',
    description: 'Path to the output BUF file',
    type: 'string',
    demandOption: true
  })
  .help()
  .alias('help', 'h')
  .argv;
 ```
## File Paths

Uses the `path` module to resolve absolute paths for the input and output files.

```
const inputFilePath = path.resolve(__dirname, argv.input);
const optimizedFilePath = path.resolve(__dirname, argv.output);
const bufFilePath = path.resolve(__dirname, argv.buf);
```
## Function to Optimize the GLB File

This function reads the input GLB file, optimizes it using gltfPipeline with Draco compression options, and saves the result.'

```
async function optimizeGLB() {
  const glbData = fs.readFileSync(inputFilePath);
  const options = {
    dracoOptions: {
      compressionLevel: 10,
    },
  };

  const optimizedData = await gltfPipeline.processGlb(glbData, options);
  fs.writeFileSync(optimizedFilePath, optimizedData.glb);
  console.log('Optimized file saved as', optimizedFilePath);
}
```

## Function to Convert to BUF

This function reads the optimized GLB file and saves it as a BUF file.

```
function convertToBuf() {
  const glbData = fs.readFileSync(optimizedFilePath);
  fs.writeFileSync(bufFilePath, glbData);
  console.log('Converted file saved as', bufFilePath);
}

```

## Main Function

The main function runs the GLB optimization and then converts it to a BUF file.

```
async function optimizeAndConvert() {
  await optimizeGLB();
  convertToBuf();
}

optimizeAndConvert();
```

## Running the Script

Run the script from the command line, providing the paths for the input and output files.

```
node script.js --input path/to/input/file.glb --output path/to/optimized/file.glb --buf path/to/output/file.buf

```


