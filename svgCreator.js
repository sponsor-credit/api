import sharp from "sharp";
import axios from "axios";

export function renderSVGArray(svgArray, width, height) {
  const startSvg = `
  <style xmlns="http://www.w3.org/2000/svg">
    .atag {
      cursor: pointer;
    }
    .pfp{
      border-radius:50%;
    }
  </style>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="${width}" height="${height}">`;
  let svgArr = [startSvg, ...svgArray, `</svg>`];
  return svgArr.join("");
}

export function getImageRoundSvgText(
  linkTo,
  b64data,
  name,
  x,
  y,
  width,
  height
) {
  return `<a class="atag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${linkTo}" id="${name}">
      
        <image x='${x}' y='${y}' width='${width}px' height='${height}px' xlink:href="${b64data}">
        </image>
        
        </a>`;
}

export function base64Image(imageUrl) {
  return new Promise((resolve, reject) => {
    const width = 128,
      r = width / 2,
      circleShape = Buffer.from(
        `<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`
      );
    axios.get(imageUrl, { responseType: "arraybuffer" }).then((resp) => {
      const inputImage = Buffer.from(resp.data);
      sharp(inputImage)
        .resize(width, width)
        .composite([
          {
            input: circleShape,
            blend: "dest-in",
          },
        ])
        .png()
        .toBuffer()
        .then((circleImageBuf) => {
          resolve(`data:image/png;base64,${circleImageBuf.toString("base64")}`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
