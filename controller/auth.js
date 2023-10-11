const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const createUserWithSellerProfile = async () => {
  try {
    // Create a new user instance
    const user = new User({
      name: 'Seller User',
      email: 'seller@example.com',
      password: 'password123',
      isSeller: true,
      sellerProfile: {
        sellerDescription: 'This is a seller description.',
        sellerRating: 4.5,
      },
    });

    // Save the user to the database
    const savedUser = await user.save();
    console.log('User with seller profile created:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
createUserWithSellerProfile();

const register = async (req, res) => {
  try {
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

    
    const token = savedUser.createJwt();//implement token
    res.status(StatusCodes.CREATED).json({ User: { name: savedUser.name }, token });
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  register,
};
