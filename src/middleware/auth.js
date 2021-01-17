const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Without middleware: new request -------> run route handler
//With middleware: new request -------> do something --------> run route handler
//Express middleware
//Here we are creating middleware
//this function will run before run route handler
//it needs to be at top
//app.use((req, res, next) => {
    //console.log(req.method, req.path);
//    if(req.method === 'GET'){
//        res.send('Unable to process');
//    }
//    else {
//        next();
//    }
//    next(); 
//})

const auth = async (req, res, next) => {
    //console.log('abcd');
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        //console.log(token);   
        const decode = jwt.verify(token, 'thisisnodetutorial');
        const user = await User.findOne({ _id : decode._id, 'tokens.token':token }); 

        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(e) {
        res.status(401).send({error: 'Please authenticate!'});
    }
}

module.exports = auth;