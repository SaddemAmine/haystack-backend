const express = require('express');
const router = express.Router();
require('./structjson.js'); 
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const config = require('../config/keys');
const Complaint = require("../models/Complaint");
const User = require('../models/user');
const userController = require("../controllers/user");
const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode
let complaint = new Complaint() ;
let user = new User();
// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// We will make two routes 


// Text Query Route

router.post('/textQuery', async (req, res, next) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const usera = await User.findById(req.userId);

    console.log('Detected intent', result.intent.displayName);
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if(result.intent.displayName === "createaccount") {
        if(result.fulfillmentText.includes("lastname")) {
            user.firstname = result.queryText ;
        }else if (result.fulfillmentText.includes("adress")){
            user.lastname = result.queryText ;
            console.log('lastname',user.lastname);

        }else if (result.fulfillmentText.includes("password")){
            user.email = result.queryText ;
            console.log(user.email);

        }
        else if (result.fulfillmentText.includes("created")){
            user.password = result.queryText ;
            console.log(user.password);
            console.log('nini');
            await userController.chatbotcreate(user)        }
    }
    if (result.intent.displayName === "complaint"){
        if(result.fulfillmentText.includes("wrong")) {
            complaint.ComplaintObject = result.queryText ;
        }else if (result.fulfillmentText.includes("treat")){
            complaint.Description = result.queryText ;
            complaint.user = usera.email ;
            await complaint.save();
        }
    }
    res.send(result)
})



//Event Query Route

router.post('/eventQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('USER');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})







module.exports = router;
