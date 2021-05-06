const request = require('request');
const process = require('process');

const BASE_URL = 'https://restcountries.eu/rest/v2';
const parameter = process.argv[2];

request(
  `${BASE_URL}/name/${parameter}`, (err, res, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    const data = JSON.parse(body);
    if (data.status === 404) {
      return console.log('找不到國家資訊');
    }

    for (let i = 0; i < data.length; i++) {
      console.log('============');
      console.log(`國家： ${data[i].name}`);
      console.log(`首都： ${data[i].capital}`);
      console.log(`貨幣： ${data[i].currencies[0].code}`);
      console.log(`國碼： ${data[i].callingCodes}`);
    }
  }
);
