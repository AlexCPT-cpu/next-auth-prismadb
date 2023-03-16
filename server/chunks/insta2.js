const fetch = require('node-fetch');

const accessToken = 'YOUR_ACCESS_TOKEN';
const username = 'TARGET_USERNAME';

const url = `https://graph.instagram.com/${username}?fields=id,username,followers_count&access_token=${accessToken}`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
