const express = require('express');
const BeersService = require('./BeersService');

const beersRouter = express.Router();
const jsonParser = express.json();

beersRouter
    .route('/')
    .get((req, res, next) => {
        BeersService.getAllBeers(req.app.get('db'))
            .then(response => res.send(response))
            .catch(next)
    });

module.exports = beersRouter;