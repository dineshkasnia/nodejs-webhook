const express = require('express');
const body_parser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const connection = require('./connection');

const app = express().use(body_parser.json());

const token=process.env.TOKEN;
const mytoken =process.env.MYTOKEN;



app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

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
            body_param.entry[0].changes
            ){
                let business_account_id = body_param.entry.id;
                let phone_number_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let message_id =  "545884574858454";
                // let user_phone_number = body_param.entry[0].changes[0].messages ? body_param.entry[0].changes[0].messages[0].from : body_param.entry[0].changes[0].value.metadata.display_phone_number;
                // let receiver_phone_number = body_param.entry[0].changes[0].messages ? body_param.entry[0].changes[0].value.metadata.display_phone_number : body_param.entry[0].changes[0].messages[0].from;
                // let msg_body = body_param.entry[0].changes[0].value.messages ? body_param.entry[0].changes[0].value.messages[0].text.body : "";
                // let from = body_param.entry[0].changes[0].value.messages[0].from;
                // let msg_body = body_param.entry[0].changes[0].value.messages ? body_param.entry[0].changes[0].value.messages[0].text.body : "";

                console.log(business_account_id, phone_number_id, message_id);

                let data = [business_account_id, phone_number_id, message_id];

                connection.query('INSERT INTO webhook(business_account_id, phone_number_id, message_id) VALUES(?)', [data], (err, rows) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('submitted');
                    }
                });
              
                // axios({
                //     method:"POST",
                //     url:"https://graph.facebook.com/v16.0/"+phone_number_id+"/messages?access_token="+token,
                //     data:{
                //         messaging_product:"whatsapp",
                //         to:from,
                //         text:{
                //             body:"Hi.. I am dinesh kasnia"
                //         }
                //     },
                //     headers:{
                //         "Content-Type":"application/json"
                //     }
                // });

                res.sendStatus(200);
                res.end();

            }
            else{
                res.sendStatus(404);
            }
    }
});

app.get("/", (req,res) =>{
    res.status(200).send('Hello this is webhook setup');
});


app.listen(process.env.PORT, () =>{
    console.log('webhook is listening.');
});