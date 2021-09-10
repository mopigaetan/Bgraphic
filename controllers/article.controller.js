const Article = require('../models/article.model.js');
require('dotenv').config();
const path=require('path')
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})


module.exports.createArticle=(req,res,next)=>{
let index=req.files.length

	let results=[];
	let result;
	req.files.map(async(file)=>{
		result=await cloudinary.uploader.upload(file.path)
		results.push(result)
	})
   setTimeout(() => {
	console.log(results) 
	const article= new Article({
		...req.body,imageUrls:results
	})
	article.save()

	.then(article=>{
		res.status(200).json({
			message:'article succesfully created',
			article:article
	})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	}) 
   }, 10000);
}

module.exports.addImageArticle=(req,res,next)=>{
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
	Article.updateOne({_id:req.params.id},{
		$push:{
			imageUrls:{
				$each:results
			}
		}
	})
	.then(article=>{
		res.status(200).json({
			message:'images succesfully added to article',
			article:article
	})
	})
	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	}) 
   }, 10000);
}
module.exports.deleteArticleImage=(req,res,next)=>{

	Realisation.updateOne({_id:req.params.id},{$pull:{imageUrls:{public_id:req.params.idImg}}})
	.then(article=>
		{
			cloudinary.uploader.destroy(req.params.idImg, function(error,result) {
				res.status(200).json(article)
			console.log(result, error) });
		})
	.catch(console.log)
}

module.exports.getAllArticles=(req,res,next)=>{
	Article.find()
	.then(article=>res.status(200).json({articles:article}))
	.catch(error=>{
		console.log('articles find error : ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getOneArticle=(req,res,next)=>{
	Article.find({_id:req.params.id})
	.then(article=>res.status(200).json({articles:article}))
	.catch(error=>{
		console.log('articles find error : ',error);
		res.status(500).json({message:error.message});
	})
}

module.exports.deleteArticle=(req,res,next)=>{
	let id=req.params.id
	Article.findOneAndDelete({_id:id})
	.then(article=>res.status(200).json({message:`article ${article.name} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete article ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.updateArticle=(req,res,next)=>{
	let id=req.params.id
	Article.findOneAndUpdate({_id:id},{...req.body})
	.then(article=>res.status(200).json({message:`article ${article.name} account was update successfully !`}))
	.catch(error=>{
		console.log('error when trying to ypdate article ',error);
		res.status(500).json({message:error.message});
	})
}