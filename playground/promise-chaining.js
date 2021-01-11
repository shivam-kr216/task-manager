require('../src/db/mongoose');
const User = require('../src/models/user');

//User.findByIdAndUpdate('5ff6f8ddf286324a58942d5b', { age: 17 })
//    .then((user) => {
//        console.log(user)
//        return User.countDocuments({ age: 18 })
//    }).then((result) => {
//        console.log(result)
//    }).catch((e) => {
//        console.log(e);
//    })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate (id, { age });
    const count = await User.countDocuments({ age });
    return {user, count};
}

updateAgeAndCount('5ff6f8ddf286324a58942d5b', 21).then((detail) => {
    console.log(detail);
}).catch((e) => {
    console.log(e);
})