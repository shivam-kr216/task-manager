require('../src/db/mongoose');
const Task = require('../src/models/task');

//Task.findByIdAndDelete('5ff6c60432da0a0c20630132').then((user) => {
//    console.log(user);
//    return Task.countDocuments({ completed: false }).then((result) => {
//        console.log(result);
//    }).catch((e) => {
//        console.log(e);
//    })
//})

const deleteTaskAndCount = async (id) => {
    const deletedItem = await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('5ff6c61d9101061e0ce29ce9').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});