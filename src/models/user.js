const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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
});

//We can name the function anything i.e, findByCredentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password,  user.password)
    if(!isMatch){
        throw new Error('Unable to login!');
    }
    return user;
}

//pre and post are two methods pre used to perform operation
//before something and post after something
//first argument is the event name after or before which something 
//needs to perform
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('Completed');
    //next will tell that our operation will be finished otherwise it will be hanged
    next();
})

const User = mongoose.model('Users', userSchema);

module.exports = User;
