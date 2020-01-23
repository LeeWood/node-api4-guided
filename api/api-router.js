const express = require('express');

const Shouts = require('../shouts/shouts-model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  const messageOfTheDay = process.env.MOTD; //a
  res.status(200).json({ motd: messageOfTheDay });
});

router.get('/shouts', (req, res, next) => {
  Shouts.find()
    .then(shouts => {
      res.status(200).json(shouts);
    })
    .catch(error => next(error));
});

router.post('/shouts', (req, res, next) => {
  Shouts.add(req.body)
    .then(shout => {
      res.status(201).json(shout);
    })
    .catch(error => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;


//a - Here we're setting this JSON message to a variable we've hard coded in our .env file. When we push this code to the github repo, it's not going to be sent to the heroku application. BUT since the code is saying to use the enviro var of MOTD, we havve to add a new MTOD environmental variable to Heroku in our app settings. There we can set up out key value paris. This is private info so here is where we would put sensitive info like api keys and auth keys.