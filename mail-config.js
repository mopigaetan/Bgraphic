const nodemailer=require('nodemailer');
require('dotenv').config();
var transporter =nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:mopigaetan02@gmail.com,
		//process.env.email,
		pass:Herokugoogle@007
		//process.env.pass
	}
});

module.exports=transporter;
