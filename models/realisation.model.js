const mongoose =require('mongoose');

const realisationSchema=mongoose.Schema({
	name:String,
	description:String,
	moreDescription:String,
	type:String,
	contact:String,
	//link:String,
	imageUrls:[{}],
	service:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Service'
	}
})

module.exports=mongoose.model('Realisation',realisationSchema);