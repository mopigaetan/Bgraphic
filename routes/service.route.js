const express = require('express');
const Router =express.Router();

const service=require('../controllers/service.controller.js');
const upload=require('../middlewares/upload.js')


Router.get('/services',service.getAllServices)
Router.get('/service/:id',service.getOneService)
Router.delete('/service/:id',service.deleteService)
Router.post('/service/create',upload.array("services"),service.createService1)
Router.put('/service/image/add/:id',upload.array("services"),service.addImageService)
Router.put('/service/image/delete/:id/:idImg',service.deleteServiceImage)
Router.put('/service/update/:id',service.updateService)

module.exports=Router;