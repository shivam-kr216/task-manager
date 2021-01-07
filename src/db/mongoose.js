const mongoose = require('mongoose');
const validator = require('validator');

//In mongoose we are providing database name alsng with connection URL
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
//const databaseName = 'task-manager';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

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
            if(value.toLowerCase.includes('password'))
                throw new Error('Invalid password!');
        }
    },
    age: {
        type: Number,
        default: 0
    }
})

const me = new User({
    name: 'Andrew Mead',
    email: 'MYEMAIL@mead.io',
    password: 'passw6',
    age: 18
})

me.save().then(() => {
    console.log('Inserted Successfully!');
}).catch((e) => {
    console.log('Failed: ', e);
})

//const Task = mongoose.model('Task', {
//    description: {
//        type: String,
//        //required: [true, 'Why no description?']
//        required: true,
//        trim: true
//    },
//    completed: {
//        type: Boolean,
//        default: false,
//        validate(value){
//            if(value < 0){
//                throw new Error('Age must be a positive number');
//            }
//        }
//    } 
//})

//const list = new Task(
//  {
//        description: "Electronics",
//        completed: true
//    }
//    {
//        description: "Grocery",
//        completed: false
//    }
//    {
        //description: "Fruits",
        //completed: true
//    }
//)

//list.save().then((list) => {
//    console.log(list);
//}).catch((e) => {
//    console.log('Error: ',e)
//})