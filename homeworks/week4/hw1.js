const request = require('request');

const BASE_URL = 'https://lidemy-book-store.herokuapp.com';

request(
  `${BASE_URL}/books?_limit=10`, (err, res, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      console.log(err);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  }
);
