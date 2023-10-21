const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const validator = require('validator')
const jwt = require('jsonwebtoken')



const register = async (req, res) => {
  
    // Extract user registration data from the request body
    const { name, 
            email, 
            password, 
            isSeller 
          } = req.body;

  
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already registered');
    }
        
    // Create a new user instance
    const newUser = new User({ 
      name,
       email, 
       password, 
       isSeller,
       });
    await newUser.save().then((result) => {
      res.status(201).json({ msg: 'user created successfully'})
    });
  
};

const login = async (req, res) => {
  const { identifier, password } = req.body
  console.log(identifier, password);
  //checking if the identifier is an email or phone number
  const isEmail = validator.isEmail(identifier)
 
  
      try {
        //find user based on email or phone number
        let user;
        if(isEmail){
           user = await User.findOne({email: identifier});
        }else{
           user = await User.findOne({phone: identifier});
        }
        console.log(user)
        if(!user){
          throw new BadRequestError('Invalid Credentials')
         }
          console.log(isEmail);
        //verifying the password
        const isPasswordCorrect = await user.checkPassword(password)
          if(!isPasswordCorrect) {
            throw new BadRequestError('Incorrect password')
          }
          // to generate and send JWT tokens to the client after a succesful registration
          const token = jwt.sign({UserId: User._id }, process.env.JWT_SECRET)
          res.status(StatusCodes.CREATED).json({ User: { name: user.name }, token });
          
        } catch (error) {
          
          res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
      
      
      
    }

module.exports = { 
  register, 
  login,
  
};
