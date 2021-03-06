import axios from "axios";
import process from "process";

export default (username) =>
  new Promise((resolve, reject) => {
    let config = {
      headers: {
        Authorization: `bearer ${process.env.GH_TOKEN}`,
      },
    };
    let accType = "user";
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `
          {
            ${accType}(login: "${username}") {
              ... on Sponsorable {
                sponsors(first: 100) {
                  totalCount
                  nodes {
                    ... on User {
                      login
                      avatarUrl(size: 256)
                      url
                    }
                    ... on Organization {
                      login
                      avatarUrl(size: 256)
                      url
                    }
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
          if (resp.status < 300) {
            resolve(
              resp.data.data[accType].sponsors.nodes.map((obj) => {
                return {
                  username: obj.login,
                  profilePicture: obj.avatarUrl,
                  link: obj.url,
                };
              })
            );
          } else {
            accType = "organization";
            reject(resp.data);
          }
        },
        (err) => {
          reject(err);
        }
      );
  });
