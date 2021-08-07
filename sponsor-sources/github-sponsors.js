import axios from 'axios'
import process from 'process'

export default (username) =>
  new Promise((resolve, reject) => {
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
          resolve(resp.data.data.user.sponsors.nodes.map((obj) => {
          return {username: obj.login, profilePicture: obj.avatarUrl}
        })
);
        },
        (err) => {
          reject(err);
        }
      );
  });
