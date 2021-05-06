const request = require('request');
const process = require('process');

const BASE_URL = 'https://lidemy-book-store.herokuapp.com';
const action = process.argv[2];
const parameter = process.argv[3];

switch (action) {
  case 'list':
    listBook();
    break;
  case 'read':
    readBook(parameter);
    break;
  case 'delete':
    deleteBook(parameter);
    break;
  case 'create':
    createBook(parameter);
    break;
  case 'update':
    updateBook(parameter, process.argv[4]);
    break;
  default:
    console.log('可執行的指令: list, read, delete, create, update');
}

function listBook() {
  request(
    `${BASE_URL}/books?_limit=20`, (err, res, body) => {
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
}

function readBook(id) {
  request(
    `${BASE_URL}/books/${id}`, (err, res, body) => {
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
      console.log(`${data.name}`);
    }
  );
}

function deleteBook(id) {
  request.delete(
    `${BASE_URL}/books/${id}`, (err, res, body) => {
      try {
        console.log('刪除成功');
      } catch (err) {
        console.log('刪除失敗', err);
      }
    }
  );
}

function createBook(bookName) {
  request.post(
    {
      url: `${BASE_URL}/books`,
      form: {
        id: '50',
        name: bookName
      }
    }, (err, res, body) => {
      try {
        console.log('新增成功');
      } catch (err) {
        console.log('新增失敗', err);
      }
    }
  );
}

function updateBook(id, bookName) {
  request.patch(
    {
      url: `${BASE_URL}/books/${id}`,
      form: {
        name: bookName
      }
    }, (err, res, body) => {
      try {
        console.log('更新成功');
      } catch (err) {
        console.log('更新失敗', err);
      }
    }
  );
}
