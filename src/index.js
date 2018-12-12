import express from 'express'
import config from './config/config'
import morgan from 'morgan'

import { ProcessReceivedMessageEvent } from './helpers/receive.message'
const app = express()

//set the PORT
const PORT = config.PORT || process.env.PORT
app.use(express.json())
app.use(morgan('dev'))

//we want to test our webhook
app.get('/api/webhook', async (req, res) => {

  //if the query contains hub_verify token and is the same as our
  //verify_token
  if (req.query['hub.verify_token'] === config.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  };
  res.send('Thou shall not pass!! 🔪');
})

app.post('/api/webhook', async (req, res) => {
  const { object, entry } = req.body;

  if (object === 'page') {
    entry.forEach((e) => {
      const { id, time, messaging } = e;

      //iterate over each messaging object
      messaging.forEach((event) => {
        const { message, postback } = event
        if (message) {
          console.log(`WE'RE RECEIVING A MESSAGING EVENT`)
          ProcessReceivedMessageEvent(event)
        } else if (postback) {
          console.log(`WE'RE RECEIVING A POSTBACK EVENT`)
        };
      });
    });
    res.status(200).send("EVENT RECEIVED!!")
  } else {
    res.status(404).send("NOT FOUND!! NOT A PAGE SUBSCRIPTION 😠")
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR STARTING EXPRESS APP`)
  }

  console.log(`APP up and running on port: ${PORT}`)
})