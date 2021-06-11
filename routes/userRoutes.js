const express = require('express')
const router = express.Router();
const UserModel = require('../models/userModel');

// get all
router.get('/', async (req, res)=>{
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

// get one
router.get('/:id', getUser, (req,res) => {
    res.json(res.user);
});

// create one
router.post('/', async (req,res) => {
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        res.send(error);
    }
});

// update one
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name;
    }

    if(req.body.email != null){
        res.user.email = req.body.email;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.json(error);
    }
});

// delete one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({
            "message": "User deleted"
        });
    } catch (error) {
        res.json(error);
    }
});

async function getUser(req, res, next){
    let user;
    try {
        user = await UserModel.findById(req.params.id);
        if (user == null){
            return res.send("Cannot find user");
        }
    } catch (error) {
        return res.json(error);
    }
    res.user = user;
    next();
}

module.exports = router;