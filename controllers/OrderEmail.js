const nodemailer = require("nodemailer");
const Order = require("../models/Order");
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
            error: "Id order Not Found"
        });
    }
    const order = await Order.findById(req.params.id);
    if(!order){
        res.json({
            error: "order Not Found"
        });
    }else{
        await Order.findOneAndUpdate(
            {"_id": order._id},
            {$set :  {"status":true}})

        mailOption={
            to : order.email,
            //to : "wael.bouatay@gmail.com",
            subject : "Order Accepted",
            template: 'OrderEmail', // the name of the template file i.e email.handlebars
            context:{
                country : order.address.country,
                city : order.address.city,
                email: order.email,
                link : "http://localhost:3000",
                code : order._id,
                amount : order.amount,
            }

            // html : "Hello,Please Click on the link to verify your email."+link+">Click here to verify"
        }
        await smtpTransport.sendMail(mailOption, function (error, response) {
            if (error) {
                res.end("error");
            } else {
                res.end("sent");
            }
        });
    }

};
