const mongoose = require ('mongoose')
const validator = require ('validator');

//Defining selleer Profile and explaining field specific
const sellerProfileSchema = new mongoose.Schema({
    name: {
            type:String,
            required: [true, "Please provide your seller Pofile name"],
            minlegth: 3,
            maxlenght: 20,
    },

    sellerDescription: {
        type: String,
        required:[true, "Please provide a seller description"],
        maxlenght: 500,
    },

    sellerRating:{
        type:Number,
        min: 0,
        max: 5,
    },
})
//Definining UserSchema with embedded Seller Profile
const UserSchema = new mongoose.UserSchema({
    name: {
                type:String,
                required:[true, 'Please provide name'],
                minlegth: 3,
                maxlenght: 20,

    },

    email: {
                type:String,
                required:[true, 'Please provide a mail'],
               //add match here -> 
                unique: true,
    },

    password: {
                type:String,
                required: [true, 'Please provide a password'],
                minlenght: 8,
                maxlenght: 16,
    },
    
    isSeller: {
        type: Boolean,
        default: false,
    },
    phone: {
                type: String,
                validate:{
                    validator: (value) =>{
                        return validator.isMobilePhone(value, 'any', {strictMode: false})
                    },
                    message: 'Invalid Phone Number Format'
                }
    },
    sellerProfile: sellerProfileSchema
});
    const User = mongoose.model('User', UserSchema)
module.exports = User;