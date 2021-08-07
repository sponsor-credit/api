const axios = require("axios");
const process = require("process");

module.exports = (username) =>
  new Promise((resolve, reject) => {
    console.log(username);
    let config = {
      headers: {
        Authorization: `bearer ${process.env.GH_TOKEN}`,
      },
    };
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `query {
        user(login: "${username}") {
          ... on Sponsorable {
            sponsors(first: 100) {
              totalCount
              nodes {
                ... on User { login, avatarUrl }
                ... on Organization { login }
              }
            }
          }
        }
      }
      `,
        },
        config
      )
      .then(
        (resp) => {
          resolve(resp.data.data.user.sponsors.nodes);
        },
        (err) => {
          reject(err);
        }
      );
  });
