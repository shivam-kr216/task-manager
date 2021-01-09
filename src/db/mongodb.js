// CRUD operations 

//const mongodb = require('mongodb');
//Provide function which require method to connect with the database
//const MongoClient = mongodb.MongoClient;
//const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectId } = require('mongodb'); 
//New is optional here we can remove it, but it's not a good practice.
//const id = new ObjectId();
//console.log(id);
//console.log(id.getTimestamp());
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected Successfully');
    const db = client.db(databaseName);

    //INSERTING DATA

    //    db.collection('users').insertOne({
    //        _id: id,
    //        name: 'Vikram',
    //        age: 21    
    //        name: 'Shivam',
    //        age: 21
    //    }, (error, result) =>{
    //        if(error){
    //            return console.log('Unable to insert data!');
    //        }
    //        console.log(result.ops);
    //    })
    //})

//    db.collection('users').insertMany([
//        {
//            name: 'Shivam',
//            age: 21
//        },
//        {
//            name: 'Ritik',
//            age: 18
//        }
//    ], (error, result) => {
//        if (error) {
//            return console.log('Unable to insert data!');
//       }
//        console.log(result.ops);
//    })
//})

//    db.collection('tasks').insertMany([
//        {
//            description: 'Electronics',
//            completed: true
//        },
//        {
//            description: 'Grocery',
//            completed: false
//        },
//        {
//            description: 'Vegetables',
//            completed: true
//        }
//    ], (error, result) => {
//        if (error) {
//            return console.log('Unable to insert task!');
//       }
//        console.log(result.ops);
//    })

//READING DATA

//        db.collection('users').findOne({
//            name: 'Ritik', age: 18
//            _id: new ObjectId("5ff4172089fec74780e87289")
//        }, (error, user) => {
//            if(error){
//                return console.log('No user found');
//            }
//            console.log(user);
//        })

        //Find doesn't callback as its second argument
//        db.collection('users').find({
//            age:21
//        }).toArray((error, users) => {
//            users.map( (user) => {
//                console.log(user._id);
//            })
//        })

//        db.collection('users').find({
//            age:21
//        }).count((error, count) => {
//            console.log(count);
//        })

//  UPDATING DATA

//IF WE NOT PROVIDE CALLBACK FUNCTION THEN IT WILL RETURN PROMISE
    //const promiseUpdate = db.collection('users').updateOne({
//ID NEEDS TO FILTER        
    //   _id: new ObjectId("5ff4172089fec74780e87289")
    //}, {
//UPDATE OPERATION WHICH WE WANT TO APPLY 
        //$set: {
        //    name: 'Shivam Kumar'
        //}
        //$inc: {
        //    age: -1
        //}
    //})
    //promiseUpdate.then(result => {
    //    console.log(result);
    //}).catch((e)=>{
    //    console.log('Error: ', e);
    //})

//ANOTHER WAY

//    db.collection('users').updateOne({
    //ID NEEDS TO FILTER        
//            _id: new ObjectId("5ff4172089fec74780e87289")
//        }, {
    //UPDATE OPERATION WHICH WE WANT TO APPLY 
//            $set: {
//                name: 'Shivam Kumar'
//            }
//        }).then(result => {
//            console.log(result);
//        }).catch((e)=>{
//            console.log('Error: ', e);
//    })

//UPDATE MANY

//    db.collection('tasks').updateMany({
//        completed: false
//    }, {
//        $set:{
//            completed: true
//        }
//    }).then(result => {
//        console.log(result.modifiedCount);
//        }).catch((e)=>{
//            console.log('Error: ', e);
//    })

//DELETE OPERATION

    db.collection('users').deleteOne({
        name: "Vikram"
    }).then(result => {
        console.log(result.deletedCount);
    }).catch(e => {
        console.log(e);
    }) 
})



