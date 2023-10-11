const express = require('express');
const router = express.Router()
const { register, login } = require('../controller/auth')
const { authenticateUser } = require('../middleware/authentication')
//public route for user registration: [No authentication needed]
router.post('/register', register)
router.post('/login', login)

//protected route that rrequires autht=entication
router.get('/protected', authenticateUser, (req, res) => {
    res.json({ msg: 'You have access to this protected route!', user: req.user})
})

module.exports = router 