const db = require('../models');
const { Music } = db;
const { validationResult } = require('express-validator');
const fetch = require("node-fetch");
const FormData = require('form-data');

const musicController = {
  index: async (req, res, next) => {
    let music;
    try {
      music = await Music.findAll({
        where: { isDeleted: 0 }
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('index', {
      music
    });
  },
  musicList: async(req, res) => {
    const music = await Music.findAll({
      where: { isDeleted: 0 },
      order: [
        ['id', 'DESC']
      ]
    });
    res.render('musicList', {
      music,
      successMessage: req.flash('successMessage')
    })
  },
  addMusic: async(req, res) => {
    res.render('addMusic', {
      errMessage: [] || req.flash('errMessage'),
      item: {}
    });
  },
  checkErr: async(req, res, next) => {
    const { name, description, probability } = req.body;
    const errors = validationResult(req);
    if (!req.file) errors.errors.push({ 'msg': '請選擇圖片檔案' });

    if (!errors.isEmpty()) {
      if (!req.params.id) {
        return res.render('addMusic', {
          errMessage: errors.array(),
          item: { name, description, probability }
        })
      } else {
        return res.render('editMusic', {
          errMessage: errors.array(),
          music: { 
            name, 
            description, 
            probability,
            id: req.params.id
          }
        })
      }
    }
    next();
  },
  handleUploadImage: async(req, res, next) => {
    const encoded_image = req.file.buffer.toString('base64');
    const formData = new FormData();
    formData.append('image', encoded_image);

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID d66b1144adcbf85',
        },
        body: formData
      })
      const data = await response.json();
      req.file.url = data.data.link;
      next();
    } catch (err) {
      req.flash('errMessage', err.toString());
      res.redirect('back');
    }
  },
  handleAddMusic: async(req, res, next) => {
    const { name, description, probability } = req.body;
    const imageUrl = req.file.url;

    try {
      await Music.create({
        name, imageUrl, description, probability
      });
      req.flash('successMessage', '新增成功');
      res.redirect('musicList');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  },
  editMusic: async(req, res) => {
    const music = await Music.findOne({
      where: { id: req.params.id }
    })
    res.render('editMusic', {
      music,
      errMessage: [] || req.flash(errMessage)
    })
  },
  handleEditMusic: async(req, res, next) => {
    const { name, description, probability } = req.body;
    const imageUrl = req.file.url;
    const music = await Music.findOne({
      where: { id: req.params.id }
    });
    
    try {
      await music.update({
        name, imageUrl, description, probability
      });
      req.flash('successMessage', '更新成功');
      return res.redirect('/musicList');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    
  },
  handleDelete: async (req, res, next) => {
    const music = await Music.findOne({
      where: { id: req.params.id }
    });
    try {
      await music.update({
        isDeleted: 1
      })
      req.flash('successMessage', '已刪除歌單');
      next();
    } catch (err) {
      req.flash('errMessage', err.toString());
      next();
    }
  },
  api: async(req, res) => {
    const drawArr = await getDrawArr();
    const randomNum = Math.floor(Math.random() * 100 + 1);
    const id = drawArr[randomNum - 1];

    const data = await Music.findOne({
      where: { id },
      attributes: { exclude: ['probability', 'isDeleted', 'createdAt', 'updatedAt']}
    });
    res.send(data);
  }
}

async function getDrawArr() {
  const totalweight = await Music.sum('probability', {
    where: {  isDeleted: 0  }
  });
  const allMusic = await Music.findAll({
    where: { isDeleted: 0 }
  })
  let WeightArr = [];
  for (const music of allMusic) {
    const weight = (music.probability / totalweight).toFixed(2) * 100;
    WeightArr.push({
      id: music.id,
      weight
    });
  }
  let result = [];
  for (let i = 0; i < WeightArr.length; i++) {
    for (let j = 1; j <= WeightArr[i].weight; j++) {
      result.push(WeightArr[i].id)
    }
  }
  return result;
}

module.exports = musicController;
