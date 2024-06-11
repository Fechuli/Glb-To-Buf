const fs = require('fs');
const path = require('path');
const gltfPipeline = require('gltf-pipeline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

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

const inputFilePath = path.resolve(__dirname, argv.input);
const optimizedFilePath = path.resolve(__dirname, argv.output);
const bufFilePath = path.resolve(__dirname, argv.buf);

async function optimizeGLB() {
  const glbData = fs.readFileSync(inputFilePath);
  const options = {
    dracoOptions: {
      compressionLevel: 10,
    },
  };

  const optimizedData = await gltfPipeline.processGlb(glbData, options);
  fs.writeFileSync(optimizedFilePath, optimizedData.glb);
  console.log('File ottimizzato salvato come', optimizedFilePath);
}

function convertToBuf() {
  const glbData = fs.readFileSync(optimizedFilePath);
  fs.writeFileSync(bufFilePath, glbData);
  console.log('File convertito salvato come', bufFilePath);
}

async function optimizeAndConvert() {
  await optimizeGLB();
  convertToBuf();
}

optimizeAndConvert();
