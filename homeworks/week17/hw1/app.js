const express = require('express');

const app = express();
// middleware
// flash message
const flash = require('connect-flash');
const path = require('path');
const moment = require('moment');
const engine = require('ejs-locals');
const session = require('express-session');
const { check } = require('express-validator');

const port = process.env.PORT || 5001;

// include controller
const userController = require('./controllers/user');
const articleController = require('./controllers/articles');
const categoryController = require('./controllers/category');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// flash message
app.use(flash());
// handle session
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
// 格式化時間
app.locals.moment = moment;

const redirectBack = (req, res) => {
  res.redirect('back');
};
// 登入權限管理
const checkLogin = (req, res, next) => {
  if (!req.session.username) return res.redirect('/login');
  next();
};

// 建立路由
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.handleLogout);
// 前台
// 所有文章
app.get('/', articleController.home, redirectBack);
// 單篇文章
app.get('/indexArticle/:id', articleController.indexArticle, redirectBack);
// 文章列表
app.get('/list', articleController.list, redirectBack);
// 文章分類
app.get('/category', categoryController.category, redirectBack);

// 後台
// 文章列表
app.get('/backstage', checkLogin, articleController.backstage);
// 新增文章
app.get('/createArticle', checkLogin, articleController.createArticle, redirectBack);
app.post('/createArticle', checkLogin, [
  check('title').notEmpty().withMessage('請輸入文章標題'),
  check('content').notEmpty().withMessage('請輸入文章內容'),
  check('category').custom((value, { req }) => {
    if (value === 'not-selected') {
      throw new Error('請選擇文章分類');
    }
    return true;
  })
], articleController.handleCreateArticle, redirectBack);
// 刪除文章
app.get('/deleteArticle/:id', checkLogin, articleController.handleDelete, redirectBack);
// 編輯文章
app.get('/updateArticle/:id', checkLogin, articleController.updateArticle);
app.post('/updateArticle/:id', checkLogin, [
  check('title').notEmpty().withMessage('請輸入文章標題'),
  check('content').notEmpty().withMessage('請輸入文章內容'),
  check('category').custom((value, { req }) => {
    if (value === 'not-selected') {
      throw new Error('請選擇文章分類');
    }
    return true;
  })
], articleController.handleUpdateArticle, redirectBack);
// 新增文章分類
app.get('/createCategory', checkLogin, categoryController.createCategory, redirectBack);
app.post('/createCategory', checkLogin, categoryController.handleCreateCategory, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
