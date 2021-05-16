const request = require('request');
const process = require('process');

const BASE_URL = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'hv6q8btkyedopx5cir6xk0884d1067';
const game = process.argv[2];
// const limit = 100;
// let offset = 0;

request({
  method: 'GET',
  url: `${BASE_URL}/streams`,
  headers: {
    'Client-ID': CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json'
  },
  qs: {
    game,
    limit: 100,
    offset: 0
  }
}
, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  let data;
  try {
    data = JSON.parse(body);
  } catch (err) {
    return console.log(err);
  }
  const { streams } = data;
  for (let i = 0; i < streams.length; i++) {
    console.log(`${streams[i].channel.status} ${streams[i].channel._id}`);
  }

  request({
    method: 'GET',
    url: `${BASE_URL}/streams`,
    headers: {
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json'
    },
    qs: {
      game,
      limit: 100,
      offset: 100
    }
  }
  , (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      return console.log(err);
    }
    const { streams } = data;
    for (let i = 0; i < streams.length; i++) {
      console.log(`${streams[i].channel.status} ${streams[i].channel._id}`);
    }
  });
});
