const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Defining selleer Profile and explaining field specific
const sellerProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your seller Pofile name"],
        minlegth: 3,
        maxlenght: 20,
    },

    sellerDescription: {
        type: String,
        required: [true, "Please provide a seller description"],
        maxlenght: 500,
    },

    sellerRating: {
        type: Number,
        min: 0,
        max: 5,
    },
})
//Definining UserSchema with embedded Seller Profile
const UserSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlegth: 3,
        maxlenght: 20,

    },

    email: {
        type: String,
        required: [true, 'Please provide a mail'],
        //add match here -> 
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlenght: 8,
        maxlenght: 16,
    },

    isSeller: {
        type: Boolean,
        required: [true, 'Please provide details']
    },
    phone: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value, 'any', { strictMode: false })
            },
            message: 'Invalid Phone Number Format'
        }
    },
    
});
    UserSchema.pre('save', async function () {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    })

    UserSchema.methods.createJwt = function(){
        return jwt.sign({userId: this._id, name: this.name}, 'jwtSecret',
        {
            expiresIn: process.env.JWT_LIFETIME
        })
    }

    UserSchema.methods.checkPassword = async function (candidatePassword){
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }


const User = mongoose.model('User', UserSchema)
module.exports = User;