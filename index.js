import dotenv from "dotenv";
dotenv.config();
import ghSponsors from "./sponsor-sources/github-sponsors.js";
import express from "express";
import { renderSVGArray, getImageRoundSvgText } from "./svgCreator.js";
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
  const pfpSize = parseInt(req.query.pfpSize) || 50;

  const width = parseInt(req.query.width) || 600;
  const margin = 3;

  let currentRow = 0;
  let currentX = 0;

  ghSponsors(req.params.username).then(
    (data) => {
      let imgs = [];

      const rowsNeeded = Math.ceil((data.length * (pfpSize + margin)) / width); // how many rows are needed
      const height = rowsNeeded * (pfpSize + margin) + pfpSize + margin; // total height

      const cols = Math.floor(
        (data.length * (pfpSize + margin)) / (rowsNeeded * (pfpSize + margin))
      );

      let inde = 0;

      data.forEach((donator) => {
        currentX = (pfpSize + margin) * inde;

        if (currentX + pfpSize > width) {
          currentX = 0;
        }
        if (inde >= cols) {
          currentRow += 1;
          inde = 0;
        }
        imgs.push(
          getImageRoundSvgText(
            donator.link,
            donator.profilePicture,
            donator.username,
            (pfpSize + margin) * inde,
            currentRow * (pfpSize + margin),
            pfpSize,
            pfpSize,
            "pfp"
          )
        );
        inde += 1;
      });

      res.set("Content-Type", "text/html");
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
