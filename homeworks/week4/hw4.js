const request = require('request');

const BASE_URL = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'hv6q8btkyedopx5cir6xk0884d1067';

request({
  method: 'GET',
  url: `${BASE_URL}/games/top`,
  headers: {
    'Client-ID': CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}, (err, res, body) => {
  if (err) {
    return console.log(err);
  }

  const data = JSON.parse(body);
  for (let i = 0; i < data.top.length; i++) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`);
  }
});
