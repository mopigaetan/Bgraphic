/*
const Realisation = require('../models/realisation.model.js');
require('dotenv').config();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
// Mongo URI
const mongoURI = process.env.MONGO_URI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useUnifiedTopology: true ,useNewUrlParser: true});
// Init gf
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('Images');
});
module.exports.createRealisation=(req,res,next)=>{
	console.log(req.body);	
	const {name,description}=req.body
	const realisation = new Realisation({
		...req.body,
	})
	realisation.save()
	.then(realisation=>{
		res.status(200).json({message:'new realisation created !',realisation:realisation});
	})
	.catch(error=>{
		res.status(500).json({message:'error ! realisation not created'});
		console.log('realisation',error);
	})
}

module.exports.updateRealisationImage=(req,res,next)=>{
	let id=req.params.id
	console.log(req.files.realisations)
	Service.updateOne({_id:id},{
		$push:{
			imageUrls:{
				$each:req.files.services.map(service=>
					{
						let url={url:`http://localhost:8080/service/image/${id}/${service.filename}`,_id:service.id};
						return url;
					}
				)
			}
		}
	})
	.then(user=>res.status(200).json({message:`service Image of ${user.fullname} was updated`}))
	.then(error=>res.status(404).json({message:'service does not exist'}))
}
 function getID (id){
	 return id;
}
module.exports.getAllRealisations=(req,res,next)=>{
	Service.find()
	.then(service=>res.status(200).json({services:service}))
	.catch(error=>{
		console.log('services find error : ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getRealisationImage=async (req,res,next)=>{
	let filename=getID(req.params.filename)
	console.log(filename);
	gfs.files.findOne({filename:filename},(err,file)=>{
		console.log(file)
		// check if image exist
		if (!file || file.length ===0) {
			return res.status(404).json({message:'this service image does not exist'})
		}
		const readstream = gfs.createReadStream(file.filename);
      	return readstream.pipe(res);
	})
}

module.exports.deleteRealisation=(req,res,next)=>{
	let id=req.params.id
	Service.findOneAndDelete({_id:id})
	.then(service=>res.status(200).json({message:`service ${service.name} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete service ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.deleteRealisationImage=(req,res,next)=>{
	let id=req.params.id
	let filename=req.params.filename;
	Service.updateOne({_id:id},{
		$pull:{
			imageUrls:{url:`http://localhost:8080/service/image/${id}/${filename}`}
		}
	})
	.then(service=>{
		// Service.deleteOne({_id:id})
		console.log(service)
		res.status(200).json({message:`service ${service.name} account was delete successfully !`})
	})
	.catch(error=>{
		console.log('error when trying to delete service ',error);
		res.status(500).json({message:error.message});
	})
}*/

const Realisation = require('../models/realisation.model.js');
require('dotenv').config();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const path=require('path')
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports.createRealisation=(req,res,next)=>{

	let results=[];
	let result;
	req.files.map(async(file)=>{
		result=await cloudinary.uploader.upload(file.path)
		results.push(result)
	})
   setTimeout(() => {
	console.log(results) 
	const realisation= new Realisation({
		...req.body,imageUrls:results
	})
	realisation.save()

	.then(realisation=>{
		res.status(200).json({
			message:'realisation succesfully created',
			realisation:realisation
	})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	}) 
   }, 10000);
}

module.exports.addImageRealisation=(req,res,next)=>{
	let index=req.files.length

	for (let i = 0; i < req.files.length; i++) {
		
		
	}
	let results=[];
	let result;
	req.files.map(async(file)=>{
		result=await cloudinary.uploader.upload(file.path)
		results.push(result)
	})
   setTimeout(() => {
	console.log(results) 
	Realisation.updateOne({_id:req.params.id},{
		$push:{
			imageUrls:{
				$each:results
			}
		}
	})
	.then(realisation=>{
		res.status(200).json({
			message:'images succesfully added to realisation',
			realisation:realisation
	})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	}) 
   }, 10000);
}
module.exports.deleteRealisationImage=(req,res,next)=>{

	Realisation.updateOne({_id:req.params.id},{$pull:{imageUrls:{public_id:req.params.idImg}}})
	.then(realisation=>
		{
			cloudinary.uploader.destroy(req.params.idImg, function(error,result) {
				res.status(200).json(realisation)
			console.log(result, error) });
		})
	.catch(console.log)
}

module.exports.getAllRealisations=(req,res,next)=>{
	Realisation.find()
	.populate('service')
	.then(realisation=>res.status(200).json({realisations:realisation}))
	.catch(error=>{
		console.log('realisations find error : ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getOneRealisation=(req,res,next)=>{
	Realisation.find({_id:req.params.id})
	.populate('service')
	.then(realisation=>res.status(200).json({realisations:realisation}))
	.catch(error=>{
		console.log('realisations find error : ',error);
		res.status(500).json({message:error.message});
	})
}

module.exports.deleteRealisation=(req,res,next)=>{
	let id=req.params.id
	Realisation.findOneAndDelete({_id:id})
	.then(realisation=>res.status(200).json({message:`realisation ${realisation.name} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete realisation ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.updateRealisation=(req,res,next)=>{
	let id=req.params.id
	Realisation.findOneAndUpdate({_id:id},{...req.body})
	.then(realisation=>res.status(200).json({message:`realisation ${realisation.name} account was update successfully !`}))
	.catch(error=>{
		console.log('error when trying to ypdate realisation ',error);
		res.status(500).json({message:error.message});
	})
}
