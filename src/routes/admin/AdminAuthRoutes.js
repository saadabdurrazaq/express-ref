const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs') 
const { register, signin, signout } = require('../../controllers/admin/AdminAuthController.js');
const AdminAuthController = require('../../controllers/admin/AdminAuthController.js')   
const { requireSignin, adminMiddleware, superAdminMiddleware, } = require("../../common-middleware"); 
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');

router.post('/register', validateSignupRequest, isRequestValidated, requireSignin, register);

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    AdminAuthController.login({username, password}).then(user => {
            user ? res.json(user) : res.json({ error: 'Username or password is incorrect' });
        }
    ).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    AdminAuthController.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;