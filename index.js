const express = require('express');
const body_parser = require('body-parser');
const axios = require("axios");
require('dotenv').config();

const app = express().use(body_parser.json());

const token=process.env.TOKEN;
const mytoken =process.env.MYTOKEN;

app.listen(process.env.PORT, () =>{
    console.log('webhook is listening.');
});

app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

    // console.log(mode, challenge, token);

    if(mode && token){
        if(mode==='subscribe' && token===mytoken){
            res.status(200).send(challenge);
        }
        else{
            res.status(403)
        }
    }
});


app.post("/webhook", (req, res) => {
    let body_param = req.body;

    console.log(JSON.stringify(body_param, null, 2));

    if(body_param.object){
        if(body_param.entry && 
            body_param.entry[0].changes &&
            body_param.entry[0].changes.value.hasOwnProperty(messages) &&
            body_param.entry[0].changes.value.messages[0]
            ){
                let phone_number_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.metadata.display_phone_number;
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;


                axios({
                    method:'POST',
                    url:"https://graph.facebook.com/v16.0/"+phone_number_id+"/messages?access_token="+token,
                    data:{
                        messaging_product:"whatsapp",
                        to:from,
                        text:{
                            body:"Hi.. I am dinesh kasnia"
                        }
                    },
                    headers:{
                        "Content-Type":"application/json"
                    }
                });

                res.sendStatus(200);

            }
            else{
                res.sendStatus(404);
            }
    }
});

app.get("/", (req,res) =>{
    res.status(200).send('Hello this is webhook setup');
})