const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

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
            if (!validator.isEmail(value))
                throw new Error('Email is invalid!');
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Invalid password!');
        }
    },
    age: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true

    });

//Creating virtual relation
//for first argument we can give any name
//Tasks db me match karo user collection se _id and task collection ka owner field ko
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

//We can name the function anything i.e, findByCredentials
//statics are model method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!');
    }
    return user;
}

/*userSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = user.toObject();      
    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}*/

//It will as similar to above function because
//whenever response call it call to stringyfy function which 
//convert object to json format
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    //it require two arguments first one will be the unique id 
    //second is any stream of characters which is a signature
    //third argument will be time expired
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodetutorial'/*, {expiresIn: '7 days'}*/);
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
}

//pre and post are two methods pre used to perform operation
//before something and post after something
//first argument is the event name after or before which something 
//needs to perform
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //console.log('Completed');
    //next will tell that our operation will be finished otherwise it will be hanged
    next();
})

//Delete user task when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('Users', userSchema);
module.exports = User;
