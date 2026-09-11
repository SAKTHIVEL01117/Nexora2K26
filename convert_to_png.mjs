import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const convertSvgToPng = (svgPath, pngPath, width) => {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`Successfully converted ${svgPath} to ${pngPath}`);
};

try {
  convertSvgToPng(path.resolve('public/nexora.svg'), path.resolve('public/nexora.png'), 800);
  convertSvgToPng(path.resolve('public/hitech.svg'), path.resolve('public/hitech.png'), 600);
} catch (err) {
  console.error('Conversion error:', err);
}
