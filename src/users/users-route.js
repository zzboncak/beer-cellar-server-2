const express = require('express');
const UsersService = require('./UsersService');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        let { username, user_password } = req.body;
        console.log(req.body)

        UsersService.getUser(req.app.get('db'), username, user_password)
            .then(response => res.send(response))
            .catch(next)
            
        //res.send(200);
        // res.json(req.app.get('db')
        //     .select('id')
        //     .from('users')
        //     .where({
        //         username: 'zzboncak',
        //         // user_password: 'password'
        //     })
        // )
    })

module.exports = usersRouter;
