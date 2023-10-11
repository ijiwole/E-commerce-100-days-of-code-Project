//Authentication for Login and REGISTRATION

const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const User = require('./path-to-your-user-model'); // Import your User model

// Example: Create a user who is a seller
const createUserWithSellerProfile = async () => {
  try {
    // Create a new user instance
    const user = new User({
      name: 'Seller User',
      email: 'seller@example.com',
      password: 'password123',
      isSeller: true, // Set to true to indicate the user is a seller
      sellerProfile: {
        sellerDescription: 'This is a seller description.',
        sellerRating: 4.5, // Set the seller's rating
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


const register = async( req, res) => {
    const user = await User.create({...req.body})
    
}