import dotenv from "dotenv";
dotenv.config();
import ghSponsors from "./sponsor-sources/github-sponsors.js";
import express from "express";
import path from "path";

import {
  renderSVGArray,
  getImageRoundSvgText,
  base64Image,
} from "./svgCreator.js";
const app = express();
const port = 80;
app.use(express.static("public"));

import cors from "cors";

app.use(cors());
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
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
  const pfpSize = parseInt(req.query.pfpSize) || 50;

  if (pfpSize > 100) {
    req.status(400).send({ error: "pfpSize must be <= 100" });
  }

  const width = parseInt(req.query.width) || 600;
  const margin = 3;

  let currentRow = 0;
  let currentX = 0;

  ghSponsors(req.params.username).then(
    async (data) => {
      const imgs = [];

      const rowsNeeded = Math.ceil((data.length * (pfpSize + margin)) / width); // how many rows are needed
      let height;
      if (rowsNeeded == 1) {
        height = rowsNeeded * (pfpSize + margin); // total height
      } else {
        height = rowsNeeded * (pfpSize + margin) + pfpSize + margin; // total height
      }

      const cols = Math.floor(
        (data.length * (pfpSize + margin)) / (rowsNeeded * (pfpSize + margin))
      );

      let inde = 0;

      for (let donator in data) {
        currentX = (pfpSize + margin) * inde;

        if (currentX + pfpSize > width) {
          currentX = 0;
        }
        if (inde >= cols) {
          currentRow += 1;
          inde = 0;
        }

        // let image = "";

        const b64data = await base64Image(data[donator].profilePicture);

        imgs.push(
          getImageRoundSvgText(
            data[donator].link,
            b64data,
            data[donator].username,
            (pfpSize + margin) * inde,
            currentRow * (pfpSize + margin),
            pfpSize,
            pfpSize
          )
        );

        inde += 1;
      }

      let contentType = "image/svg+xml";
      if (req.query.browser) {
        contentType = "text/html";
      }
      res.set("Content-Type", contentType);
      res.status(200).send(renderSVGArray(imgs, width, height));
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
