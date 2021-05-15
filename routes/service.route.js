const express = require('express');
const Router =express.Router();

const service=require('../controllers/service.controller.js');
const upload=require('../middlewares/upload.js')


Router.get('/services',service.getAllServices)
// Router.get('/service/:id',service.getOneservice)
Router.put('/service/:id/realisation',upload,service.addServiceRealisation)
Router.delete('/service/:id',service.deleteService)
Router.delete('/service/image/:id/:filename',service.deleteServiceImage)
Router.get('/service/image/:id/:filename',service.getServiceImage)
Router.post('/services',upload,service.createService)
Router.put('/service/image/:id',upload,service.updateServiceImage)

module.exports=Router;


