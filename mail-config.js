const nodemailer=require('nodemailer');
require('dotenv').config();
var transporter =nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:process.env.email,
		pass:process.env.pass
	}
});

module.exports=transporter;