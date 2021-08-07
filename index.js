import dotenv from 'dotenv'
dotenv.config()
import ghSponsors from './sponsor-sources/github-sponsors.js'
import express from 'express';
const app = express();
const port = 3000;

app.get("/api/v1/:name", (req, res) => {
  ghSponsors(req.params.name).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      console.log(err);
      res.status(500).send({ error: "ran into an issue requesting data from github sponsors" });
    }
  )
  .catch(() => {
      res.status(500).send({ error: "ran into an issue requesting data from github sponsors" });
  });
});

app.get("*", (req, res) => {
  res.status(404).send({error: '404 page not found'})
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});