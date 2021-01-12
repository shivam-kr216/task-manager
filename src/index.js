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

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const hashedPassword = await bcrypt.hash('Shivam',8);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare('shivam',hashedPassword);
    console.log(isMatch);
}

myFunction();
