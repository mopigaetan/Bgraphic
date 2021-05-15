const express = require('express');
const Router =express.Router();

const Devis=require('../controllers/devis.controller.js');

Router.post('/devis',Devis.sendDevis)

module.exports=Router;