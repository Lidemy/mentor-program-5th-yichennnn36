const express = require('express');
// middleware
// flash message
const multer = require('multer');
const flash = require('express-flash');
const session = require('express-session');
const engine = require('ejs-locals');
const path = require('path');
const { check } = require('express-validator');

const userController = require('./controllers/user');
const musicController = require('./controllers/music');

const upload = multer();
const app = express();
// Dotenv is a zero-dependency module that loads environment variables
require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session({
  secret: process.env.DB_SECRET,
  resave: false,
  saveUninitialized: true
}));
// use built-in middleware static() to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

const redirectBack = (req, res) => {
  res.redirect('back');
};
const checkLogin = (req, res, next) => {
  if (!req.session.username) return res.redirect('/login');
  next();
};

app.get('/', musicController.index);
// api
app.get('/api', musicController.api);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.handleLogout);
// 後台頁面
app.get('/musicList', checkLogin, musicController.musicList);
app.get('/addMusic', checkLogin, musicController.addMusic);
app.post('/addMusic', checkLogin, upload.single('image'), [
  check('name').trim().notEmpty().withMessage('請輸入歌曲名稱'),
  check('description').trim().notEmpty().withMessage('請輸入歌曲描述'),
  check('probability', '機率請輸入數字1-100')
    .trim()
    .notEmpty()
    .withMessage('請輸入抽中機率')
    .matches('^([1-9][0-9]{0,1}|100)$')
],
musicController.checkErr,
musicController.handleUploadImage,
musicController.handleAddMusic,
redirectBack);

app.get('/deleteMusic/:id', checkLogin, musicController.handleDelete, redirectBack);
app.get('/editMusic/:id', checkLogin, musicController.editMusic);
app.post('/editMusic/:id', checkLogin, upload.single('image'), [
  check('name').trim().notEmpty().withMessage('請輸入歌曲名稱'),
  check('description').trim().notEmpty().withMessage('請輸入歌曲描述'),
  check('probability', '機率請輸入數字1-100')
    .trim()
    .notEmpty()
    .withMessage('請輸入抽中機率')
    .matches('^([1-9][0-9]{0,1}|100)$')
],
musicController.checkErr,
musicController.handleUploadImage,
musicController.handleEditMusic, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
