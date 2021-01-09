const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email is invalid!');
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value){ 
            if(value.toLowerCase().includes('password'))
                throw new Error('Invalid password!');
        }
    },
    age: {
        type: Number,
        default: 0
    }
})

module.exports = User;
