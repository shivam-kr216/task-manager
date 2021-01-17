const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/task');
const taskRoute = new express.Router();

taskRoute.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    /*task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
        //res.send('Error: ',e);
    })*/
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

})

/*
taskRoute.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send();
        //res.send('Error: ',e);
    })
})
*/

//We can filter using query string
///tasks?completed=true
//We are using completed as query string
//Now we are adding pagination using the following:
///tasks?limit=10&skip=0
//sorting /task?sordBy=completed:1 (-1 for descending) or we can also use _asc or _desc
////sorting /task?sordBy=completed_1 (-1 for descending) or we can also use _asc or _desc
taskRoute.get('/tasks', auth, async (req, res) => {
    //first way
    //const task = await Task.find({ owner: req.user._id, completed: req.query.completed })
    //const task = await Task.find({})
    //if (!task) {
    //    res.send('No user found');
    //}
    //res.send(task);

    //second way
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        //console.log(sort);
    }


    try
    {   //await req.user.populate(tasks).execPopulate();
        //res.send(req.user.tasks);
        //Below line will be for filtering
        //Remove above two line before using this
        //Here match used for filtering and option used for pagination
        await req.user.populate({
        path: 'tasks',
        match,
        options: {
            //Query string are always a string we need to parse
            limit : parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
            /*sort: {
                createdAt: -1 //Sort in descending order
                //We can also sort using completed status
                //use -1 for true and 1 for false
            }*/
        }
    }).execPopulate();
    res.send(req.user.tasks);
    }
    catch(e){
        res.send(e);
    }

})

/*
taskRoute.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.find({ _id }).then((task) => {
        if (!task)
            return res.status(404).send();
        res.send(task);
    }).catch((e) => {
        res.status(500).send();
        //res.send('Error: ',e);
    })

})
*/

taskRoute.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }

})

/*
taskRoute.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e);
    }
})
*/

taskRoute.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }) 
        //const task = await Task.findById(req.params.id)
        
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save();
        res.send(task);

    } catch (e) {
        res.status(400).send(e);
    }
})

taskRoute.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

/*
taskRoute.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})
*/

module.exports = taskRoute;