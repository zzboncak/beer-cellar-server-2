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

beersRouter
    .route('/:beer_id')
    .all((req, res, next) => {
        BeersService.getById(
            req.app.get('db'),
            req.params.beer_id
        )
            .then(beer => {
                if(!beer) {
                    return res.status(404).json({
                        error: { message: `Beer does not exist` }
                    })
                }
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        BeersService.getById(
            req.app.get('db'),
            req.params.beer_id
        )
            .then(beer => {
                if(!beer) {
                    return res.status(404).end()
                }
                res.send(beer)
            })
            .catch(next)
    })

module.exports = beersRouter;