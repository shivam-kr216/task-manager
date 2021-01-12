const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema()
const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        //required: [true, 'Why no description?']
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    } 
})

module.exports = Task;