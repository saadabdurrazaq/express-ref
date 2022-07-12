const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [ 
    check('username')
    .notEmpty()
    .withMessage('Username is required'), 

    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),

    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),

    check('role')
    .isIn(["user", "admin", "super-admin"])
    .withMessage('role must be admin | user | admin | super-admin'),

];

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        let errMsgs = [];
        errors.errors.forEach((data) => {
            errMsgs.push(data.msg)
        });
        return res.status(400).json({ error: errMsgs })
    }
    next();
}