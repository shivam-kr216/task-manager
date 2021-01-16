const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express(); 
//process.env.PORT is for connecting to HEROKU server
const port = process.env.PORT || 3000


//Automatically parse json data into object
app.use(express.json());
//Defining user route which is on other page 
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    console.log('Connected!');
})

//Just for example
/*const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const hashedPassword = await bcrypt.hash('Shivam',8);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare('shivam',hashedPassword);
    console.log(isMatch);
}

myFunction();*/

/*const jwt = require('jsonwebtoken');

const myFunction = async () => {
    //it require two arguments first one will be the unique id 
    //second is any stream of characters which is a signature
    //third argument will be time expired
    const token = jwt.sign({_id: 'abc123'}, 'thisisnodetutorial', {expiresIn: '7 days'});
    console.log(token);

    const data = jwt.verify(token, 'thisisnodetutorial');
    console.log(data)
}

myFunction();*/

/*
const pet = {
    name: 'Hal'
}
console.log(JSON.stringify(pet));
console.log(typeof(pet));
*/

/*
const Task = require ('./models/task');
const User = require('./models/user');

const main = async () => {
    //const task = await Task.findById('6001d382f5b2ff4774ada65d');
    //This line going to find the user associated to this task
    //await task.populate('owner').execPopulate();
    //console.log(task.owner);

    const user = await User.findById('6001cf70a1cafa4d40413f49');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}

main();
*/
