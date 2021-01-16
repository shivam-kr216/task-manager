const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        //required: [true, 'Why no description?']
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //Collection name
        ref: 'Users'
    }
}, 
{
    timestamps: true
})

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;