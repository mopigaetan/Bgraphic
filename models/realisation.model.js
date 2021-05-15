const mongoose =require('mongoose');

const serviceSchema=mongoose.Schema({
	name:{type:String},
	description:String,
	moreDescription:String,
	type:String,
	contact:String,
	link:String,
	imageUrls:[{url:String,_id:String}]
})

module.exports=serviceSchema;