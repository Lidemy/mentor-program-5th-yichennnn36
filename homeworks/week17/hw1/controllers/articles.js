const db = require('../models');
const { Articles, Category } = db;
const { validationResult } = require('express-validator');

const articleController = {
  home: async(req, res, next) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('index', {
      articles
    });
  },
  indexArticle: async(req, res, next) => {
    let article;
    try {
      article = await Articles.findOne({
        where: { id: req.params.id },
        include: Category
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('indexArticle', {
      article
    });
  },
  list: async(req, res, next) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('list', {
      articles
    });
  },
  backstage: async(req, res) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return res.redirect('back');
    }
    res.render('backstage', {
      articles,
      successMessage: req.flash('successMessage')
    });
  },
  createArticle: async(req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('createArticle', {
      categories,
      errMessage: [],
      article: {}
    });
  },
  handleCreateArticle: async(req, res, next) => {
    // ????????????????????????
    const { title, category, content } = req.body;
    const errors = validationResult(req);

    // ???????????????
    if (!errors.isEmpty()) {
      const categories = await Category.findAll();
      return res.render('createArticle', {
        categories,
        errMessage: errors.array(),
        article: {
          title,
          category,
          content
        }
      });
    }
    // ?????????????????????????????????
    const categoryData = await Category.findOne({
      where: { name: category }
    });
    const categoryId = categoryData.id;

    try {
      await Articles.create({
        userId: 1,
        categoryId,
        title,
        content
      });
      req.flash('successMessage', '??????????????????');
      res.redirect('backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  },
  handleDelete: async(req, res, next) => {
    const article = await Articles.findOne({
      where: { id: req.params.id }
    });
    try {
      await article.update({
        isDeleted: 1
      });
      req.flash('successMessage', '???????????????');
      res.redirect('/backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  },
  updateArticle: async(req, res) => {
    const categories = await Category.findAll();
    const article = await Articles.findOne({
      where: { id: req.params.id },
      include: Category
    });
    res.render('updateArticle', {
      categories,
      article,
      errMessage: req.flash('errMessage')
    });
  },
  handleUpdateArticle: async(req, res, next) => {
    const { title, category, content } = req.body;
    const { id } = req.params;
    const errors = validationResult(req);
    // ???????????????
    if (!errors.isEmpty()) {
      const categories = await Category.findAll();
      return res.render('updateArticle', {
        categories,
        errMessage: errors.array(),
        article: {
          title,
          category,
          content,
          id 
        }
      });
    }
    // ?????????????????????????????????
    const article = await Articles.findOne({
      where: { id: req.params.id },
      include: Category
    });
    const categoryData = await Category.findOne({
      where: { name: category }
    });
    const categoryId = categoryData.id;

    try {
      await article.update({
        categoryId,
        title,
        content
      });
      req.flash('successMessage', '??????????????????');
      res.redirect('/backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  }
};

module.exports = articleController;
