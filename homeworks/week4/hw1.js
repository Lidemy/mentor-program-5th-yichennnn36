const request = require('request');

const BASE_URL = 'https://lidemy-book-store.herokuapp.com';

request(
  `${BASE_URL}/books?_limit=10`, (err, res, body) => {
    try {
      const data = JSON.parse(body);
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id} ${data[i].name}`);
      }
    } catch (err) {
      return console.log(err);
    }
  }
);
