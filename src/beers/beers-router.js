const express = require('express');
const BeersService = require('./BeersService');

const beersRouter = express.Router();
const jsonParser = express.json();

beersRouter
    .route('/')
    .get((req, res, next) => {
        console.log(req);
        BeersService.getAllBeers(req.app.get('db'))
            .then(response => res.send(response))
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { untappd_beer_id, beer_name, untappd_rating, beer_description, brewery_id, brewery_name, beer_image } = req.body;
        const newBeer = { untappd_beer_id, beer_name, untappd_rating, beer_description, brewery_id, brewery_name, beer_image};

        BeersService.addBeer(
            req.app.get('db'),
            newBeer
        )
            .then(response => res.status(201).json(response))
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
    .delete((req, res, next) => {
        BeersService.deleteBeer(
            req.app.get('db'),
            req.params.beer_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = beersRouter;