const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../controllers/UserControllers.js')  

router.post('/register', (req, res, next) => {
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt); 

        userServices.register(req.body)
        .then(user => {
            user ? res.json({user}) : res.json({ success:true}); // error for duplicate email or username is passed to errorHandler.js 500 server error
        })
        .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    userServices.login({username, password}).then(user => {
            user ? res.json(user) : res.json({ error: 'Username or password is incorrect' });
        }
    ).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;