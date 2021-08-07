import dotenv from "dotenv";
dotenv.config();
import ghSponsors from "./sponsor-sources/github-sponsors.js";
import express from "express";
const app = express();
const port = 3000;

import cors from "cors";

app.use(cors());

app.get("/api/v1/:name", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  ghSponsors(req.params.name)
    .then(
      (data) => {
        res.send(data);
      },
      (err) => {
        console.log(err);
        res.status(500).send({
          error: "ran into an issue requesting data from github sponsors",
        });
      }
    )
    .catch(() => {
      res.status(500).send({
        error: "ran into an issue requesting data from github sponsors",
      });
    });
});

// app.get("*", (req, res) => {
//   res.status(404).send({ error: "404 page not found" });
// });

app.get("/:username.svg", (req, res) => {
  console.log(req.params.username);
  const pfpSize = req.query.pfpSize || 40;

  const width = req.query.width || 600;
  const autoHeight = req.query.authHeight || true;
  const margin = 3;

  let currentRow = 0;
  let currentX = 0;

  let height = 0;
  let cols = 0;

  ghSponsors(req.params.username).then(
    (data) => {
      if (!autoHeight) {
        height = req.query.height || 100;
      } else {
        console.log(data.length * (pfpSize + margin)); // how many pixels are needed
        let rowsneed = Math.ceil((data.length * (pfpSize + margin)) / width); // how many rows are needed
        height = rowsneed * (pfpSize + margin);
        cols = Math.ceil(data.length / rowsneed);
        console.log(cols + "cols");
        console.log(height);
      }
      let inde = 0;
      let baseSvg = `<style xmlns="http://www.w3.org/2000/svg">.atag{ cursor: pointer; }.pfp{border-radius:50%;}</style><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="${width}" height="${height}">`;
      for (let i = 0; i < data.length; i++) {
        currentX = (pfpSize + margin) * inde;
        if (currentX + pfpSize > width) {
          currentX = 0;
          currentRow += 1;
        }
        if (inde > cols) {
          inde = 0;
        }
        // console.log(inde + " " + currentRow + " " + currentX);
        baseSvg += `<a class="atag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${
          data[i]["link"]
        }" id="${data[i]["username"]}">
      
        <foreignObject x='${(pfpSize + margin) * inde}' y='${
          currentRow * (pfpSize + margin)
        }' width='${pfpSize}px' height='${pfpSize}px' >
          <img
            width='${pfpSize}px'
            height='${pfpSize}px'
            src=${data[i]["profilePicture"]}
            class="pfp"/>
        </foreignObject>
        
        </a>`;
        inde += 1;
      }
      res.set("Content-Type", "text/html");
      baseSvg += `</svg>`;
      res.status(200).send(baseSvg);
    },
    (err) => {
      console.log(err);
      res.status(400).send({ error: err });
    }
  );
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// <image x="${
//   i * 46
// }" y="3" width="46" height="46" xlink:href="${
//   data[i]["profilePicture"]
// }"/>
