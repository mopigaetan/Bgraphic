const mongoose =require('mongoose');
const realisationsSchema=require('./realisation.model.js')
const serviceSchema=mongoose.Schema({
	name:{type:String,required:true},
	description:String,
	moreDescription:String,
	type:String,
	contact:String,
	imageUrls:[{url:String,_id:String}],
	realisations:[realisationsSchema]
})

module.exports=mongoose.model('Service',serviceSchema);