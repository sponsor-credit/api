// unused atm
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
  const endSvg = `</svg>`;
  return [startSvg].concat(svgArray).push(endSvg);
}

export function getImageRoundSvgText(
  linkTo,
  imgLink,
  name,
  x,
  y,
  width,
  height,
  imgClass
) {
  return `<a class="atag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${imgLink}" id="${name}">
      
        <foreignObject x='${x}' y='${y}' width='${width}px' height='${height}px' >
          <img
            width='${width}px'
            height='${height}px'
            src=${imgLink}
            class="${imgClass}"
                      />
        </foreignObject>
        
        </a>`;
}
