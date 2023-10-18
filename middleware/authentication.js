 const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) =>{
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startWith('Bearer ')){
        throw new UnauthenticatedError('Authentication token invalid')
    }
        const token = authHeader.split(' ')[ 1 ]

        try {
            //veifying incoming tokens and extract user name
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = {userId: payload.userId, name: payload.name}
            next()
        } catch (e) {
            return next (new UnauthenticatedError('Authentication failed'))
        }

        
}
module.exports = auth