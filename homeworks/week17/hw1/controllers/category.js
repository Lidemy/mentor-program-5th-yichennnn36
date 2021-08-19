const db = require('../models');
const { Category } = db;

const categoryController = {
  category: async(req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('category', {
      categories
    });
  },
  createCategory: async(req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('createCategory', {
      categories,
      errMessage: req.flash('errMessage'),
      successMessage: req.flash('successMessage')
    });
  },
  handleCreateCategory: async(req, res, next) => {
    const { category } = req.body;
    if (!category) {
      req.flash('errMessage', '請輸入文章分類');
      return next();
    }
    try {
      await Category.create({
        name: category
      });
      req.flash('successMessage', '新增分類成功');
      res.redirect('createCategory');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  }
};

module.exports = categoryController;
