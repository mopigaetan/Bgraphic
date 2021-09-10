require('dotenv').config();
const transporter=require('../mail-config.js');


module.exports.sendDevis=(req,res,next)=>{
	const {email,description,name,phone}=req.body
	const mailOptions={
		from:`BGraphics client<${email}>`,
		to:email,
		subject:'Demande de Devis',
		html:`
		<h2>Nouvelle demande de Devis</h2>
		<ul>
			<li>Nom: <b>${name}</b>
			<li>Tel: ${phone}
			<li>Email: ${email}
			<li>Sujet:<b> Demande de Devis</b>
		</ul>	
		<p><b>Description:</b></p> 
		${description}
		`
	}
	transporter.sendMail(mailOptions,(err,info)=>{
		if (err) {
			console.log(err);
			res.status(500).json({send:false,message:'mail is not send !'})
		}else{
			res.status(200).json({send:true,message:'mail send successfully'})
		}
	})
}