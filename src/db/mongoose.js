const mongoose = require('mongoose');

//In mongoose we are providing database name alsng with connection URL
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
//const databaseName = 'task-manager';
mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true,
     useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected Successfully');
    //const db = client.db(databaseName);
})