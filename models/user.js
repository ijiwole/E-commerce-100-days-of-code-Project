const mongoose = require ('mongoose')

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
                minlenght: 6,
    },

})