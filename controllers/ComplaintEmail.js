const nodemailer = require("nodemailer");
const Complaint = require("../models/complaint");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");


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
let mailOption;

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
exports.send=async  (req,res)=>{
    if (!req.params.id) {
        res.json({
            error: "Id complaint Not Found"
        });
    }
    const complaint = await Complaint.findById(req.params.id);
    if(!complaint){
        res.json({
            error: "order Not Found"
        });
    }else{
        await Complaint.findOneAndUpdate(
            {"_id": complaint._id},
            {$set :  {"status":"treated"}})

        mailOption={
            to : complaint.user,
            //to : "wael.bouatay@gmail.com",
            subject : "Complaint Treated",
            template: 'ComplaintEmail', // the name of the template file i.e email.handlebars
            context:{
                company : 'HayStack',
                user : complaint.user
            }

            // html : "Hello,Please Click on the link to verify your email."+link+">Click here to verify"
        }
        await smtpTransport.sendMail(mailOption, function (error, response) {
            if (error) {
                res.end("error");
                console.log(error);
            } else {
                res.end("sent");
            }
        });
    }

};
