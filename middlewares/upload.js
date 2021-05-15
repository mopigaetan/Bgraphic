const mongoose=require('mongoose');
const gridStorage=require('multer-gridfs-storage');
const grid=require('gridfs-stream');
const multer=require('multer');
require('dotenv').config();

const connexion =mongoose.createConnection(process.env.MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true});
let gfs;
connexion.once('open',()=>{
	gfs=grid(connexion.db, mongoose.mongo);
	gfs.collection('Images');
})

const storage=new gridStorage({
	url:process.env.MONGO_URI,
	file:(req,file)=>{
	
		return new Promise((resolve,reject)=>{
			const filename=file.originalname;
			const userID=req.params.id;
			const fileInfo={
				metadata:{userID:userID,filename:filename},
				bucketName:'Images',
			};
			resolve(fileInfo);
		})
	}
})
const upload=multer({storage}).fields([{name:'services'},{name:'realisations'}]);

module.exports=upload;