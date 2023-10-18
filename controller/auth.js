const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const validator = require('validator')

 const createUserWithSellerProfile = async () => {
  try {
    // Create a new user instance
    const user = new User({
      name,
      email,
      password,
      isSeller: true,
      sellerProfile: {
        sellerDescription,
        sellerRating,
      },
    });

    // Save the user to the database
    const savedUser = await user.save();
    console.log('User with seller profile created:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

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
    const savedUser = await newUser.save();
  
};

const login = async (req, res) => {
  const { identifier, password } = req.body
  //checking if the identifier is an email or phone number
  const isEmail = validator.isEmail(identifier)
  //used to check whether the user is using email or phone number to login 
  const query = isEmail ? { email: identifier } : { phone: identifier}
  
      try {
        //find user based on email or phone number
        const user = await User.findOne(query);
        if(!user){
          throw new BadRequestError('Invalid Credentials')
          }

        //verifying the password
        const isPasswordCorrect = await user.checkPassword(password)
          if(!isPasswordCorrect) {
            throw new BadRequestError('Invalid Credentials')
          }
          // to generate and send JWT tokens to the client after a succesful registration
          const token = jwt.sign({UserId: savedUser._id }, process.env.JWT_SECRET)
          res.status(StatusCodes.CREATED).json({ User: { name: savedUser.name }, token });
          
        } catch (error) {
          
        }
          res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      
      
      
    }

module.exports = { 
  register, 
  login,
  createUserWithSellerProfile,
};
