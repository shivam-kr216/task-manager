const mongoose = require('mongoose');
const User = require('../models/user');

//In mongoose we are providing database name alsng with connection URL
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//const me = new User({
//    name: 'Andrew Mead',
//    email: 'MYEMAIL@mead.io',
//    password: 'passw6',
//    age: 18
//})

//me.save().then(() => {
//    console.log('Inserted Successfully!');
//}).catch((e) => {
//    console.log('Failed: ', e);
//})

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