const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://bgraphics:bgraphics@cluster0.frrec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true,
	// useFindAndModify:true,
	useFindAndModify:false
})
.then(()=>console.log('db is successfully connected !'))
.catch(()=>console.log('connection to db failed !'))

module.exports=mongoose;
