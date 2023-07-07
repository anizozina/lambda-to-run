const { URL } = require('url');
const axios = require('axios');

const auth = async (key, url) => {
  const { GoogleAuth } = require('google-auth-library');
  const client = new GoogleAuth().fromJSON(key);
  const targetAudience = new URL(url).origin;
  const idToken = await client.fetchIdToken(targetAudience);
  return idToken;
};

const request = async (url, idToken) => {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log(result);
};

module.exports.handler = async (event) => {
  console.log(process.env);
  const key = JSON.parse(process.env.GCLOUD_ACCESS_KEY);
  const url = process.env.URL;
  console.log({ key, url });
  const idToken = await auth(key, url);
  await request(url, idToken);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
