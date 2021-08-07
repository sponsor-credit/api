require("dotenv").config();
const ghSponsors = require("./sponsor-sources/github-sponsors");
const express = require("express");
const app = express();
const port = 3000;

app.get("/api/v1/:name", (req, res) => {
  var json = ghSponsors(req.params.name).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      console.log(err);
      res.status(500).end({ err: "ran into an issue" });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
