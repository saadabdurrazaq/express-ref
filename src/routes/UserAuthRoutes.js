const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs') 
const UserAuthController = require('../controllers/UserAuthController.js')   
const { register } = require('../controllers/UserAuthController.js');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

router.post('/register', validateSignupRequest, isRequestValidated, register);

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    UserAuthController.login({username, password}).then(user => {
            user ? res.json(user) : res.json({ error: 'Username or password is incorrect' });
        }
    ).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    UserAuthController.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;