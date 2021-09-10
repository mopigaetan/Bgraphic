const express = require('express');
const Router =express.Router();

const article=require('../controllers/article.controller.js');
const upload=require('../middlewares/upload.js')


Router.get('/articles',article.getAllArticles)
Router.get('/article/:id',article.getOneArticle)
Router.delete('/article/:id',article.deleteArticle)
Router.post('/article/create',upload.array("articles"),article.createArticle)
Router.put('/article/image/add/:id',upload.array("articles"),article.addImageArticle)
Router.put('/article/image/delete/:id/:idImg',article.deleteArticleImage)
Router.put('/article/update/:id',article.updateArticle)


module.exports=Router;