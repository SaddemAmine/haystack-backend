const nodemailer = require("nodemailer");
const User = require("../models/user");
const path = require("path");
const hbs = require('nodemailer-express-handlebars')


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "haystack.placeholder@gmail.com",
        pass: "HayStack.Placeholder@2022"
    }
});
let userId,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
smtpTransport.use('compile', hbs(handlebarOptions))


///send
exports.send=async  (req,res, next)=>{
    console.log(req.params.id)
    userId = req.params.id;
    host=req.get('host');
    link="http://"+req.get('host')+"/email/verify/"+userId;
    const user = await User.findById(userId);
    mailOptions={
            to : user.email,
            // to : "bassem.jadoui@esprit.tn",
            subject : "WELCOME TO HayStack",
            template: 'email', // the name of the template file i.e email.handlebars
            context:{
                name: user.firstName+" "+user.lastName,
                company: 'HayStack',
                link: link
            }

        // html : "Hello,Please Click on the link to verify your email."+link+">Click here to verify"
    }
    console.log(mailOptions);
    await smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
};

exports.verify=async  (req,res, next)=>{

    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))===("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.params.id==userId)
        {

            User.updateOne(
                {_id:userId},
                {$set:{isVerified : true}},
                () => console.log("email :"+req.params.email+" is verified 1")
            )

            console.log("email is verified");

            // res.send("Email "+req.params.email+" is been Successfully verified");
            res.redirect("http://localhost:3000/login/verified");

        }
        else
        {
            console.log("email is not verified");
            res.end("Bad Request");
        }
    }
    else
    {
        res.end("Request is from unknown source");
    }
};
