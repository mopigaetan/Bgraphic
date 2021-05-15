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
module.exports.getAllServices=(req,res,next)=>{
	Service.find()
	.then(service=>res.status(200).json({services:service}))
	.catch(error=>{
		console.log('services find error : ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getServiceImage=async (req,res,next)=>{
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

module.exports.deleteService=(req,res,next)=>{
	let id=req.params.id
	Service.findOneAndDelete({_id:id})
	.then(service=>res.status(200).json({message:`service ${service.name} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete service ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.deleteServiceImage=(req,res,next)=>{
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
}