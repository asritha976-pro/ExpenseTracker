const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs : 15 * 60 * 100,
    max : 5,
    message:{
        success: false,
        message: 'Too many attempts, Please try again after sometimes.'
    },
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = {authLimiter}